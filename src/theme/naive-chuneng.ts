import type { GlobalThemeOverrides } from 'naive-ui';

/** 楚能能源 · 默认 Naive UI 组件主题覆盖（工业风格） */
export const chunengNaiveOverrides: GlobalThemeOverrides = {
  common: {
    borderRadius: '6px',
    borderRadiusSmall: '4px',
    fontWeightStrong: '600',
    lineHeight: '1.5'
  },
  Button: {
    borderRadiusMedium: '6px',
    borderRadiusSmall: '4px',
    borderRadiusLarge: '8px',
    fontWeightStrong: '600',
    heightMedium: '36px',
    heightSmall: '32px',
    heightLarge: '40px',
    paddingMedium: '0 18px',
    paddingSmall: '0 14px'
  },
  Tag: {
    borderRadius: '4px',
    heightMedium: '26px',
    fontWeightStrong: '600'
  },
  Card: {
    borderRadius: '8px',
    paddingMedium: '20px',
    titleFontWeight: '600'
  },
  Dialog: {
    borderRadius: '8px',
    padding: '20px 24px',
    titleFontSize: '16px',
    titleFontWeight: '600'
  },
  Modal: {
    borderRadius: '8px'
  },
  Input: {
    borderRadius: '6px',
    heightMedium: '36px',
    heightSmall: '32px'
  },
  Select: {
    borderRadius: '6px',
    peers: {
      InternalSelection: {
        borderRadius: '6px',
        heightMedium: '36px'
      }
    }
  },
  Alert: {
    borderRadius: '6px',
    padding: '12px 16px',
    titleFontWeight: '600'
  },
  Badge: {
    borderRadius: '4px'
  },
  Tabs: {
    tabBorderRadius: '6px',
    tabFontWeightActive: '600'
  },
  DataTable: {
    borderRadius: '8px',
    thFontWeight: '600',
    thPaddingMedium: '12px 16px',
    tdPaddingMedium: '12px 16px'
  },
  Progress: {
    railRadius: '4px',
    fillRadius: '4px'
  },
  Switch: {
    railBorderRadiusSmall: '12px'
  },
  Message: {
    borderRadius: '6px'
  },
  Notification: {
    borderRadius: '8px'
  }
};
