import type { GlobalThemeOverrides } from 'naive-ui';
import { defu } from 'defu';
import { addColorAlpha, getColorPalette, getPaletteColorByNumber, getRgb } from '@sa/color';
import { DARK_CLASS } from '@/constants/app';
import { toggleHtmlClass } from '@/utils/common';
import { localStg } from '@/utils/storage';
import { chunengDesignTokens } from '@/theme/design-tokens';
import { overrideThemeSettings, themeSettings } from '@/theme/settings';
import { themeVars } from '@/theme/vars';

const cnBorder = (color: string) => `1px solid ${color}`;

/** Init theme settings */
export function initThemeSettings() {
  const isProd = import.meta.env.PROD;

  // if it is development mode, the theme settings will not be cached, by update `themeSettings` in `src/theme/settings.ts` to update theme settings
  if (!isProd) return themeSettings;

  // if it is production mode, the theme settings will be cached in localStorage
  // if want to update theme settings when publish new version, please update `overrideThemeSettings` in `src/theme/settings.ts`

  const localSettings = localStg.get('themeSettings');

  let settings = defu(localSettings, themeSettings);

  const isOverride = localStg.get('overrideThemeFlag') === BUILD_TIME;

  if (!isOverride) {
    settings = defu(overrideThemeSettings, settings);

    localStg.set('overrideThemeFlag', BUILD_TIME);
  }

  return settings;
}

/**
 * create theme token css vars value by theme settings
 *
 * @param colors Theme colors
 * @param tokens Theme setting tokens
 * @param [recommended=false] Use recommended color. Default is `false`
 */
export function createThemeToken(
  colors: App.Theme.ThemeColor,
  tokens?: App.Theme.ThemeSetting['tokens'],
  recommended = false
) {
  const paletteColors = createThemePaletteColors(colors, recommended);

  const { light, dark } = tokens || themeSettings.tokens;

  const themeTokens: App.Theme.ThemeTokenCSSVars = {
    colors: {
      ...paletteColors,
      nprogress: paletteColors.primary,
      ...light.colors
    },
    boxShadow: {
      ...light.boxShadow
    }
  };

  const darkThemeTokens: App.Theme.ThemeTokenCSSVars = {
    colors: {
      ...themeTokens.colors,
      ...dark?.colors
    },
    boxShadow: {
      ...themeTokens.boxShadow,
      ...dark?.boxShadow
    }
  };

  return {
    themeTokens,
    darkThemeTokens
  };
}

/**
 * Create theme palette colors
 *
 * @param colors Theme colors
 * @param [recommended=false] Use recommended color. Default is `false`
 */
function createThemePaletteColors(colors: App.Theme.ThemeColor, recommended = false) {
  const colorKeys = Object.keys(colors) as App.Theme.ThemeColorKey[];
  const colorPaletteVar = {} as App.Theme.ThemePaletteColor;

  colorKeys.forEach(key => {
    const colorMap = getColorPalette(colors[key], recommended);

    colorPaletteVar[key] = colorMap.get(500)!;

    colorMap.forEach((hex, number) => {
      colorPaletteVar[`${key}-${number}`] = hex;
    });
  });

  return colorPaletteVar;
}

/**
 * Get css var by tokens
 *
 * @param tokens Theme base tokens
 */
function getCssVarByTokens(tokens: App.Theme.BaseToken) {
  const styles: string[] = [];

  function removeVarPrefix(value: string) {
    return value.replace('var(', '').replace(')', '');
  }

  function removeRgbPrefix(value: string) {
    return value.replace('rgb(', '').replace(')', '');
  }

  for (const [key, tokenValues] of Object.entries(themeVars)) {
    for (const [tokenKey, tokenValue] of Object.entries(tokenValues)) {
      let cssVarsKey = removeVarPrefix(tokenValue);
      let cssValue = tokens[key][tokenKey];

      if (key === 'colors') {
        cssVarsKey = removeRgbPrefix(cssVarsKey);
        const { r, g, b } = getRgb(cssValue);
        cssValue = `${r} ${g} ${b}`;
      }

      styles.push(`${cssVarsKey}: ${cssValue}`);
    }
  }

  const styleStr = styles.join(';');

  return styleStr;
}

/**
 * Add theme vars to global
 *
 * @param tokens
 */
export function addThemeVarsToGlobal(tokens: App.Theme.BaseToken, darkTokens: App.Theme.BaseToken) {
  const cssVarStr = getCssVarByTokens(tokens);
  const darkCssVarStr = getCssVarByTokens(darkTokens);

  const css = `
    :root {
      ${cssVarStr}
    }
  `;

  const darkCss = `
    html.${DARK_CLASS} {
      ${darkCssVarStr}
    }
  `;

  const styleId = 'theme-vars';

  const style = document.querySelector(`#${styleId}`) || document.createElement('style');

  style.id = styleId;

  style.textContent = css + darkCss;

  document.head.appendChild(style);
}

/**
 * Toggle css dark mode
 *
 * @param darkMode Is dark mode
 */
export function toggleCssDarkMode(darkMode = false) {
  const { add, remove } = toggleHtmlClass(DARK_CLASS);

  if (darkMode) {
    add();
  } else {
    remove();
  }
}

/**
 * Toggle auxiliary color modes
 *
 * @param grayscaleMode
 * @param colourWeakness
 */
