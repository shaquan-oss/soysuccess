export type EmsEmptyType = 'default' | 'no-data' | 'no-device' | 'no-alarm' | 'filter-empty' | 'offline';

export interface EmsEmptyPreset {
  description: string;
}

export const EMS_EMPTY_PRESETS: Record<EmsEmptyType, EmsEmptyPreset> = {
  default: { description: '暂无数据' },
  'no-data': { description: '暂无数据' },
  'no-device': { description: '暂无设备，请先接入或同步站点数据' },
  'no-alarm': { description: '当前无告警记录' },
  'filter-empty': { description: '未找到符合条件的数据，请调整筛选条件' },
  offline: { description: '站点通信中断，请检查网络或稍后重试' }
};

export function getEmsEmptyDescription(type: EmsEmptyType, custom?: string) {
  return custom || EMS_EMPTY_PRESETS[type].description;
}
