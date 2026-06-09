// @unocss-include

import type { Preset } from '@unocss/core';
import type { Theme } from '@unocss/preset-mini';

/** 楚能 UI 设计稿标准色（UnoCSS theme 扩展） */
export const chunengThemeColors = {
  cn: {
    /** 品牌蓝 + 交互态 */
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
    /** 品牌绿（能源语义保留） */
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
    /** 设计稿语义色 */
    success: '#2CCFDC',
    warning: '#F4BB4A',
    error: '#F76359',
    info: '#1677FF',
    /** 文字 */
    text: {
      primary: '#02010F',
      secondary: '#434343',
      hint: '#656565'
    },
    /** 一般 UI 色 */
    border: '#DEE2EE',
    bg: '#F6F9FE',
    hover: '#ECF1F7',
    disabled: '#BEC3C9',
    icon: '#E4E4E4',
    /** 图表辅配色 */
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
    teal: '#027b62',
    'green-aux': '#03a53d',
    'blue-aux': '#015286'
  }
};

/** 禁用时锁定样式，悬停/聚焦/按下均不变化 */
const cnBtnDisabledLock =
  '[&.n-button--disabled]:!cursor-not-allowed [&.n-button--disabled]:!transition-none [&.n-button--disabled]:!shadow-none [&.n-button--disabled]:!outline-none [&.n-button--disabled_.n-button__border]:!hidden [&.n-button--disabled_.n-button__state-border]:!hidden [&.n-button--disabled:hover_.n-button__border]:!hidden [&.n-button--disabled:hover_.n-button__state-border]:!hidden [&.n-button--disabled:focus_.n-button__state-border]:!hidden [&.n-button--disabled:active_.n-button__state-border]:!hidden [&.n-button--disabled]:[--n-color-hover:var(--n-color-disabled)] [&.n-button--disabled]:[--n-border-hover:var(--n-border-disabled)] [&.n-button--disabled]:[--n-border-color-hover:#BEC3C9] [&.n-button--disabled]:[--n-border-color-disabled:#BEC3C9]';

/** 实心按钮禁用态（灰底白字，无悬停反馈） */
const cnBtnDisabledSolid = `${cnBtnDisabledLock} [&.n-button--disabled]:!bg-cn-disabled [&.n-button--disabled]:!text-white [&.n-button--disabled]:!border-0 [&.n-button--disabled:hover]:!bg-cn-disabled [&.n-button--disabled:hover]:!text-white [&.n-button--disabled:hover]:!border-0 [&.n-button--disabled:focus]:!bg-cn-disabled [&.n-button--disabled:active]:!bg-cn-disabled [--n-border-disabled:1px_solid_transparent] [--n-color-disabled:#BEC3C9] [--n-color-disabled-primary:#BEC3C9]`;

/** 描边/次要按钮禁用态 */
const cnBtnDisabledMuted = `${cnBtnDisabledLock} [&.n-button--disabled]:!bg-white [&.n-button--disabled]:!border-cn-border [&.n-button--disabled]:!text-cn-disabled [&.n-button--disabled:hover]:!bg-white [&.n-button--disabled:hover]:!border-cn-border [&.n-button--disabled:hover]:!text-cn-disabled [&.n-button--disabled:focus]:!bg-white [&.n-button--disabled:active]:!bg-white`;

/** 跟随主题色板（rgb(var(--primary-*-color))，随主题抽屉实时更新） */
const cnPrimaryFill =
  '[&:not(.n-button--disabled)]:!bg-primary [&:not(.n-button--disabled)]:!border-primary [&:not(.n-button--disabled)_.n-button__border]:!border-primary';
const cnPrimaryHover =
  'hover:[&:not(.n-button--disabled)]:!bg-primary-400 hover:[&:not(.n-button--disabled)]:!border-primary-400 hover:[&:not(.n-button--disabled)_.n-button__border]:!border-primary-400';
const cnPrimaryPressed =
  'active:[&:not(.n-button--disabled)]:!bg-primary-600 active:[&:not(.n-button--disabled)]:!border-primary-600 active:[&:not(.n-button--disabled)_.n-button__border]:!border-primary-600';
const cnPrimaryFocusRing = 'shadow-[0_0_0_2px_rgb(var(--primary-color)/0.12)]';
const cnErrorFocusRing = 'shadow-[0_0_0_2px_rgb(var(--error-color)/0.12)]';

