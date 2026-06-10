// @unocss-include

import type { Preset } from '@unocss/core';
import type { Theme } from '@unocss/preset-mini';

/**
 * 楚能设计 Token（与 src/theme/design-tokens.ts 保持同步）
 *
 * 用法原则（Naive UI 最佳实践）：
 * - 组件默认样式 → naive-chuneng.ts + getNaiveTheme 主题覆盖
 * - 开发直接用 <NButton type="primary">、<NInput> 等，无需 cn-btn/cn-input
 * - UnoCSS 仅提供：设计色板、字阶/圆角原子类、业务语义标签、滚动条工具类
 */
export const chunengThemeColors = {
  cn: {
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

const chunengThemeExtend: Pick<Theme, 'fontSize' | 'borderRadius'> = {
  fontSize: {
    'cn-xl': ['24px', { lineHeight: '36px', fontWeight: '600' }],
    'cn-lg': ['20px', { lineHeight: '30px', fontWeight: '600' }],
    'cn-md': ['16px', { lineHeight: '24px', fontWeight: '600' }],
    'cn-base': ['14px', { lineHeight: '20px' }],
    'cn-sm': ['12px', { lineHeight: '18px' }]
  },
  borderRadius: {
    'cn-sm': '4px',
    'cn-md': '6px',
    'cn-lg': '10px'
  }
};

/** 仅保留 Naive 主题无法表达的业务语义 */
const chunengShortcuts: Record<string, string> = {
  'cn-tag-running': 'text-cn-sm font-600 !bg-success/12 !border !border-success/35 !text-success',
  'cn-tag-charging': 'text-cn-sm font-600 !bg-primary/10 !border !border-primary/30 !text-primary',
  'cn-tag-alarm': 'text-cn-sm font-600 !bg-error/10 !border !border-error/35 !text-error',
  'cn-tag-offline': 'text-cn-sm font-600 !bg-cn-hover !border !border-cn-border !text-cn-text-hint',
  'cn-scrollbar':
    'overflow-auto [scrollbar-width:thin] [scrollbar-color:#DEE2EE_transparent] [&::-webkit-scrollbar]:w-6px [&::-webkit-scrollbar]:h-6px [&::-webkit-scrollbar-thumb]:rd-3px [&::-webkit-scrollbar-thumb]:bg-cn-border hover:[&::-webkit-scrollbar-thumb]:bg-primary-400 [&::-webkit-scrollbar-track]:bg-transparent'
};

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