export function toggleAuxiliaryColorModes(grayscaleMode = false, colourWeakness = false) {
  const htmlElement = document.documentElement;
  htmlElement.style.filter = [grayscaleMode ? 'grayscale(100%)' : '', colourWeakness ? 'invert(80%)' : '']
    .filter(Boolean)
    .join(' ');
}

type NaiveColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active';
type NaiveColorKey = `${App.Theme.ThemeColorKey}Color${NaiveColorScene}`;
type NaiveThemeColor = Partial<Record<NaiveColorKey, string>>;
interface NaiveColorAction {
  scene: NaiveColorScene;
  handler: (color: string) => string;
}

function getNaiveThemeColors(colors: App.Theme.ThemeColor, recommended = false) {
  const colorActions: NaiveColorAction[] = [
    { scene: '', handler: color => color },
    { scene: 'Suppl', handler: color => color },
    { scene: 'Hover', handler: color => getPaletteColorByNumber(color, 500, recommended) },
    { scene: 'Pressed', handler: color => getPaletteColorByNumber(color, 700, recommended) },
    { scene: 'Active', handler: color => addColorAlpha(color, 0.1) }
  ];

  const themeColors: NaiveThemeColor = {};

  const colorEntries = Object.entries(colors) as [App.Theme.ThemeColorKey, string][];

  colorEntries.forEach(color => {
    colorActions.forEach(action => {
      const [colorType, colorValue] = color;
      const colorKey: NaiveColorKey = `${colorType}Color${action.scene}`;
      themeColors[colorKey] = action.handler(colorValue);
    });
  });

  return themeColors;
}

export function getNaiveTheme(
  colors: App.Theme.ThemeColor,
  settings: App.Theme.ThemeSetting,
  overrides?: GlobalThemeOverrides
) {
  const { primary: colorLoading } = colors;
  const recommend = settings.recommendColor;
  const { color: cnColor, radius } = chunengDesignTokens;
  const primaryHover = recommend ? getPaletteColorByNumber(colors.primary, 400, true) : cnColor.primaryHover;
  const primaryPressed = recommend ? getPaletteColorByNumber(colors.primary, 600, true) : cnColor.primaryPressed;
  const primaryFocusRing = `0 0 0 2px ${addColorAlpha(colors.primary, 0.12)}`;

  const theme: GlobalThemeOverrides = {
    common: {
      ...getNaiveThemeColors(colors, recommend),
      borderRadius: `${settings.themeRadius}px`,
      primaryColorHover: primaryHover,
      primaryColorPressed: primaryPressed
    },
    LoadingBar: {
      colorLoading
    },
    Tag: {
      borderRadius: `${settings.themeRadius}px`
    },
    Button: {
      colorHoverPrimary: primaryHover,
      colorPressedPrimary: primaryPressed,
      color: '#FFFFFF',
      colorHover: '#FFFFFF',
      colorPressed: colors.primary,
      textColor: cnColor.textSecondary,
      textColorHover: cnColor.textSecondary,
      textColorPressed: '#FFFFFF',
      border: cnBorder(cnColor.border),
      borderHover: cnBorder(cnColor.border),
      borderPressed: cnBorder(colors.primary),
      colorTertiary: '#FFFFFF',
      colorHoverTertiary: '#FFFFFF',
      textColorTertiary: colors.primary,
      textColorHoverTertiary: primaryHover,
      textColorPressedTertiary: primaryPressed,
      borderTertiary: cnBorder(colors.primary),
      borderHoverTertiary: cnBorder(primaryHover),
      borderPressedTertiary: cnBorder(primaryPressed)
    },
    Card: {
      titleTextColor: colors.primary,
      titleFontWeight: '600'
    },
    Input: {
      border: cnBorder(cnColor.border),
      borderHover: cnBorder(primaryHover),
      borderFocus: cnBorder(colors.primary),
      borderError: cnBorder(colors.error),
      boxShadowFocus: primaryFocusRing,
      caretColor: colors.primary,
      colorFocus: '#FFFFFF',
      colorError: '#FFFFFF',
      textColorError: colors.error
    },
    Select: {
      peers: {
        InternalSelection: {
          border: cnBorder(cnColor.border),
          borderHover: cnBorder(primaryHover),
          borderActive: cnBorder(colors.primary),
          borderFocus: cnBorder(colors.primary),
          boxShadowFocus: primaryFocusRing,
          caretColor: colors.primary
        },
        InternalSelectMenu: {
          optionColorActive: colors.primary,
          optionTextColorActive: '#FFFFFF',
          optionColorActivePending: primaryHover,
          optionColorPending: colors.primary,
          optionTextColorPressed: '#FFFFFF',
          optionCheckColor: '#FFFFFF'
        }
      }
    },
    Dialog: {
      titleTextColor: colors.primary,
      titleFontWeight: '600'
    },
    Pagination: {
      itemBorder: cnBorder(cnColor.border),
      buttonBorder: cnBorder(cnColor.border),
      itemColor: '#FFFFFF',
      itemColorHover: cnColor.bgPage,
      itemTextColor: cnColor.textPrimary,
      itemColorActive: '#FFFFFF',
      itemTextColorActive: colors.primary,
      itemBorderActive: cnBorder(colors.primary),
      itemColorActiveHover: '#FFFFFF',
      itemTextColorHover: colors.primary,
      itemBorderRadius: `${radius.sm}px`
    }
  };

  return overrides ? defu(overrides, theme) : theme;
}
