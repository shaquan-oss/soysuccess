import type { ECOption } from '@/hooks/common/echarts';
import { chunengDesignTokens } from './design-tokens';

const { color, chartPalette } = chunengDesignTokens;

/** 楚能工业风 ECharts 基础网格与坐标轴 */
export function createChunengChartBase() {
  return {
    textStyle: {
      fontFamily: 'inherit',
      color: color.textSecondary
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '16%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: '#FFFFFF',
      borderColor: color.border,
      borderWidth: 1,
      textStyle: { color: color.textPrimary, fontSize: 12 }
    },
    xAxis: {
      axisLine: { lineStyle: { color: color.border } },
      axisTick: { show: false },
      axisLabel: { color: color.textHint, fontSize: 12 }
    },
    yAxis: {
      splitLine: { lineStyle: { color: color.border, type: 'dashed' as const } },
      axisLabel: { color: color.textHint, fontSize: 12 }
    }
  };
}

/** 获取图表系列颜色 */
export function getChunengChartColor(index: number) {
  return chartPalette[index % chartPalette.length];
}

/** SOC 24h 折线图默认配置 */
export function createSocLineChartOption(): ECOption {
  const base = createChunengChartBase();
  const lineColor = chartPalette[0];
  return {
    ...base,
    legend: {
      data: ['SOC'],
      top: 0,
      textStyle: { color: color.textSecondary, fontSize: 12 }
    },
    xAxis: {
      ...base.xAxis,
      type: 'category',
      boundaryGap: false,
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
    },
    yAxis: {
      ...base.yAxis,
      type: 'value',
      max: 100,
      axisLabel: { ...base.yAxis.axisLabel, formatter: '{value}%' }
    },
    series: [
      {
        name: 'SOC',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        color: lineColor,
        lineStyle: { width: 2 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: `${lineColor}40` },
              { offset: 1, color: `${lineColor}05` }
            ]
          }
        },
        data: [72, 68, 75, 82, 87, 85, 78]
      }
    ]
  };
}

/** 产线产量柱状图 */
export function createProductionBarChartOption(): ECOption {
  const base = createChunengChartBase();
  return {
    ...base,
    legend: {
      data: ['产线 A', '产线 B', '产线 C'],
      top: 0,
      textStyle: { color: color.textSecondary, fontSize: 12 }
    },
    xAxis: {
      ...base.xAxis,
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: { ...base.yAxis, type: 'value' },
    series: [0, 1, 2].map(index => ({
      name: ['产线 A', '产线 B', '产线 C'][index],
      type: 'bar' as const,
      barMaxWidth: 24,
      color: getChunengChartColor(index + 1),
      data: [
        [8200, 9100, 8800, 9500, 10200, 7600, 6800],
        [7200, 8100, 7900, 8600, 9200, 7100, 6500],
        [6800, 7500, 7200, 8100, 8800, 6900, 6200]
      ][index]
    }))
  };
}

/** 设备在线率仪表盘 */
export function createOnlineGaugeOption(): ECOption {
  return {
    series: [
      {
        type: 'gauge',
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 100,
        splitNumber: 5,
        radius: '85%',
        axisLine: {
          lineStyle: {
            width: 12,
            color: [
              [0.6, color.error],
              [0.85, color.warning],
              [1, color.success]
            ]
          }
        },
        pointer: {
          itemStyle: { color: color.primary }
        },
        axisTick: { show: false },
        splitLine: { length: 8, lineStyle: { color: color.border } },
        axisLabel: { color: color.textHint, fontSize: 11, distance: 20 },
        detail: {
          fontSize: 24,
          fontWeight: 600,
          color: color.textPrimary,
          formatter: '{value}%'
        },
        title: {
          fontSize: 12,
          color: color.textSecondary,
          offsetCenter: [0, '70%']
        },
        data: [{ value: 96.4, name: '设备在线率' }]
      }
    ]
  };
}

/** 告警分布饼图 */
export function createAlarmPieChartOption(): ECOption {
  return {
    tooltip: { trigger: 'item' },
    legend: {
      bottom: 0,
      textStyle: { color: color.textSecondary, fontSize: 12 }
    },
    series: [
      {
        type: 'pie',
        radius: ['42%', '68%'],
        center: ['50%', '45%'],
        label: { color: color.textSecondary, fontSize: 12 },
        data: [
          { name: '温度告警', value: 12, itemStyle: { color: chartPalette[6] } },
          { name: '电压告警', value: 8, itemStyle: { color: chartPalette[4] } },
          { name: '通信异常', value: 5, itemStyle: { color: chartPalette[5] } },
          { name: '其他', value: 3, itemStyle: { color: chartPalette[3] } }
        ]
      }
    ]
  };
}
