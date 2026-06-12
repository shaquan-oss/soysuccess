<script setup lang="ts">
import { computed, h, ref } from 'vue';
import type { DataTableColumns, FormInst, FormRules } from 'naive-ui';
import { NTag } from 'naive-ui';
import { chunengDesignTokens } from '@/theme/design-tokens';

defineOptions({
  name: 'EmsBusinessShowcase'
});

type DeviceStatus = 'running' | 'charging' | 'discharging' | 'alarm' | 'offline' | 'maintenance';

interface StationDeviceRow {
  id: number;
  station: string;
  device: string;
  type: string;
  status: DeviceStatus;
  soc: number;
  power: number;
  temperature: number;
  updatedAt: string;
}

interface AlarmLogItem {
  id: number;
  level: 'critical' | 'warning' | 'info';
  device: string;
  message: string;
  time: string;
}

const statusTagMap: Record<DeviceStatus, { class: string; label: string }> = {
  running: { class: 'cn-tag-running', label: '运行中' },
  charging: { class: 'cn-tag-charging', label: '充电中' },
  discharging: {
    class: 'text-cn-sm font-600 !bg-warning/12 !border !border-warning/35 !text-warning',
    label: '放电中'
  },
  alarm: { class: 'cn-tag-alarm', label: '告警' },
  offline: { class: 'cn-tag-offline', label: '离线' },
  maintenance: {
    class: 'text-cn-sm font-600 !bg-info/10 !border !border-info/30 !text-info',
    label: '维护中'
  }
};

const stationFilter = ref<string | null>(null);
const statusFilter = ref<string | null>(null);
const keyword = ref('');
const page = ref(1);
const pageSize = ref(10);

const stationOptions = [
  { label: '湖北基地 1 号储能站', value: 'hb-01' },
  { label: '江苏基地 2 号储能站', value: 'js-02' },
  { label: '广东基地 3 号储能站', value: 'gd-03' }
];

const statusOptions = [
  { label: '运行中', value: 'running' },
  { label: '充电中', value: 'charging' },
  { label: '告警', value: 'alarm' },
  { label: '离线', value: 'offline' }
];

const allDevices: StationDeviceRow[] = [
  {
    id: 1,
    station: 'hb-01',
    device: 'BMS-001',
    type: 'BMS',
    status: 'running',
    soc: 87,
    power: 1250,
    temperature: 32.5,
    updatedAt: '10:32:05'
  },
  {
    id: 2,
    station: 'hb-01',
    device: 'PCS-001',
    type: 'PCS',
    status: 'charging',
    soc: 62,
    power: 980,
    temperature: 41.2,
    updatedAt: '10:31:58'
  },
  {
    id: 3,
    station: 'hb-01',
    device: 'BMS-003',
    type: 'BMS',
    status: 'alarm',
    soc: 12,
    power: 0,
    temperature: 48.6,
    updatedAt: '10:31:42'
  },
  {
    id: 4,
    station: 'js-02',
    device: 'BMS-012',
    type: 'BMS',
    status: 'discharging',
    soc: 54,
    power: -860,
    temperature: 36.8,
    updatedAt: '10:30:11'
  },
  {
    id: 5,
    station: 'js-02',
    device: 'PCS-004',
    type: 'PCS',
    status: 'maintenance',
    soc: 0,
    power: 0,
    temperature: 0,
    updatedAt: '09:15:00'
  },
  {
    id: 6,
    station: 'gd-03',
    device: 'BMS-021',
    type: 'BMS',
    status: 'offline',
    soc: 0,
    power: 0,
    temperature: 0,
    updatedAt: '08:02:33'
  },
  {
    id: 7,
    station: 'gd-03',
    device: 'EMS-GW-01',
    type: 'EMS',
    status: 'running',
    soc: 78,
    power: 420,
    temperature: 29.1,
    updatedAt: '10:32:01'
  },
  {
    id: 8,
    station: 'hb-01',
    device: 'BMS-008',
    type: 'BMS',
    status: 'running',
    soc: 91,
    power: 1100,
    temperature: 31.4,
    updatedAt: '10:31:55'
  }
];

const filteredDevices = computed(() => {
  return allDevices.filter(item => {
    const matchStation = !stationFilter.value || item.station === stationFilter.value;
    const matchStatus = !statusFilter.value || item.status === statusFilter.value;
    const matchKeyword =
      !keyword.value ||
      item.device.toLowerCase().includes(keyword.value.toLowerCase()) ||
      item.type.toLowerCase().includes(keyword.value.toLowerCase());
    return matchStation && matchStatus && matchKeyword;
  });
});

const pagedDevices = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return filteredDevices.value.slice(start, start + pageSize.value);
});

