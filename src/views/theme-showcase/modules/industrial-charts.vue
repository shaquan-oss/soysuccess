<script setup lang="ts">
import { useEcharts } from '@/hooks/common/echarts';
import {
  createAlarmPieChartOption,
  createOnlineGaugeOption,
  createProductionBarChartOption,
  createSocLineChartOption
} from '@/theme/echarts-chuneng';

defineOptions({
  name: 'IndustrialCharts'
});

const { domRef: socRef } = useEcharts(createSocLineChartOption);
const { domRef: barRef } = useEcharts(createProductionBarChartOption);
const { domRef: gaugeRef } = useEcharts(createOnlineGaugeOption);
const { domRef: pieRef } = useEcharts(createAlarmPieChartOption);
</script>

<template>
  <NGrid cols="1 m:2" :x-gap="16" :y-gap="16" responsive="screen">
    <NGi>
      <NCard title="SOC 24h 趋势" :bordered="false" class="card-wrapper" size="small">
        <div ref="socRef" class="h-280px" />
      </NCard>
    </NGi>
    <NGi>
      <NCard title="产线周产量" :bordered="false" class="card-wrapper" size="small">
        <div ref="barRef" class="h-280px" />
      </NCard>
    </NGi>
    <NGi>
      <NCard title="设备在线率" :bordered="false" class="card-wrapper" size="small">
        <div ref="gaugeRef" class="h-280px" />
      </NCard>
    </NGi>
    <NGi>
      <NCard title="告警类型分布" :bordered="false" class="card-wrapper" size="small">
        <div ref="pieRef" class="h-280px" />
      </NCard>
    </NGi>
  </NGrid>
</template>

<style scoped></style>
