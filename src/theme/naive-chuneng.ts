import type { GlobalThemeOverrides } from 'naive-ui';
import { chunengDesignTokens } from './design-tokens';

const { color, fontSize, radius, buttonHeight } = chunengDesignTokens;
const px = (n: number) => `${n}px`;

/**
 * 楚能 UI 静态 Token（对照 UI 稿 05 控件章节）
 *
 * 职责：仅包含与主题色无关的固定值——尺寸、圆角、字重、禁用态、静态文字色。
 * 交互色（hover/pressed/focus/选中边框）全部由 getNaiveTheme 负责。
 *
 * 圆角规则（UI 稿 02 圆角）：
 *   4px (radius.sm)  — 按钮 / Input / Select / Switch small / Checkbox / 标签
 *   6px (radius.md)  — 弹窗 / Card / DataTable / Select 下拉面板 / Switch medium
 *  10px (radius.lg)  — 大模块（暂未用）
 */
export const chunengNaiveOverrides: GlobalThemeOverrides = {
  common: {
    borderRadius: px(radius.sm), // 全局默认圆角 4px
    borderRadiusSmall: px(radius.sm), // small 尺寸圆角 4px
    fontWeightStrong: '600', // 加粗字重
    lineHeight: '1.43', // 全局行高（≈ 20/14）
    textColor1: color.textPrimary, // 一级文字 #02010F
    textColor2: color.textSecondary, // 二级文字 #434343
    textColor3: color.textHint, // 提示/三级文字 #656565
    borderColor: color.border, // 边框/分割线 #DEE2EE
    dividerColor: color.border, // 分隔线与边框同色
    hoverColor: color.rowHover, // 列表/表格行悬停背景 #ECF1F7
    bodyColor: color.bgPage // 页面背景色 #F6F9FE
  },

  Button: {
    // 圆角（UI 稿 02 圆角 4px）
    borderRadiusMedium: px(radius.sm),
    borderRadiusSmall: px(radius.sm),
    borderRadiusLarge: px(radius.sm),

    // 字重
    fontWeightStrong: '600',

    // 高度（UI 稿 02 按钮高度：32 / 36 / 48）
    heightMedium: px(buttonHeight.medium), // 36px
    heightSmall: px(buttonHeight.small), // 32px
    heightLarge: px(buttonHeight.large), // 48px

    // 内边距
    paddingMedium: '0 16px',
    paddingSmall: '0 12px',
    paddingLarge: '0 20px',

    // 字号
    fontSizeMedium: `${fontSize.base}px`, // 14px

    // Primary 按钮文字颜色（白底蓝色主按钮）
    textColorPrimary: '#FFFFFF',
    textColorHoverPrimary: '#FFFFFF',
    textColorPressedPrimary: '#FFFFFF',
    textColorFocusPrimary: '#FFFFFF',

    // 禁用态（UI 稿 03 禁用：灰底白字、无边框）
    colorDisabled: color.disabled, // 灰色背景 #BEC3C9
    colorDisabledPrimary: color.disabled, // primary 禁用同上
    textColorDisabled: '#FFFFFF', // 禁用文字白色
    textColorDisabledPrimary: '#FFFFFF', // primary 禁用文字白色
    borderDisabled: '1px solid transparent', // 禁用无边框
    borderDisabledPrimary: '1px solid transparent',
    opacityDisabled: '1' // 禁用不降低透明度，颜色已由 colorDisabled 控制
  },

  Input: {
    // 圆角 4px（与按钮一致）
    borderRadius: px(radius.sm),

    // 高度与按钮同规格（UI 稿 05 文本框）
    heightMedium: px(buttonHeight.medium), // 36px
    heightSmall: px(buttonHeight.small), // 32px
    heightLarge: px(buttonHeight.large), // 48px

    // 字号
    fontSizeMedium: `${fontSize.base}px` // 14px
  },

  Select: {
    // 触发器圆角 4px
    borderRadius: px(radius.sm),
    peers: {
      InternalSelection: {
        // 选择框圆角/高度/字号（UI 稿 05 下拉框）
        borderRadius: px(radius.sm),
        heightMedium: px(buttonHeight.medium),
        heightSmall: px(buttonHeight.small),
        heightLarge: px(buttonHeight.large),
        fontSizeMedium: `${fontSize.base}px`
      },
      InternalSelectMenu: {
        // 下拉面板圆角 6px（UI 稿 02 圆角规则：弹窗/下拉用 md）
        borderRadius: px(radius.md)
      }
    }
  },

  DataTable: {
    // 整体圆角 6px（UI 稿大模块）
    borderRadius: px(radius.md),

    // 表头字重加粗（UI 稿表头强调）
    thFontWeight: '600',

    // 单元格内边距（UI 稿 12px 上下 16px 左右）
    thPaddingMedium: '12px 16px',
    tdPaddingMedium: '12px 16px',

    // 表头背景色（页面背景色，与正文区分）
    thColor: color.bgPage,

    // 表头文字使用二级色
    thTextColor: color.textSecondary,

    // 行 hover 背景
    tdColorHover: color.rowHover,

    // 表格边框色
    borderColor: color.border,

    // 字号
    fontSizeMedium: `${fontSize.base}px` // 14px
  },

  Dialog: {
    // 圆角 6px（UI 稿 05 弹窗）
    borderRadius: px(radius.md),

    // 内边距
    padding: '20px 24px',

    // 标题字号/字重（UI 稿 05 弹窗标题）
    titleFontSize: `${fontSize.md}px`, // 16px
    titleFontWeight: '600'
  },

  Modal: {
    // 圆角与 Dialog 一致
    borderRadius: px(radius.md)
  },

  Checkbox: {
    // 圆角 4px（UI 稿 05 复选框）
    borderRadius: px(radius.sm),

    // 勾选符号白色
    checkMarkColor: '#FFFFFF'
  },

  Switch: {
    // Switch small 用 4px 圆角，medium 用 6px（UI 稿 05 开关）
    railBorderRadiusSmall: px(radius.sm),
    railBorderRadiusMedium: px(radius.md)
  }
};
