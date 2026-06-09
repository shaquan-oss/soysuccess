/**
 * 主题展示页专用数据（随 src/views/theme-showcase 一并删除）
 */
import { chunengThemeColors } from '@sa/uno-preset';
import { chunengDesignTokens } from './design-tokens';

export interface ColorSwatch {
  label: string;
  hex: string;
}

/** 品牌蓝色阶（展示用） */
export const showcaseBlueScale: ColorSwatch[] = [
  { label: '100%', hex: chunengThemeColors.cn.blue[100] },
  { label: 'Hover', hex: chunengThemeColors.cn.blue.hover },
  { label: 'Pressed', hex: chunengThemeColors.cn.blue.pressed },
  { label: '80%', hex: chunengThemeColors.cn.blue[80] },
  { label: '60%', hex: chunengThemeColors.cn.blue[60] },
  { label: '40%', hex: chunengThemeColors.cn.blue[40] },
  { label: '20%', hex: chunengThemeColors.cn.blue[20] },
  { label: '10%', hex: chunengThemeColors.cn.blue[10] }
];

/** 品牌绿色阶（展示用） */
export const showcaseGreenScale: ColorSwatch[] = [
  { label: '100%', hex: chunengThemeColors.cn.green[100] },
  { label: '90%', hex: chunengThemeColors.cn.green[90] },
  { label: '80%', hex: chunengThemeColors.cn.green[80] },
  { label: '60%', hex: chunengThemeColors.cn.green[60] },
  { label: '40%', hex: chunengThemeColors.cn.green[40] },
  { label: '20%', hex: chunengThemeColors.cn.green[20] },
  { label: '10%', hex: chunengThemeColors.cn.green[10] }
];

/** 一般 UI 色（展示用） */
export const showcaseGeneralColors: ColorSwatch[] = [
  { label: '边框/分割线', hex: chunengThemeColors.cn.border },
  { label: '背景色', hex: chunengThemeColors.cn.bg },
  { label: '列表悬停', hex: chunengThemeColors.cn.hover },
  { label: '禁用', hex: chunengThemeColors.cn.disabled },
  { label: '小图标', hex: chunengThemeColors.cn.icon }
];

/** 图表色板（展示用） */
export const showcaseChartColors: ColorSwatch[] = chunengDesignTokens.chartPalette.map((hex, i) => ({
  label: `Chart ${i + 1}`,
  hex
}));

export const showcaseTextColors: ColorSwatch[] = [
  { label: '一级文字', hex: chunengDesignTokens.color.textPrimary },
  { label: '二级文字', hex: chunengDesignTokens.color.textSecondary },
  { label: '提示文字', hex: chunengDesignTokens.color.textHint }
];

export const showcaseAuxColors: ColorSwatch[] = [
  { label: '主色 Hover', hex: chunengDesignTokens.color.primaryHover },
  { label: '主色 Pressed', hex: chunengDesignTokens.color.primaryPressed },
  { label: '边框/分割线', hex: chunengDesignTokens.color.border },
  { label: '页面背景', hex: chunengDesignTokens.color.bgPage },
  { label: '列表悬停', hex: chunengDesignTokens.color.rowHover }
];

export const showcaseButtonInteractionColors: ColorSwatch[] = [
  { label: '默认 Default', hex: chunengDesignTokens.color.primary },
  { label: 'Hover', hex: chunengDesignTokens.color.primaryHover },
  { label: 'Pressed', hex: chunengDesignTokens.color.primaryPressed }
];

export const showcaseRadiusSpec = [
  {
    label: '大模块圆角',
    px: chunengDesignTokens.radius.lg,
    usage: '页面大区块、主容器',
    shortcut: 'cn-rd-lg / cn-module-lg'
  },
  {
    label: '小模块 / 弹窗 / 下拉 / 大切换',
    px: chunengDesignTokens.radius.md,
    usage: 'Card、Modal、Dropdown、Switch(medium+)',
    shortcut: 'cn-rd-md'
  },
  {
    label: '按钮 / 标签 / 小切换',
    px: chunengDesignTokens.radius.sm,
    usage: 'Button、Tag、Input、Switch(small)',
    shortcut: 'cn-rd-sm'
  }
] as const;

export const showcaseButtonHeightSpec = [
  { size: 'small' as const, px: chunengDesignTokens.buttonHeight.small, desc: '表格内或空间紧凑的行级操作' },
  { size: 'medium' as const, px: chunengDesignTokens.buttonHeight.medium, desc: '主流页面级操作按钮（默认）' },
  { size: 'large' as const, px: chunengDesignTokens.buttonHeight.large, desc: '重点主操作或强调区域' }
];

export const showcaseStatMetrics = [
  { label: '今日产量', value: '12,580', unit: 'PCS', trend: '+8.2%' },
  { label: '设备在线率', value: '96.4', unit: '%', trend: '+0.3%' },
  { label: '告警数', value: '3', unit: '条', trend: '-2' },
  { label: '平均 SOC', value: '78.6', unit: '%', trend: '稳定' }
];

export const showcaseDeviceParams = [
  { label: 'SOC', value: '87.2%' },
  { label: 'SOH', value: '98.1%' },
  { label: '电压', value: '3.65 V' },
  { label: '电流', value: '12.3 A' },
  { label: '温度', value: '32.5 ℃' },
  { label: '循环次数', value: '1,024' }
];

export const showcaseStatusDotExamples = [
  { class: 'cn-status-dot cn-status-dot-running', label: '运行中', desc: 'cn-status-dot-running' },
  { class: 'cn-status-dot cn-status-dot-alarm', label: '告警', desc: 'cn-status-dot-alarm' },
  { class: 'cn-status-dot cn-status-dot-offline', label: '离线', desc: 'cn-status-dot-offline' }
];

export const showcaseScrollbarDemoItems = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `BMS-${String(i + 1).padStart(3, '0')}`,
  soc: `${60 + (i % 35)}%`,
  status: i % 5 === 0 ? '告警' : '运行中'
}));

export const showcaseSelectOptions = [
  { label: '产线 A · 电芯组装', value: 'line-a' },
  { label: '产线 B · 化成分容', value: 'line-b' },
  { label: '产线 C · PACK 集成', value: 'line-c' }
];

export interface ShowcaseDeviceRow {
  id: number;
  name: string;
  status: 'running' | 'charging' | 'alarm' | 'offline';
  soc: number;
  temperature: number;
}

export const showcaseTableData: ShowcaseDeviceRow[] = [
  { id: 1, name: 'BMS-001', status: 'running', soc: 87, temperature: 32.5 },
  { id: 2, name: 'BMS-002', status: 'charging', soc: 45, temperature: 28.1 },
  { id: 3, name: 'BMS-003', status: 'alarm', soc: 12, temperature: 48.6 },
  { id: 4, name: 'BMS-004', status: 'offline', soc: 0, temperature: 0 },
  { id: 5, name: 'PCS-001', status: 'running', soc: 92, temperature: 35.2 }
];

/** 代码片段提示框 class（展示用） */
export const showcaseCodeHintClass =
  'p-8px px-12px rd-4px bg-cn-bg border border-cn-border border-dashed font-mono cn-text-sm text-cn-text-hint break-all';
