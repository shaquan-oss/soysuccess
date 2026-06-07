import { defineConfig, transformerDirectives, transformerVariantGroup, presetWind3 } from 'unocss';
import { presetChuneng, presetSoybeanAdmin } from '@sa/uno-preset';
import { themeVars } from './src/theme/vars';

export default defineConfig({
  // 扫描文件
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist']
    }
  },
  // 主题token
  theme: {
    ...themeVars,
    fontSize: {
      'icon-xs': '0.875rem',
      'icon-small': '1rem',
      icon: '1.125rem',
      'icon-large': '1.5rem',
      'icon-xl': '2rem'
    }
  },
  shortcuts: {
    'card-wrapper': 'rd-8px shadow-sm'
  },
  safelist: [
    'cn-btn',
    'cn-btn-primary',
    'cn-btn-accent',
    'cn-btn-success',
    'cn-btn-ghost',
    'cn-btn-industrial',
    'cn-btn-danger',
    'cn-btn-warning',
    'cn-btn-text',
    'cn-tag',
    'cn-tag-running',
    'cn-tag-charging',
    'cn-tag-discharging',
    'cn-tag-alarm',
    'cn-tag-offline',
    'cn-tag-maintenance',
    'cn-tag-energy',
    'cn-card',
    'cn-card-highlight',
    'cn-card-metric',
    'cn-modal',
    'cn-alert',
    'cn-alert-info',
    'cn-alert-success',
    'cn-alert-warning',
    'cn-alert-error',
    'cn-alert-industrial',
    'cn-input',
    'cn-input-industrial',
    'cn-table',
    'cn-badge',
    'cn-page',
    'cn-page-header',
    'cn-page-title',
    'cn-page-desc',
    'cn-toolbar',
    'cn-section-title',
    'cn-stat-row',
    'cn-kv-grid',
    'cn-kv-label',
    'cn-kv-value',
    'cn-status-dot',
    'cn-status-dot-running',
    'cn-status-dot-alarm',
    'cn-status-dot-offline',
    'cn-chart-wrap',
    'cn-empty'
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetWind3({ dark: 'class' }), presetSoybeanAdmin(), presetChuneng()]
});
