// @unocss-include

import type { Preset } from '@unocss/core';
import type { Theme } from '@unocss/preset-mini';

/**
 * 楚能 UnoCSS 预设 · 对照 UI 稿
 *
 * | UI 稿章节 | 本文件实现 | Naive 主题侧 |
 * |-----------|-----------|-------------|
 * | 品牌色拆解（蓝/绿阶） | chunengThemeColors.cn.blue/green | primary 随 themeColor 动态变化 |
 * | 02 语义色/一般色 | cn.success/warning/error、cn.text、cn.border/bg | design-tokens + getNaiveTheme |
 * | 01 字体 | text-cn-xl ~ text-cn-sm | — |
 * | 02 圆角 | rd-cn-sm/md/lg | naive-chuneng.ts |
 * | 04 图标尺寸 | icon-cn-menu/sm/xs | — |
 * | 03 按钮/05 控件 | —（用 NButton type / 主题覆盖） | naive-chuneng + getNaiveTheme |
 * | 设备状态标签 | cn-tag-* shortcuts | Tag type 无法还原浅色底，保留 shortcut |
 *
 * 色值须与 src/theme/design-tokens.ts 保持一致。
 */
export const chunengThemeColors = {
  cn: {
    /** UI 稿 · 品牌蓝色阶 100%→10% + hover/pressed */
    blue: {
      100: '#0028AA',
      hover: '#7A8FD2',
      pressed: '#4D69C4',
      90: '#193db2',
      80: '#3353bb',
      70: '#4c68c3',
      60: '#667ecc',
      50: '#7f93d4',
      40: '#99a9dd',
      30: '#b2bee5',
      20: '#ccd4ee',
      10: '#e5e9f6'
    },
    /** UI 稿 · 品牌绿色阶（能源/品牌语义，非功能 success 色） */
    green: {
      100: '#04ce19',
      90: '#1dd330',
      80: '#36d847',
      70: '#4fdd5e',
      60: '#68e275',
      50: '#81e68c',
      40: '#9beba3',
      30: '#b3f0ba',
      20: '#cdf5d1',
      10: '#e5fae8'
    },
    success: '#2CCFDC',
    warning: '#F4BB4A',
    error: '#F76359',
    info: '#1677FF',
    text: {
      primary: '#02010F',
      secondary: '#434343',
      hint: '#656565'
    },
    border: '#DEE2EE',
    bg: '#F6F9FE',
    hover: '#ECF1F7',
    disabled: '#BEC3C9',
    icon: '#E4E4E4',
    /** UI 稿 · 图表辅配色 9 色 */
    chart: {
      1: '#0028AA',
      2: '#00BDFF',
      3: '#40D585',
      4: '#1677FF',
      5: '#FF5798',
      6: '#8C8EFF',
      7: '#FAAE15',
      8: '#FF7700',
      9: '#52C41A'
    },
    'green-aux': '#03a53d'
  }
} as const;

/** UI 稿 01 字体 · 原子类 text-cn-* */
const chunengThemeExtend: Pick<Theme, 'fontSize' | 'borderRadius'> = {
  fontSize: {
    'cn-xl': ['24px', { lineHeight: '36px', fontWeight: '600' }],
    'cn-lg': ['20px', { lineHeight: '30px', fontWeight: '600' }],
    'cn-md': ['16px', { lineHeight: '24px', fontWeight: '600' }],
    'cn-base': ['14px', { lineHeight: '20px' }],
    'cn-sm': ['12px', { lineHeight: '18px' }]
  },
  /** UI 稿 02 圆角 · 原子类 rd-cn-* */
  borderRadius: {
    'cn-sm': '4px',
    'cn-md': '6px',
    'cn-lg': '10px'
  }
};

/** 业务语义：Naive Tag type 无法精确还原设计稿浅色底标签 */
const chunengShortcuts: Record<string, string> = {
  'cn-tag-running': 'text-cn-sm font-600 !bg-success/12 !border !border-success/35 !text-success',
  'cn-tag-charging': 'text-cn-sm font-600 !bg-primary/10 !border !border-primary/30 !text-primary',
  'cn-tag-alarm': 'text-cn-sm font-600 !bg-error/10 !border !border-error/35 !text-error',
  'cn-tag-offline': 'text-cn-sm font-600 !bg-cn-hover !border !border-cn-border !text-cn-text-hint',
  /** UI 稿 · 细滚动条，列表/日志区 */
  'cn-scrollbar':
    'overflow-auto [scrollbar-width:thin] [scrollbar-color:#DEE2EE_transparent] [&::-webkit-scrollbar]:w-6px [&::-webkit-scrollbar]:h-6px [&::-webkit-scrollbar-thumb]:rd-3px [&::-webkit-scrollbar-thumb]:bg-cn-border hover:[&::-webkit-scrollbar-thumb]:bg-primary-400 [&::-webkit-scrollbar-track]:bg-transparent'
};

/** UI 稿 04 图标 · 24 / 20 / 16px（线宽由 SVG 组件控制） */
const chunengRules: Preset<Theme>['rules'] = [
  ['icon-cn-menu', { width: '24px', height: '24px', flexShrink: '0' }],
  ['icon-cn-sm', { width: '20px', height: '20px', flexShrink: '0' }],
  ['icon-cn-xs', { width: '16px', height: '16px', flexShrink: '0' }]
];

export function presetChuneng(): Preset<Theme> {
  return {
    name: 'preset-chuneng',
    theme: {
      colors: chunengThemeColors,
      ...chunengThemeExtend
    },
    rules: chunengRules,
    shortcuts: [chunengShortcuts]
  };
}

export default presetChuneng;
