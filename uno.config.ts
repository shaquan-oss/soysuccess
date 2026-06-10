import { defineConfig, transformerDirectives, transformerVariantGroup, presetWind3 } from 'unocss';
import { presetChuneng, presetSoybeanAdmin } from '@sa/uno-preset';
import { themeVars } from './src/theme/vars';

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist']
    }
  },
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
    'card-wrapper': 'rd-6px shadow-sm'
  },
  safelist: [
    'cn-tag-running',
    'cn-tag-charging',
    'cn-tag-alarm',
    'cn-tag-offline',
    'cn-scrollbar',
    'rd-cn-sm',
    'rd-cn-md',
    'rd-cn-lg',
    'text-cn-xl',
    'text-cn-lg',
    'text-cn-md',
    'text-cn-base',
    'text-cn-sm',
    'icon-cn-menu',
    'icon-cn-sm',
    'icon-cn-xs',
    'border-cn-border',
    'bg-cn-hover',
    'bg-cn-bg',
    'text-cn-text-primary',
    'text-cn-text-secondary',
    'text-cn-text-hint'
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetWind3({ dark: 'class' }), presetSoybeanAdmin(), presetChuneng()]
});
