// @unocss-include

import type { Preset } from '@unocss/core';
import type { Theme } from '@unocss/preset-mini';

/** 楚能 Cornex 品牌色（UnoCSS theme 扩展） */
export const chunengThemeColors = {
  cn: {
    blue: {
      100: '#0028AA',
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
    teal: '#027b62',
    'green-aux': '#03a53d',
    'blue-aux': '#015286'
  }
};

/** 有序色阶（避免 Object.entries 数字键排序问题） */
export const chunengBlueScale = [
  { label: '100%', hex: chunengThemeColors.cn.blue[100] },
  { label: '90%', hex: chunengThemeColors.cn.blue[90] },
  { label: '80%', hex: chunengThemeColors.cn.blue[80] },
  { label: '70%', hex: chunengThemeColors.cn.blue[70] },
  { label: '60%', hex: chunengThemeColors.cn.blue[60] },
  { label: '50%', hex: chunengThemeColors.cn.blue[50] },
  { label: '40%', hex: chunengThemeColors.cn.blue[40] },
  { label: '30%', hex: chunengThemeColors.cn.blue[30] },
  { label: '20%', hex: chunengThemeColors.cn.blue[20] },
  { label: '10%', hex: chunengThemeColors.cn.blue[10] }
];

export const chunengGreenScale = [
  { label: '100%', hex: chunengThemeColors.cn.green[100] },
  { label: '90%', hex: chunengThemeColors.cn.green[90] },
  { label: '80%', hex: chunengThemeColors.cn.green[80] },
  { label: '70%', hex: chunengThemeColors.cn.green[70] },
  { label: '60%', hex: chunengThemeColors.cn.green[60] },
  { label: '50%', hex: chunengThemeColors.cn.green[50] },
  { label: '40%', hex: chunengThemeColors.cn.green[40] },
  { label: '30%', hex: chunengThemeColors.cn.green[30] },
  { label: '20%', hex: chunengThemeColors.cn.green[20] },
  { label: '10%', hex: chunengThemeColors.cn.green[10] }
];

/** 楚能 cn-* 语义化 shortcuts */
const chunengShortcuts: Record<string, string> = {
  // ---------- 页面布局（非 Naive 组件，业务页常用） ----------
  /** 列表页/详情页根容器：纵向间距 16px */
  'cn-page': 'flex flex-col gap-16px',
  /** 页头：左侧标题 + 右侧操作按钮 */
  'cn-page-header': 'flex flex-wrap items-center justify-between gap-12px',
  /** 页面主标题 */
  'cn-page-title': 'text-18px font-600 text-cn-blue-100 m-0 leading-tight',
  /** 页面副标题/说明文字 */
  'cn-page-desc': 'text-13px text-gray-500 m-0 mt-4px',
  /** 表格/列表上方筛选工具栏 */
  'cn-toolbar': 'flex flex-wrap items-center gap-12px p-12px rd-8px bg-container border border-primary/12',
  /** 区块小标题（表单分组、图表区等） */
  'cn-section-title':
    'relative pl-12px text-16px font-600 text-cn-blue-100 leading-normal before:(content-empty absolute left-0 top-2px bottom-2px w-3px rd-2px bg-gradient-to-b from-cn-blue-100 to-cn-green-100)',
  /** KPI 指标卡片区：响应式 1→2→4 列 */
  'cn-stat-row': 'grid grid-cols-1 s:grid-cols-2 l:grid-cols-4 gap-16px',
  /** 设备参数/详情：label-value 网格 */
  'cn-kv-grid': 'grid grid-cols-2 s:grid-cols-3 m:grid-cols-4 gap-x-24px gap-y-16px',
  /** 参数名（如 SOC、温度） */
  'cn-kv-label': 'text-12px text-gray-500 leading-none',
  /** 参数值（等宽数字，适合监测数据） */
  'cn-kv-value': 'text-16px font-600 text-base-text font-mono mt-4px',
  /** 状态圆点基类，配合 cn-status-dot-* 使用 */
  'cn-status-dot': 'inline-block size-8px rd-full shrink-0',
  'cn-status-dot-running': 'cn-status-dot bg-cn-green-100 shadow-[0_0_0_2px_rgba(4,206,25,0.35)]',
  'cn-status-dot-alarm': 'cn-status-dot bg-error shadow-[0_0_0_2px_rgba(245,34,45,0.35)]',
  'cn-status-dot-offline': 'cn-status-dot bg-gray-400',
  /** ECharts / 图表容器 */
  'cn-chart-wrap': 'w-full min-h-360px rd-8px bg-container border border-primary/12 p-12px',
  /** 空数据占位 */
  'cn-empty': 'flex flex-col items-center justify-center py-48px text-gray-400 text-14px',

  // ---------- 按钮 Button（直接加在 NButton 上） ----------
  'cn-btn': 'font-500 tracking-wide transition-all duration-200 ease-in-out',
  'cn-btn-primary':
    'cn-btn !bg-gradient-to-br !from-cn-blue-100 !to-cn-blue-90 !border !border-primary/25 !text-white shadow-[0_2px_6px_rgba(0,40,170,0.2)] hover:!from-cn-blue-90 hover:!to-cn-blue-80 hover:shadow-[0_4px_12px_rgba(0,40,170,0.28)] hover:-translate-y-1px active:translate-y-0 active:shadow-[0_1px_4px_rgba(0,40,170,0.2)]',
  'cn-btn-accent':
    'cn-btn !bg-gradient-to-br !from-cn-green-100 !to-cn-green-aux !border !border-cn-green-100/30 !text-white shadow-[0_2px_6px_rgba(4,206,25,0.25)] hover:!from-cn-green-90 hover:!to-cn-green-100 hover:shadow-[0_4px_12px_rgba(4,206,25,0.32)]',
  'cn-btn-success':
    'cn-btn !bg-gradient-to-br !from-cn-teal !to-cn-green-aux !border !border-cn-green-aux/30 !text-white',
  'cn-btn-ghost':
    'cn-btn !bg-transparent !border !border-cn-blue-100 !text-cn-blue-100 hover:!bg-primary/6 hover:!border-cn-blue-90 hover:!text-cn-blue-90',
  'cn-btn-industrial':
    'cn-btn !bg-primary/4 !border !border-cn-blue-60 !border-dashed !text-cn-blue-100 font-mono text-13px hover:!bg-primary/8 hover:!border-cn-blue-100',
  'cn-btn-danger': 'cn-btn shadow-[0_2px_6px_rgba(245,34,45,0.2)]',
  'cn-btn-warning': 'cn-btn shadow-[0_2px_6px_rgba(250,173,20,0.25)]',
  'cn-btn-text': 'cn-btn !text-cn-blue-100 hover:!bg-primary/6',

  // ---------- 标签 Tag（电芯/设备状态） ----------
  'cn-tag': 'font-600 tracking-wide',
  'cn-tag-running': 'cn-tag !bg-cn-green-100/12 !border !border-cn-green-100/35 !text-cn-green-aux',
  'cn-tag-charging': 'cn-tag !bg-primary/10 !border !border-primary/30 !text-cn-blue-100',
  'cn-tag-discharging': 'cn-tag !bg-warning/12 !border !border-warning/35 !text-#d48806',
  'cn-tag-alarm': 'cn-tag !bg-error/10 !border !border-error/35 !text-#cf1322',
  'cn-tag-offline': 'cn-tag !bg-black/4 !border !border-black/12 !text-gray-500',
  'cn-tag-maintenance': 'cn-tag !bg-cn-blue-aux/10 !border !border-cn-blue-aux/30 !text-cn-blue-aux',
  'cn-tag-energy':
    'cn-tag !bg-gradient-to-br !from-cn-green-100/15 !to-cn-green-aux/10 !border !border-cn-green-100/40 !text-cn-green-aux',

  // ---------- 卡片 Card ----------
  'cn-card':
    'border border-primary/12 shadow-[0_2px_12px_rgba(0,40,170,0.08)] transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,40,170,0.1)]',
  'cn-card-highlight':
    'cn-card border-primary/20 bg-gradient-to-b from-primary/3 to-transparent [&_.n-card-header__main]:text-cn-blue-100 [&_.n-card-header__main]:font-600',
  'cn-card-metric': 'cn-card !border-l-3 !border-l-cn-blue-100 !rd-l-0 !rd-r-8px',

  // ---------- 弹窗 Modal / Dialog（加在 NModal 上） ----------
  'cn-modal':
    '[&_.n-card]:border [&_.n-card]:border-primary/12 [&_.n-card]:shadow-[0_8px_32px_rgba(0,40,170,0.15)] [&_.n-card-header]:border-b [&_.n-card-header]:border-primary/12 [&_.n-card-header]:pb-12px [&_.n-card-header__main]:text-cn-blue-100 [&_.n-card-header__main]:font-600',

  // ---------- 提示 Alert ----------
  'cn-alert': 'border border-transparent',
  'cn-alert-info': 'cn-alert !border-cn-blue-aux/25 !bg-cn-blue-aux/6',
  'cn-alert-success': 'cn-alert !border-cn-green-aux/25 !bg-cn-green-aux/6',
  'cn-alert-warning': 'cn-alert !border-warning/35',
  'cn-alert-error': 'cn-alert !border-error/30',
  'cn-alert-industrial':
    'cn-alert !border-l-4 !border-l-cn-blue-100 !border-y-transparent !border-r-transparent !bg-primary/4 font-mono text-13px',

  // ---------- 输入 Input / Select ----------
  'cn-input':
    'transition-shadow duration-200 [&_.n-input:not(.n-input--disabled):hover]:shadow-[0_0_0_1px_rgba(0,40,170,0.15)] [&_.n-input.n-input--focus]:shadow-[0_0_0_2px_rgba(0,40,170,0.15)]',
  'cn-input-industrial': 'cn-input [&_.n-input]:bg-primary/2 [&_.n-input]:font-mono',

  // ---------- 表格 DataTable（加在外层容器） ----------
  'cn-table':
    '[&_.n-data-table]:border [&_.n-data-table]:border-primary/12 [&_.n-data-table]:rd-8px [&_.n-data-table]:overflow-hidden [&_.n-data-table-th]:!bg-primary/4 [&_.n-data-table-th]:text-cn-blue-100 [&_.n-data-table-th]:font-600 [&_.n-data-table-tr:not(.n-data-table-tr--summary):hover_.n-data-table-td]:!bg-primary/3',

  // ---------- 徽章 Badge ----------
  'cn-badge': '[&_.n-badge-sup]:font-600'
};

/** 楚能 Cornex UnoCSS Preset */
export function presetChuneng(): Preset<Theme> {
  return {
    name: 'preset-chuneng',
    theme: {
      colors: chunengThemeColors
    },
    shortcuts: [chunengShortcuts]
  };
}

export default presetChuneng;
