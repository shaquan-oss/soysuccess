/**
 * 楚能 UI 设计稿 Token 单一数据源（SSOT）
 *
 * 对照 UI 稿章节：
 * - 01 字体：fontSize / lineHeight（24/20/16/14/12 + 对应行高）
 * - 02 颜色：primary / 文字三级 / success·warning·error·info / 一般 UI 色
 * - 02 圆角：大模块 10 · 弹窗/卡片 6 · 按钮/标签 4
 * - 02 按钮高度：small 32 · medium 36 · large 48
 * - 02 辅配色：chartPalette（图表 9 色）
 *
 * 消费方：
 * - naive-chuneng.ts → 组件尺寸/圆角/禁用态
 * - getNaiveTheme (shared.ts) → 交互色（hover/pressed/边框/选中态）
 * - packages/uno-preset/src/chuneng.ts → UnoCSS 色板与字阶（须与本文件数值同步）
 */
export const chunengDesignTokens = {
  /** UI 稿 02 颜色 · 品牌蓝交互态 + 语义色 + 一般色 */
  color: {
    primary: '#0028AA', // 品牌色 100%
    primaryHover: '#7A8FD2', // 按钮 Hover
    primaryPressed: '#4D69C4', // 按钮 Pressed
    textPrimary: '#02010F', // 一级文字
    textSecondary: '#434343', // 二级文字
    textHint: '#656565', // 提示/三级文字
    success: '#2CCFDC', // 成功/提交（设计稿功能色，非品牌绿）
    warning: '#F4BB4A',
    error: '#F76359',
    info: '#1677FF',
    border: '#DEE2EE', // 边框/分割线
    bgPage: '#F6F9FE', // 页面/区块背景
    disabled: '#BEC3C9', // 禁用
    icon: '#E4E4E4', // 小图标默认色
    rowHover: '#ECF1F7' // 列表/表格行悬停
  },
  /** UI 稿 02 辅配色 · 图表 9 色 */
  chartPalette: [
    '#0028AA',
    '#00BDFF',
    '#40D585',
    '#1677FF',
    '#FF5798',
    '#8C8EFF',
    '#FAAE15',
    '#FF7700',
    '#52C41A'
  ] as const,
  /** UI 稿 01 字体 */
  fontSize: {
    xl: 24,
    lg: 20,
    md: 16,
    base: 14,
    sm: 12
  },
  lineHeight: {
    xl: 36,
    lg: 30,
    md: 24,
    base: 20,
    sm: 18
  },
  /** UI 稿 02 圆角 */
  radius: {
    sm: 4, // 按钮/标签/Input/Switch(small)
    md: 6, // 弹窗/下拉/Card/DataTable
    lg: 10 // 大模块
  },
  /** UI 稿 02 按钮高度（Naive Button/Input 同高） */
  buttonHeight: {
    small: 32,
    medium: 36,
    large: 48
  }
} as const;

export type ChunengChartColor = (typeof chunengDesignTokens.chartPalette)[number];