const deviceColumns: DataTableColumns<StationDeviceRow> = [
  { title: '设备编号', key: 'device', width: 110, fixed: 'left' },
  { title: '类型', key: 'type', width: 72 },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render: row =>
      h(
        NTag,
        { bordered: false, size: 'small', class: statusTagMap[row.status].class },
        () => statusTagMap[row.status].label
      )
  },
  {
    title: 'SOC',
    key: 'soc',
    width: 80,
    render: row => (row.soc ? `${row.soc}%` : '-')
  },
  {
    title: '功率 (kW)',
    key: 'power',
    width: 100,
    render: row => (row.power ? row.power.toLocaleString() : '-')
  },
  {
    title: '温度 (℃)',
    key: 'temperature',
    width: 96,
    render: row => (row.temperature ? row.temperature.toFixed(1) : '-')
  },
  { title: '更新时间', key: 'updatedAt', width: 100 },
  {
    title: '操作',
    key: 'actions',
    width: 140,
    fixed: 'right',
    render: () =>
      h('div', { class: 'flex gap-8px' }, [
        h('span', { class: 'text-cn-blue-100 cursor-pointer text-cn-sm' }, '详情'),
        h('span', { class: 'text-cn-info cursor-pointer text-cn-sm' }, '遥控')
      ])
  }
];

const alarmLogs: AlarmLogItem[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  level: i % 7 === 0 ? 'critical' : i % 3 === 0 ? 'warning' : 'info',
  device: `BMS-${String((i % 12) + 1).padStart(3, '0')}`,
  message: i % 7 === 0 ? '电芯温度超阈值 50℃' : i % 3 === 0 ? 'SOC 低于 15% 预警' : '通信心跳恢复',
  time: `2026-06-07 10:${String(31 - (i % 20)).padStart(2, '0')}:${String(59 - (i % 50)).padStart(2, '0')}`
}));

const alarmLevelTag: Record<AlarmLogItem['level'], { class: string; label: string }> = {
  critical: { class: 'cn-tag-alarm', label: '严重' },
  warning: {
    class: 'text-cn-sm font-600 !bg-warning/12 !border !border-warning/35 !text-warning',
    label: '预警'
  },
  info: {
    class: 'text-cn-sm font-600 !bg-info/10 !border !border-info/30 !text-info',
    label: '提示'
  }
};

const formRef = ref<FormInst | null>(null);
const ticketForm = ref({
  title: 'BMS-003 过温告警处置',
  station: 'hb-01',
  level: 'critical',
  handler: '',
  plan: '',
  remark: ''
});

const ticketRules: FormRules = {
  handler: { required: true, message: '请输入处置人', trigger: 'blur' },
  plan: { required: true, message: '请输入处置方案', trigger: 'blur' }
};

const pcsForm = ref({
  ratedPower: 2500,
  maxCharge: 1250,
  maxDischarge: 1250,
  gridMode: '并网',
  autoDispatch: true,
  remark: ''
});

const colorAudit = [
  { scene: '主要按钮', token: 'primary', hex: chunengDesignTokens.color.primary, shortcut: 'type="primary"' },
  {
    scene: '能源强调 / 成功',
    token: 'success',
    hex: chunengDesignTokens.color.success,
    shortcut: 'type="success" / cn-tag-running'
  },
  {
    scene: '警告',
    token: 'warning',
    hex: chunengDesignTokens.color.warning,
    shortcut: 'type="warning" / !bg-warning/12 !text-warning'
  },
  { scene: '危险', token: 'error', hex: chunengDesignTokens.color.error, shortcut: 'type="error" / cn-tag-alarm' },
  {
    scene: '信息 / 维护',
    token: 'info',
    hex: chunengDesignTokens.color.info,
    shortcut: 'text-cn-sm font-600 !bg-info/10 !text-info'
  },
  { scene: '能源正常', token: 'green-100', hex: '#04CE19', shortcut: '!bg-cn-green-100/12 !text-cn-green-aux' }
];

function handleSearch() {
  page.value = 1;
}

function handleResetFilters() {
  stationFilter.value = null;
  statusFilter.value = null;
  keyword.value = '';
  page.value = 1;
}

function handleSubmitTicket() {
  formRef.value?.validate();
}
</script>

