/**
 * 楚能 UI 设计稿标准 Token（2026）
 * 来源：标准字 / 标准色 / 控件 / 表单规范
 */
export const chunengDesignTokens = {
  color: {
    primary: '#0028AA',
    primaryHover: '#7A8FD2',
    primaryPressed: '#4D69C4',
    textPrimary: '#02010F',
    textSecondary: '#434343',
    textHint: '#656565',
    success: '#2CCFDC',
    warning: '#F4BB4A',
    error: '#F76359',
    info: '#1677FF',
    border: '#DEE2EE',
    bgPage: '#F6F9FE',
    disabled: '#BEC3C9',
    icon: '#E4E4E4',
    rowHover: '#ECF1F7'
  },
  /** 图表辅配色（设计稿 9 色，主系列优先用 primary） */
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
  /** 圆角：小 4px / 中 6px / 大 10px */
  radius: {
    sm: 4,
    md: 6,
    lg: 10
  },
  /** 按钮高度：small 32 / medium 36 / large 48 */
  buttonHeight: {
    small: 32,
    medium: 36,
    large: 48
  }
} as const;

export type ChunengChartColor = (typeof chunengDesignTokens.chartPalette)[number];
