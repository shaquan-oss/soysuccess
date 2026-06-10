import type { GlobalThemeOverrides } from 'naive-ui';
import { chunengDesignTokens } from './design-tokens';

const { color, fontSize, radius, buttonHeight } = chunengDesignTokens;
const px = (n: number) => `${n}px`;

/**
 * 楚能 UI · Naive UI 结构覆盖
 * 语义色与交互色由 getNaiveTheme 动态注入，此处仅保留尺寸、圆角、禁用态等静态结构
 */
export const chunengNaiveOverrides: GlobalThemeOverrides = {
  common: {
    borderRadius: px(radius.sm),
    borderRadiusSmall: px(radius.sm),
    fontWeightStrong: '600',
    lineHeight: '1.43',
    textColor1: color.textPrimary,
    textColor2: color.textSecondary,
    textColor3: color.textHint,
    borderColor: color.border,
    dividerColor: color.border,
    hoverColor: color.rowHover,
    bodyColor: color.bgPage
  },
  Button: {
    borderRadiusMedium: px(radius.sm),
    borderRadiusSmall: px(radius.sm),
    borderRadiusLarge: px(radius.sm),
    fontWeightStrong: '600',
    heightMedium: px(buttonHeight.medium),
    heightSmall: px(buttonHeight.small),
    heightLarge: px(buttonHeight.large),
    paddingMedium: '0 16px',
    paddingSmall: '0 12px',
    paddingLarge: '0 20px',
    fontSizeMedium: `${fontSize.base}px`,
    textColorPrimary: '#FFFFFF',
    textColorHoverPrimary: '#FFFFFF',
    textColorPressedPrimary: '#FFFFFF',
    textColorFocusPrimary: '#FFFFFF',
    colorDisabled: color.disabled,
    colorDisabledPrimary: color.disabled,
    textColorDisabled: '#FFFFFF',
    textColorDisabledPrimary: '#FFFFFF',
    borderDisabled: '1px solid transparent',
    borderDisabledPrimary: '1px solid transparent',
    opacityDisabled: '1'
  },
  Input: {
    borderRadius: px(radius.sm),
    heightMedium: px(buttonHeight.medium),
    heightSmall: px(buttonHeight.small),
    heightLarge: px(buttonHeight.large),
    fontSizeMedium: `${fontSize.base}px`
  },
  Select: {
    borderRadius: px(radius.sm),
    peers: {
      InternalSelection: {
        borderRadius: px(radius.sm),
        heightMedium: px(buttonHeight.medium),
        heightSmall: px(buttonHeight.small),
        heightLarge: px(buttonHeight.large),
        fontSizeMedium: `${fontSize.base}px`
      },
      InternalSelectMenu: {
        borderRadius: px(radius.md)
      }
    }
  },
  DataTable: {
    borderRadius: px(radius.md),
    thFontWeight: '600',
    thPaddingMedium: '12px 16px',
    tdPaddingMedium: '12px 16px',
    thColor: color.bgPage,
    thTextColor: color.textSecondary,
    tdColorHover: color.rowHover,
    borderColor: color.border,
    fontSizeMedium: `${fontSize.base}px`
  },
  Tabs: {
    tabFontWeightActive: '600',
    tabFontSizeMedium: `${fontSize.base}px`
  },
  Dialog: {
    borderRadius: px(radius.md),
    padding: '20px 24px',
    titleFontSize: `${fontSize.md}px`,
    titleFontWeight: '600'
  },
  Modal: {
    borderRadius: px(radius.md)
  },
  Checkbox: {
    borderRadius: px(radius.sm),
    checkMarkColor: '#FFFFFF'
  },
  Switch: {
    railBorderRadiusSmall: px(radius.sm),
    railBorderRadiusMedium: px(radius.md)
  }
};