/** 楚能 cn-* 语义化 shortcuts */
const chunengShortcuts: Record<string, string> = {
  // ---------- 字体层级（设计稿 01 字体） ----------
  'cn-text-xl': 'text-24px leading-36px font-600 text-cn-text-primary',
  'cn-text-lg': 'text-20px leading-30px font-600 text-cn-text-primary',
  'cn-text-md': 'text-16px leading-24px font-600 text-cn-text-primary',
  'cn-text-base': 'text-14px leading-20px text-cn-text-primary',
  'cn-text-sm': 'text-12px leading-18px text-cn-text-hint',
  'cn-text-secondary': 'text-cn-text-secondary',
  'cn-text-hint': 'text-cn-text-hint',

  // ---------- 圆角层级（设计稿 02 圆角） ----------
  'cn-rd-sm': 'rd-4px',
  'cn-rd-md': 'rd-6px',
  'cn-rd-lg': 'rd-10px',
  /** 大模块容器（页面级区块） */
  'cn-module-lg': 'cn-rd-lg bg-cn-bg border border-cn-border p-16px',

  // ---------- 页面布局 ----------
  'cn-page': 'flex flex-col gap-16px',
  'cn-page-header': 'flex flex-wrap items-center justify-between gap-12px',
  'cn-page-title': 'cn-text-lg m-0',
  'cn-page-desc': 'cn-text-sm m-0 mt-4px',
  'cn-toolbar': 'flex flex-wrap items-center gap-12px p-12px cn-rd-md bg-container border border-cn-border',
  'cn-section-title':
    'relative pl-12px cn-text-md before:(content-empty absolute left-0 top-2px bottom-2px w-3px rd-2px bg-primary)',
  'cn-stat-row': 'grid grid-cols-1 s:grid-cols-2 l:grid-cols-4 gap-16px',
  'cn-kv-grid': 'grid grid-cols-2 s:grid-cols-3 m:grid-cols-4 gap-x-24px gap-y-16px',
  'cn-kv-label': 'cn-text-sm leading-none',
  'cn-kv-value': 'text-16px font-600 text-base-text font-mono mt-4px',
  'cn-status-dot': 'inline-block size-8px rd-full shrink-0',
  'cn-status-dot-running': 'cn-status-dot bg-success shadow-[0_0_0_2px_rgb(var(--success-color)/0.35)]',
  'cn-status-dot-alarm': 'cn-status-dot bg-error shadow-[0_0_0_2px_rgba(247,99,89,0.35)]',
  'cn-status-dot-offline': 'cn-status-dot bg-cn-disabled',
  'cn-chart-wrap': 'w-full min-h-360px cn-rd-md bg-container border border-cn-border p-12px',
  'cn-empty': 'flex flex-col items-center justify-center py-48px cn-text-hint',
  'cn-industrial-panel': 'cn-rd-md bg-cn-bg border border-cn-border p-16px',

  // ---------- 滚动条（工业风细滚动条） ----------
  'cn-scrollbar':
    'overflow-auto [scrollbar-width:thin] [scrollbar-color:var(--cn-scrollbar-thumb)_transparent] [&::-webkit-scrollbar]:w-6px [&::-webkit-scrollbar]:h-6px [&::-webkit-scrollbar-thumb]:rd-3px [&::-webkit-scrollbar-thumb]:bg-cn-border hover:[&::-webkit-scrollbar-thumb]:bg-primary-400 [&::-webkit-scrollbar-track]:bg-transparent',

  // ---------- 按钮（设计稿 03 控件：搜索/导出/确定/取消/新增） ----------
  'cn-btn': `cn-rd-sm cn-text-base font-500 tracking-wide transition-all duration-200 ease-in-out ${cnBtnDisabledLock}`,
  /** 实心主按钮：搜索 / 导出 / 确定 / + 新增 */
  'cn-btn-primary': `cn-btn !text-white ${cnPrimaryFill} ${cnPrimaryHover} ${cnPrimaryPressed} ${cnBtnDisabledSolid}`,
  /** 成功态实心：设计稿「成功」行 */
  'cn-btn-success': `cn-btn !text-white [&:not(.n-button--disabled)]:!bg-success [&:not(.n-button--disabled)]:!border-success [&:not(.n-button--disabled)_.n-button__border]:!border-success hover:[&:not(.n-button--disabled)]:!opacity-90 active:[&:not(.n-button--disabled)]:!opacity-80 ${cnBtnDisabledSolid}`,
  /** 能源强调（与 success 同色实心） */
  'cn-btn-accent':
    'cn-btn !bg-success !border !border-success !text-white hover:!opacity-90 active:!opacity-80 [&_.n-button__border]:!border-success [&_.n-button__content]:!text-white',
  /** 次要按钮 / 取消：灰框灰字，悬停不变，按下变实心主色 */
  'cn-btn-secondary':
    `cn-btn !bg-white !border !border-cn-border !text-cn-text-secondary hover:!bg-white hover:!border-cn-border hover:!text-cn-text-secondary active:!bg-primary-400 active:!border-primary-400 active:!text-white ${cnBtnDisabledMuted}`,
  /** @deprecated 使用 cn-btn-secondary，保留别名兼容 */
  'cn-btn-ghost':
    `cn-btn !bg-white !border !border-cn-border !text-cn-text-secondary hover:!bg-white hover:!border-cn-border hover:!text-cn-text-secondary active:!bg-primary-400 active:!border-primary-400 active:!text-white ${cnBtnDisabledMuted}`,
  /** 描边主按钮：+ 新增任务 */
  'cn-btn-outline':
    `cn-btn !bg-white !border !border-primary !text-primary hover:!bg-white hover:!border-primary-400 hover:!text-primary-400 active:!border-primary-600 active:!text-primary-600 ${cnBtnDisabledMuted}`,
  /** 次要 / 描边按钮的成功态 */
  'cn-btn-secondary-success':
    'cn-btn !bg-white !border !border-success !text-success hover:!bg-white hover:!border-success hover:!text-success active:!bg-success/10 active:!border-success active:!text-success',
  'cn-btn-outline-success':
    'cn-btn !bg-white !border !border-success !text-success hover:!bg-white hover:!border-success hover:!text-success active:!border-success active:!text-success',
  /** 左右间距：保存 44px / 下载打印 28px / + 新增 34px */
  'cn-btn-px-save': '[--n-padding:0_44px]',
  'cn-btn-px-tool': '[--n-padding:0_28px]',
  'cn-btn-px-add': '[--n-padding:0_34px]',
  'cn-btn-industrial':
    'cn-btn !bg-cn-bg !border !border-cn-border !border-dashed !text-cn-text-secondary font-mono cn-text-base hover:!bg-cn-hover',
  'cn-btn-danger': 'cn-btn !bg-error !border !border-error !text-white hover:!opacity-90 active:!opacity-80',
  'cn-btn-warning': 'cn-btn !bg-warning !border !border-warning !text-white hover:!opacity-90 active:!opacity-80',
  'cn-btn-text': 'cn-btn !text-primary hover:!bg-cn-hover',

  // ---------- 标签 Tag ----------
  'cn-tag': 'font-600 tracking-wide cn-text-sm',
  'cn-tag-running': 'cn-tag !bg-success/12 !border !border-success/35 !text-success',
  'cn-tag-charging': 'cn-tag !bg-primary/10 !border !border-primary/30 !text-primary',
  'cn-tag-discharging': 'cn-tag !bg-warning/12 !border !border-warning/35 !text-warning',
  'cn-tag-alarm': 'cn-tag !bg-error/10 !border !border-error/35 !text-error',
  'cn-tag-offline': 'cn-tag !bg-cn-hover !border !border-cn-border !text-cn-text-hint',
  'cn-tag-maintenance': 'cn-tag !bg-info/10 !border !border-info/30 !text-info',
  'cn-tag-energy': 'cn-tag !bg-cn-green-100/12 !border !border-cn-green-100/35 !text-cn-green-aux',

  // ---------- 卡片 Card ----------
  'cn-card':
    'border border-cn-border shadow-[0_1px_4px_rgb(var(--primary-color)/0.06)] transition-shadow duration-200 hover:shadow-[0_2px_8px_rgb(var(--primary-color)/0.08)]',
  'cn-card-highlight':
    'cn-card border-primary/20 bg-cn-bg [&_.n-card-header__main]:text-primary [&_.n-card-header__main]:font-600',
  'cn-card-metric': 'cn-card !border-l-3 !border-l-primary !rd-l-0 !rd-r-6px',

  // ---------- 弹窗 Modal / Dialog ----------
  'cn-modal':
    `[&_.n-card]:border [&_.n-card]:border-cn-border [&_.n-card]:shadow-[0_8px_24px_rgb(var(--primary-color)/0.12)] [&_.n-card-header]:border-b [&_.n-card-header]:border-cn-border [&_.n-card-header]:pb-12px [&_.n-card-header__main]:text-primary [&_.n-card-header__main]:font-600 [&_.n-dialog__title]:text-primary [&_.n-dialog__title]:font-600 [&_.n-dialog__action]:gap-12px [&_.n-button--default-type]:!bg-white [&_.n-button--default-type]:!border-cn-border [&_.n-button--default-type]:!text-cn-text-secondary [&_.n-button--primary-type]:!text-white ${cnPrimaryFill} ${cnPrimaryHover} ${cnPrimaryPressed} ${cnBtnDisabledSolid}`,

  // ---------- 输入 Input / Select（设计稿：默认灰框 / 输入中主色 / 错误红框红字） ----------
  'cn-input':
    `transition-shadow duration-200 [&_.n-input]:border-cn-border [&_.n-input:not(.n-input--disabled):hover]:border-primary-400 [&_.n-input.n-input--focus]:border-primary [&_.n-input.n-input--focus]:${cnPrimaryFocusRing} [&_.n-input.n-input--error-status]:!border-error [&_.n-input.n-input--error-status_.n-input__input-el]:!text-error [&_.n-input.n-input--error-status.n-input--focus]:!border-error [&_.n-input.n-input--error-status.n-input--focus]:${cnErrorFocusRing} [&_.n-base-selection]:border-cn-border [&_.n-base-selection:not(.n-base-selection--disabled):hover]:border-primary-400 [&_.n-base-selection.n-base-selection--active]:border-primary [&_.n-base-selection.n-base-selection--focus]:border-primary [&_.n-base-selection.n-base-selection--focus]:${cnPrimaryFocusRing} [&_.n-base-selection-label__suffix]:text-cn-text-hint [&_.n-base-selection--active_.n-base-selection-label__suffix]:!text-primary`,
  'cn-input-industrial': 'cn-input [&_.n-input]:bg-cn-bg [&_.n-input]:font-mono',
  'cn-select': 'cn-input',
  /** 设计稿翻页：当前页主色描边 + 白底 + 主色数字（随主题色板） */
  'cn-pagination':
    '[&_.n-pagination-item]:!bg-white [&_.n-pagination-item]:!border-cn-border [&_.n-pagination-item]:!text-cn-text-primary [&_.n-pagination-item:not(.n-pagination-item--disabled):hover]:!bg-cn-bg [&_.n-pagination-item--active]:!bg-white [&_.n-pagination-item--active]:!border-primary [&_.n-pagination-item--active]:!text-primary [&_.n-pagination-item--active:not(.n-pagination-item--disabled):hover]:!bg-white [&_.n-pagination-item--active:not(.n-pagination-item--disabled):hover]:!border-primary [&_.n-pagination-item--active:not(.n-pagination-item--disabled):hover]:!text-primary',
  'cn-alert': 'border border-transparent',
  'cn-alert-info': 'cn-alert !border-info/25 !bg-info/6',
  'cn-alert-success': 'cn-alert !border-success/25 !bg-success/6',
  'cn-alert-warning': 'cn-alert !border-warning/35 !bg-warning/6',
  'cn-alert-error': 'cn-alert !border-error/30 !bg-error/6',
  'cn-alert-industrial':
    'cn-alert !border-l-4 !border-l-primary !border-y-transparent !border-r-transparent !bg-cn-bg font-mono cn-text-base',

  // ---------- 提示 Alert ----------
  'cn-table':
    '[&_.n-data-table]:border [&_.n-data-table]:border-cn-border [&_.n-data-table]:cn-rd-md [&_.n-data-table]:overflow-hidden [&_.n-data-table-th]:!bg-cn-bg [&_.n-data-table-th]:text-cn-text-secondary [&_.n-data-table-th]:font-600 [&_.n-data-table-th]:cn-text-sm [&_.n-data-table-tr:not(.n-data-table-tr--summary):hover_.n-data-table-td]:!bg-cn-hover',

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