<template>
  <NSpace vertical :size="16">
    <NCard :bordered="false" class="card-wrapper">
      <div class="grid grid-cols-2 s:grid-cols-3 l:grid-cols-6 gap-12px">
        <div v-for="item in colorAudit" :key="item.hex" class="rd-cn-md bg-cn-bg border border-cn-border p-12px">
          <div class="size-28px rd-4px mb-8px border border-cn-border" :style="{ backgroundColor: item.hex }" />
          <div class="text-cn-sm font-mono">{{ item.hex }}</div>
        </div>
      </div>
    </NCard>

    <NCard :bordered="false" class="card-wrapper">
      <div class="flex flex-wrap items-center gap-12px p-12px rd-cn-md bg-container border border-cn-border mb-12px">
        <NInput v-model:value="keyword" class="w-180px" placeholder="设备编号 / 类型" size="small" clearable />
        <NSelect
          v-model:value="stationFilter"
          class="w-200px"
          :options="stationOptions"
          placeholder="储能站"
          size="small"
          clearable
        />
        <NSelect
          v-model:value="statusFilter"
          class="w-140px"
          :options="statusOptions"
          placeholder="运行状态"
          size="small"
          clearable
        />
        <div class="flex-1" />
        <NButton type="default" size="small" @click="handleResetFilters">重置</NButton>
        <NButton type="primary" size="small" @click="handleSearch">查询</NButton>
        <NButton type="success" size="small">导出</NButton>
      </div>

      <div>
        <NDataTable
          :columns="deviceColumns"
          :data="pagedDevices"
          :bordered="false"
          size="small"
          :scroll-x="860"
          :row-key="row => row.id"
        />
      </div>
      <div class="flex justify-end mt-12px">
        <NPagination
          v-model:page="page"
          v-model:page-size="pageSize"
          :item-count="filteredDevices.length"
          :page-sizes="[10, 20, 50]"
          show-size-picker
          size="small"
        />
      </div>
    </NCard>

    <NGrid cols="1 l:2" :x-gap="16" :y-gap="16" responsive="screen">
      <NGi>
        <NCard :bordered="false" class="card-wrapper">
          <NForm ref="formRef" :model="ticketForm" :rules="ticketRules" label-placement="top" size="small">
            <NGrid cols="2" :x-gap="16" :y-gap="0">
              <NFormItemGi span="2" label="工单标题">
                <NInput v-model:value="ticketForm.title" />
              </NFormItemGi>
              <NFormItemGi label="所属储能站">
                <NSelect v-model:value="ticketForm.station" :options="stationOptions" />
              </NFormItemGi>
              <NFormItemGi label="告警等级">
                <NSelect
                  v-model:value="ticketForm.level"
                  :options="[
                    { label: '严重', value: 'critical' },
                    { label: '预警', value: 'warning' },
                    { label: '提示', value: 'info' }
                  ]"
                />
              </NFormItemGi>
              <NFormItemGi span="2" label="处置人" path="handler">
                <NInput v-model:value="ticketForm.handler" placeholder="请输入处置人姓名" />
              </NFormItemGi>
              <NFormItemGi span="2" label="处置方案" path="plan">
                <NInput
                  v-model:value="ticketForm.plan"
                  type="textarea"
                  placeholder="如：远程降功率 → 现场巡检 → 复测确认"
                  :rows="3"
                />
              </NFormItemGi>
              <NFormItemGi span="2" label="备注">
                <NInput
                  v-model:value="ticketForm.remark"
                  class="[&_.n-input]:bg-cn-bg [&_.n-input]:font-mono"
                  placeholder="可选"
                />
              </NFormItemGi>
            </NGrid>
            <div class="flex justify-end gap-8px mt-8px">
              <NButton type="default" size="small">暂存</NButton>
              <NButton type="error" size="small">驳回</NButton>
              <NButton type="primary" size="small" @click="handleSubmitTicket">提交闭环</NButton>
            </div>
          </NForm>
        </NCard>
      </NGi>

      <NGi>
        <NCard :bordered="false" class="card-wrapper">
          <NForm :model="pcsForm" label-placement="left" label-width="120" size="small">
            <NFormItem label="额定功率 (kW)">
              <NInputNumber v-model:value="pcsForm.ratedPower" class="w-full" :min="0" :step="100" />
            </NFormItem>
            <NFormItem label="最大充电 (kW)">
              <NInputNumber v-model:value="pcsForm.maxCharge" class="w-full" :min="0" :step="50" />
            </NFormItem>
            <NFormItem label="最大放电 (kW)">
              <NInputNumber v-model:value="pcsForm.maxDischarge" class="w-full" :min="0" :step="50" />
            </NFormItem>
            <NFormItem label="并网模式">
              <NSelect
                v-model:value="pcsForm.gridMode"
                :options="[
                  { label: '并网', value: '并网' },
                  { label: '离网', value: '离网' },
                  { label: '并离网切换', value: '并离网切换' }
                ]"
              />
            </NFormItem>
            <NFormItem label="自动调度">
              <NSwitch v-model:value="pcsForm.autoDispatch" />
            </NFormItem>
            <NFormItem label="策略备注">
              <NInput v-model:value="pcsForm.remark" type="textarea" :rows="2" />
            </NFormItem>
          </NForm>
          <div class="flex justify-end gap-8px">
            <NButton type="default" size="small">取消</NButton>
            <NButton type="warning" size="small">试下发</NButton>
            <NButton type="success" size="small">确认下发</NButton>
          </div>
        </NCard>
      </NGi>
    </NGrid>

    <NCard :bordered="false" class="card-wrapper">
      <div class="rd-cn-md bg-cn-bg border border-cn-border cn-scrollbar h-280px">
        <div
          v-for="item in alarmLogs"
          :key="item.id"
          class="flex items-start gap-12px py-10px px-8px border-b border-cn-border last:border-b-0 hover:bg-cn-hover rd-4px"
        >
          <NTag size="small" :bordered="false" :class="alarmLevelTag[item.level].class">
            {{ alarmLevelTag[item.level].label }}
          </NTag>
          <div class="flex-1 min-w-0">
            <div class="text-cn-base text-cn-text-primary font-mono">{{ item.device }}</div>
            <div class="text-cn-sm text-cn-text-hint mt-2px">{{ item.message }}</div>
          </div>
          <span class="text-cn-sm font-mono shrink-0">{{ item.time }}</span>
        </div>
      </div>
    </NCard>
  </NSpace>
</template>
