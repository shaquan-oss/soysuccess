import type { GlobalThemeOverrides } from 'naive-ui';
import { chunengDesignTokens } from './design-tokens';

const { color, fontSize, radius, buttonHeight } = chunengDesignTokens;
const px = (n: number) => `${n}px`;

/**
 * 楚能 UI · Naive UI 结构覆盖（对照 UI 稿）
 *
 * 职责边界：
 * - 本文件：尺寸、圆角、文字/边框/背景/禁用等静态 token（来自 design-tokens.ts）
 * - getNaiveTheme：交互色（hover/pressed/聚焦/选中），随 themeColor 抽屉可切换
 *
 * | 组件 | UI 稿章节 | 本文件覆盖 |
 * |------|----------|-----------|
 * | common | 02 颜色/一般色 | 文字三级、边框、列表 hover、页面背景 |
 * | Button | 02 高度/圆角/03 禁用 | 32/36/48、4px 圆角、灰底白字禁用 |
 * | Input/Select | 05 文本框/下拉 | 同按钮高度、4px 圆角；边框色见 getNaiveTheme |
 * | DataTable | 一般色 + 01 表头字 | 表头 bgPage、行 hover、6px 圆角 |
 * | Dialog/Modal | 05 弹窗 | 6px 圆角、标题 16px |
 * | Tabs/Checkbox/Switch | 05 切换/复选/开关 | 圆角；Switch 开/关色由主题 primary/error 驱动 |
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
