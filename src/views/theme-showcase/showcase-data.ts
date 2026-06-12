/**
 * 主题展示页专用（删除 src/views/theme-showcase 时一并删除）
 */
import { chunengThemeColors } from '@sa/uno-preset';
import { chunengDesignTokens } from '@/theme/design-tokens';

export interface ColorSwatch {
  label: string;
  hex: string;
}

export const showcaseTabs = [
  { name: 'colors', label: '配色' },
  { name: 'buttons', label: '按钮' },
  { name: 'tags', label: '标签' },
  { name: 'feedback', label: '表单' },
  { name: 'layout', label: '布局' },
  { name: 'industrial', label: '图表' },
  { name: 'ems', label: 'EMS' }
] as const;

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

export const showcaseGreenScale: ColorSwatch[] = [
  { label: '100%', hex: chunengThemeColors.cn.green[100] },
  { label: '90%', hex: chunengThemeColors.cn.green[90] },
  { label: '80%', hex: chunengThemeColors.cn.green[80] },
  { label: '60%', hex: chunengThemeColors.cn.green[60] },
  { label: '40%', hex: chunengThemeColors.cn.green[40] },
  { label: '20%', hex: chunengThemeColors.cn.green[20] },
  { label: '10%', hex: chunengThemeColors.cn.green[10] }
];

export const showcaseGeneralColors: ColorSwatch[] = [
  { label: 'border', hex: chunengThemeColors.cn.border },
  { label: 'bg', hex: chunengThemeColors.cn.bg },
  { label: 'hover', hex: chunengThemeColors.cn.hover },
  { label: 'disabled', hex: chunengThemeColors.cn.disabled },
  { label: 'icon', hex: chunengThemeColors.cn.icon }
];

export const showcaseChartColors: ColorSwatch[] = chunengDesignTokens.chartPalette.map((hex, i) => ({
  label: `${i + 1}`,
  hex
}));

export const showcaseTextColors: ColorSwatch[] = [
  { label: 'primary', hex: chunengDesignTokens.color.textPrimary },
  { label: 'secondary', hex: chunengDesignTokens.color.textSecondary },
  { label: 'hint', hex: chunengDesignTokens.color.textHint }
];

export const showcaseAuxColors: ColorSwatch[] = [
  { label: 'hover', hex: chunengDesignTokens.color.primaryHover },
  { label: 'pressed', hex: chunengDesignTokens.color.primaryPressed },
  { label: 'border', hex: chunengDesignTokens.color.border },
  { label: 'bg', hex: chunengDesignTokens.color.bgPage },
  { label: 'rowHover', hex: chunengDesignTokens.color.rowHover }
];

export const showcaseButtonInteractionColors: ColorSwatch[] = [
  { label: 'default', hex: chunengDesignTokens.color.primary },
  { label: 'hover', hex: chunengDesignTokens.color.primaryHover },
  { label: 'pressed', hex: chunengDesignTokens.color.primaryPressed }
];

export const showcaseRadiusSpec = [
  { px: chunengDesignTokens.radius.lg },
  { px: chunengDesignTokens.radius.md },
  { px: chunengDesignTokens.radius.sm }
] as const;

export const showcaseButtonHeightSpec = [
  { size: 'small' as const, px: chunengDesignTokens.buttonHeight.small },
  { size: 'medium' as const, px: chunengDesignTokens.buttonHeight.medium },
  { size: 'large' as const, px: chunengDesignTokens.buttonHeight.large }
];

export const showcaseScrollbarDemoItems = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `BMS-${String(i + 1).padStart(3, '0')}`,
  soc: `${60 + (i % 35)}%`,
  status: i % 5 === 0 ? '告警' : '运行中'
}));

export const showcaseSelectOptions = [
  { label: '产线 A', value: 'line-a' },
  { label: '产线 B', value: 'line-b' },
  { label: '产线 C', value: 'line-c' }
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
