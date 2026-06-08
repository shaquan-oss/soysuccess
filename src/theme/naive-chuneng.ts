import type { GlobalThemeOverrides } from 'naive-ui';
import { chunengDesignTokens } from './design-tokens';

const { color, fontSize, radius, buttonHeight } = chunengDesignTokens;
const r = (px: number) => `${px}px`;
const h = (px: number) => `${px}px`;
const border = (c: string) => `1px solid ${c}`;
const focusRing = '0 0 0 2px rgba(0, 40, 170, 0.12)';

/** 楚能 UI 设计稿 · Naive UI 组件主题覆盖 */
export const chunengNaiveOverrides: GlobalThemeOverrides = {
  common: {
    borderRadius: r(radius.sm),
    borderRadiusSmall: r(radius.sm),
    fontWeightStrong: '600',
    lineHeight: '1.43',
    textColor1: color.textPrimary,
    textColor2: color.textSecondary,
    textColor3: color.textHint,
    borderColor: color.border,
    dividerColor: color.border,
    hoverColor: color.rowHover,
    primaryColor: color.primary,
    primaryColorHover: color.primaryHover,
    primaryColorPressed: color.primaryPressed,
    primaryColorSuppl: color.primaryPressed
  },
  Button: {
    borderRadiusMedium: r(radius.sm),
    borderRadiusSmall: r(radius.sm),
    borderRadiusLarge: r(radius.sm),
    fontWeightStrong: '600',
    heightMedium: h(buttonHeight.medium),
    heightSmall: h(buttonHeight.small),
    heightLarge: h(buttonHeight.large),
    paddingMedium: '0 16px',
    paddingSmall: '0 12px',
    paddingLarge: '0 20px',
    fontSizeMedium: `${fontSize.base}px`,
    colorPrimary: color.primary,
    colorHoverPrimary: color.primaryHover,
    colorPressedPrimary: color.primaryPressed,
    colorFocusPrimary: color.primary,
    textColorPrimary: '#FFFFFF',
    textColorHoverPrimary: '#FFFFFF',
    textColorPressedPrimary: '#FFFFFF',
    textColorFocusPrimary: '#FFFFFF',
    borderPrimary: border(color.primary),
    borderHoverPrimary: border(color.primaryHover),
    borderPressedPrimary: border(color.primaryPressed),
    borderFocusPrimary: border(color.primary)
  },
  Tag: {
    borderRadius: r(radius.sm),
    heightMedium: '24px',
    fontWeightStrong: '600',
    fontSizeMedium: `${fontSize.sm}px`
  },
  Card: {
    borderRadius: r(radius.md),
    paddingMedium: '16px',
    titleFontWeight: '600',
    titleFontSize: `${fontSize.md}px`,
    color: color.bgPage,
    borderColor: color.border
  },
  Dialog: {
    borderRadius: r(radius.md),
    padding: '20px 24px',
    titleFontSize: `${fontSize.md}px`,
    titleFontWeight: '600'
  },
  Modal: {
    borderRadius: r(radius.md)
  },
  Popover: {
    borderRadius: r(radius.md)
  },
  Dropdown: {
    borderRadius: r(radius.md)
  },
  Input: {
    borderRadius: r(radius.sm),
    heightMedium: h(buttonHeight.medium),
    heightSmall: h(buttonHeight.small),
    heightLarge: h(buttonHeight.large),
    fontSizeMedium: `${fontSize.base}px`,
    border: border(color.border),
    borderHover: border(color.primaryHover),
    borderFocus: border(color.primary),
    boxShadowFocus: focusRing,
    caretColor: color.primary,
    colorFocus: '#FFFFFF'
  },
  Select: {
    borderRadius: r(radius.sm),
    peers: {
      InternalSelection: {
        borderRadius: r(radius.sm),
        heightMedium: h(buttonHeight.medium),
        heightSmall: h(buttonHeight.small),
        heightLarge: h(buttonHeight.large),
        fontSizeMedium: `${fontSize.base}px`,
        border: border(color.border),
        borderHover: border(color.primaryHover),
        borderActive: border(color.primary),
        borderFocus: border(color.primary),
        boxShadowFocus: focusRing,
        caretColor: color.primary
      },
      InternalSelectMenu: {
        borderRadius: r(radius.md),
        optionColorActive: color.primary,
        optionTextColorActive: '#FFFFFF',
        optionColorActivePending: color.primaryHover,
        optionColorPending: color.rowHover,
        optionCheckColor: '#FFFFFF'
      }
    }
  },
  Alert: {
    borderRadius: r(radius.sm),
    padding: '12px 16px',
    titleFontWeight: '600',
    fontSize: `${fontSize.base}px`
  },
  Badge: {
    borderRadius: r(radius.sm)
  },
  Tabs: {
    tabBorderRadius: r(radius.sm),
    tabFontWeightActive: '600',
    tabFontSizeMedium: `${fontSize.base}px`
  },
  DataTable: {
    borderRadius: r(radius.md),
    thFontWeight: '600',
    thPaddingMedium: '12px 16px',
    tdPaddingMedium: '12px 16px',
    thColor: color.bgPage,
    thTextColor: color.textSecondary,
    tdColorHover: color.rowHover,
    borderColor: color.border,
    fontSizeMedium: `${fontSize.base}px`
  },
  Progress: {
    railRadius: r(radius.sm),
    fillRadius: r(radius.sm)
  },
  Switch: {
    railBorderRadiusSmall: r(radius.sm),
    railBorderRadiusMedium: r(radius.md),
    railBorderRadiusLarge: r(radius.md),
    railColorActive: color.primary,
    boxShadowFocus: focusRing
  },
  Message: {
    borderRadius: r(radius.sm)
  },
  Notification: {
    borderRadius: r(radius.md)
  },
  Pagination: {
    buttonBorder: border(color.border),
    itemBorder: border(color.border),
    itemBorderRadius: r(radius.sm),
    itemColorActive: color.primary,
    itemTextColorActive: '#FFFFFF',
    itemBorderActive: border(color.primary),
    itemColorActiveHover: color.primaryHover,
    itemTextColorHover: color.primary
  },
  Checkbox: {
    borderRadius: r(radius.sm),
    colorChecked: color.primary,
    borderChecked: border(color.primary),
    borderFocus: border(color.primary),
    boxShadowFocus: focusRing,
    checkMarkColor: '#FFFFFF'
  },
  Scrollbar: {
    color: color.border,
    colorHover: color.primaryHover,
    width: '6px',
    height: '6px',
    borderRadius: '3px'
  }
};
