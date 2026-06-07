<script setup lang="ts">
import { h, ref } from 'vue';
import type { DataTableColumns } from 'naive-ui';
import { NTag } from 'naive-ui';
import { chunengBlueScale, chunengGreenScale } from '@sa/uno-preset';
import { useThemeStore } from '@/store/modules/theme';
import { $t } from '@/locales';

defineOptions({
  name: 'ThemeShowcase'
});

const themeStore = useThemeStore();

const showModal = ref(false);
const showDialog = ref(false);
const inputValue = ref('');
const selectValue = ref<string | null>(null);
const activeTab = ref('colors');

const selectOptions = [
  { label: '产线 A · 电芯组装', value: 'line-a' },
  { label: '产线 B · 化成分容', value: 'line-b' },
  { label: '产线 C · PACK 集成', value: 'line-c' }
];

interface DeviceRow {
  id: number;
  name: string;
  status: 'running' | 'charging' | 'alarm' | 'offline';
  soc: number;
  temperature: number;
}

const statusTagMap: Record<DeviceRow['status'], { class: string; label: string }> = {
  running: { class: 'cn-tag cn-tag-running', label: '运行中' },
  charging: { class: 'cn-tag cn-tag-charging', label: '充电中' },
  alarm: { class: 'cn-tag cn-tag-alarm', label: '告警' },
  offline: { class: 'cn-tag cn-tag-offline', label: '离线' }
};

const tableData: DeviceRow[] = [
  { id: 1, name: 'BMS-001', status: 'running', soc: 87, temperature: 32.5 },
  { id: 2, name: 'BMS-002', status: 'charging', soc: 45, temperature: 28.1 },
  { id: 3, name: 'BMS-003', status: 'alarm', soc: 12, temperature: 48.6 },
  { id: 4, name: 'BMS-004', status: 'offline', soc: 0, temperature: 0 },
  { id: 5, name: 'PCS-001', status: 'running', soc: 92, temperature: 35.2 }
];

const columns: DataTableColumns<DeviceRow> = [
  { title: '设备编号', key: 'name', width: 120 },
  {
    title: '状态',
    key: 'status',
    width: 120,
    render: row =>
      h(
        NTag,
        { bordered: false, size: 'small', class: statusTagMap[row.status].class },
        () => statusTagMap[row.status].label
      )
  },
  {
    title: 'SOC (%)',
    key: 'soc',
    width: 100,
    render: row => `${row.soc}%`
  },
  {
    title: '温度 (℃)',
    key: 'temperature',
    width: 100,
    render: row => (row.temperature ? `${row.temperature}` : '-')
  }
];

const blueScale = chunengBlueScale;
const greenScale = chunengGreenScale;

const semanticColors = [
  { name: 'primary', label: '主色 Primary', color: themeStore.themeColor },
  { name: 'info', label: '信息 Info', color: themeStore.otherColor.info },
  { name: 'success', label: '成功 Success', color: themeStore.otherColor.success },
  { name: 'warning', label: '警告 Warning', color: themeStore.otherColor.warning },
  { name: 'error', label: '错误 Error', color: themeStore.otherColor.error }
];

const auxColors = [
  { label: '深蓝辅助', hex: '#015286' },
  { label: '青绿辅助', hex: '#027b62' },
  { label: '标准绿辅助', hex: '#03a53d' }
];

/** KPI 指标（cn-stat-row 示例） */
const statMetrics = [
  { label: '今日产量', value: '12,580', unit: 'PCS', trend: '+8.2%' },
  { label: '设备在线率', value: '96.4', unit: '%', trend: '+0.3%' },
  { label: '告警数', value: '3', unit: '条', trend: '-2' },
  { label: '平均 SOC', value: '78.6', unit: '%', trend: '稳定' }
];

/** 设备参数（cn-kv-grid 示例） */
const deviceParams = [
  { label: 'SOC', value: '87.2%' },
  { label: 'SOH', value: '98.1%' },
  { label: '电压', value: '3.65 V' },
  { label: '电流', value: '12.3 A' },
  { label: '温度', value: '32.5 ℃' },
  { label: '循环次数', value: '1,024' }
];

const statusDotExamples = [
  { class: 'cn-status-dot cn-status-dot-running', label: '运行中', desc: 'cn-status-dot-running' },
  { class: 'cn-status-dot cn-status-dot-alarm', label: '告警', desc: 'cn-status-dot-alarm' },
  { class: 'cn-status-dot cn-status-dot-offline', label: '离线', desc: 'cn-status-dot-offline' }
];

const showEmptyDemo = ref(false);
</script>

<template>
  <NSpace vertical :size="16">
    <!-- 页头 -->
    <NCard :bordered="false" class="cn-card cn-card-highlight card-wrapper">
      <div class="flex items-center justify-between flex-wrap gap-12px">
        <div>
          <h2 class="text-20px font-600 text-primary m-0 mb-4px">{{ $t('page.themeShowcase.title') }}</h2>
          <p class="text-13px text-gray-500 m-0">{{ $t('page.themeShowcase.subtitle') }}</p>
        </div>
        <NSpace>
          <NTag class="cn-tag cn-tag-energy" :bordered="false">Cornex 楚能</NTag>
          <NTag class="cn-tag cn-tag-maintenance" :bordered="false">工业风格 v1.0</NTag>
        </NSpace>
      </div>
    </NCard>

    <NTabs v-model:value="activeTab" type="line" animated>
      <!-- 配色 -->
      <NTabPane name="colors" :tab="$t('page.themeShowcase.tabs.colors')">
        <NSpace vertical :size="16">
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.semanticColors') }}</div>
            <NGrid cols="2 s:3 m:5" :x-gap="12" :y-gap="12" responsive="screen">
              <NGi v-for="item in semanticColors" :key="item.name">
                <div class="flex flex-col items-center gap-6px">
                  <div
                    class="w-full h-48px rd-6px border border-black/6 transition-transform hover:scale-y-105"
                    :style="{ backgroundColor: item.color }"
                  />
                  <span class="text-11px text-gray-500 font-mono">{{ item.label }}</span>
                  <span class="text-10px text-gray-300 font-mono">{{ item.color }}</span>
                </div>
              </NGi>
            </NGrid>
          </NCard>

          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.blueScale') }}</div>
            <NGrid cols="5 s:10" :x-gap="8" :y-gap="8" responsive="screen">
              <NGi v-for="item in blueScale" :key="item.label">
                <div class="flex flex-col items-center gap-6px">
                  <div
                    class="w-full h-48px rd-6px border border-black/6 transition-transform hover:scale-y-105"
                    :style="{ backgroundColor: item.hex }"
                  />
                  <span class="text-11px text-gray-500 font-mono">{{ item.label }}</span>
                  <span class="text-10px text-gray-300 font-mono">{{ item.hex }}</span>
                </div>
              </NGi>
            </NGrid>
          </NCard>

          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.greenScale') }}</div>
            <NGrid cols="5 s:10" :x-gap="8" :y-gap="8" responsive="screen">
              <NGi v-for="item in greenScale" :key="item.label">
                <div class="flex flex-col items-center gap-6px">
                  <div
                    class="w-full h-48px rd-6px border border-black/6 transition-transform hover:scale-y-105"
                    :style="{ backgroundColor: item.hex }"
                  />
                  <span class="text-11px text-gray-500 font-mono">{{ item.label }}</span>
                  <span class="text-10px text-gray-300 font-mono">{{ item.hex }}</span>
                </div>
              </NGi>
            </NGrid>
          </NCard>

          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.auxColors') }}</div>
            <NGrid cols="3" :x-gap="12" responsive="screen">
              <NGi v-for="item in auxColors" :key="item.hex">
                <div class="flex flex-col items-center gap-6px">
                  <div
                    class="w-full h-48px rd-6px border border-black/6 transition-transform hover:scale-y-105"
                    :style="{ backgroundColor: item.hex }"
                  />
                  <span class="text-11px text-gray-500 font-mono">{{ item.label }}</span>
                  <span class="text-10px text-gray-300 font-mono">{{ item.hex }}</span>
                </div>
              </NGi>
            </NGrid>
          </NCard>
        </NSpace>
      </NTabPane>

      <!-- 按钮 -->
      <NTabPane name="buttons" :tab="$t('page.themeShowcase.tabs.buttons')">
        <NCard :bordered="false" class="cn-card card-wrapper">
          <div class="cn-section-title mb-12px">{{ $t('page.themeShowcase.buttonVariants') }}</div>
          <p class="text-12px text-gray-400 mb-16px">{{ $t('page.themeShowcase.buttonHint') }}</p>

          <NSpace vertical :size="20">
            <div>
              <div class="text-13px text-gray-500 mb-8px">主要操作</div>
              <div class="flex flex-wrap items-center gap-12px">
                <NButton class="cn-btn cn-btn-primary" type="primary">主要按钮</NButton>
                <NButton class="cn-btn cn-btn-accent" type="primary">能源强调</NButton>
                <NButton class="cn-btn cn-btn-success" type="success">成功操作</NButton>
                <NButton class="cn-btn cn-btn-danger" type="error">危险操作</NButton>
                <NButton class="cn-btn cn-btn-warning" type="warning">警告操作</NButton>
              </div>
              <div
                class="p-8px px-12px rd-4px bg-primary/4 border border-primary/20 border-dashed font-mono text-12px text-cn-blue-80 break-all mt-8px"
              >
                &lt;NButton class="cn-btn cn-btn-primary" type="primary"&gt;
              </div>
            </div>

            <div>
              <div class="text-13px text-gray-500 mb-8px">次要 / 工业风格</div>
              <div class="flex flex-wrap items-center gap-12px">
                <NButton class="cn-btn cn-btn-ghost">幽灵按钮</NButton>
                <NButton class="cn-btn cn-btn-industrial">INDUSTRIAL-01</NButton>
                <NButton class="cn-btn cn-btn-text" text>文字按钮</NButton>
                <NButton class="cn-btn cn-btn-primary" type="primary" disabled>禁用状态</NButton>
                <NButton class="cn-btn cn-btn-primary" type="primary" loading>加载中</NButton>
              </div>
            </div>

            <div>
              <div class="text-13px text-gray-500 mb-8px">尺寸</div>
              <div class="flex flex-wrap items-center gap-12px">
                <NButton class="cn-btn cn-btn-primary" type="primary" size="small">Small</NButton>
                <NButton class="cn-btn cn-btn-primary" type="primary" size="medium">Medium</NButton>
                <NButton class="cn-btn cn-btn-primary" type="primary" size="large">Large</NButton>
              </div>
            </div>
          </NSpace>
        </NCard>
      </NTabPane>

      <!-- 标签 -->
      <NTabPane name="tags" :tab="$t('page.themeShowcase.tabs.tags')">
        <NCard :bordered="false" class="cn-card card-wrapper">
          <div class="cn-section-title mb-12px">{{ $t('page.themeShowcase.deviceStatusTags') }}</div>
          <p class="text-12px text-gray-400 mb-16px">{{ $t('page.themeShowcase.tagHint') }}</p>
          <div class="flex flex-wrap items-center gap-12px">
            <NTag class="cn-tag cn-tag-running" :bordered="false">运行中</NTag>
            <NTag class="cn-tag cn-tag-charging" :bordered="false">充电中</NTag>
            <NTag class="cn-tag cn-tag-discharging" :bordered="false">放电中</NTag>
            <NTag class="cn-tag cn-tag-alarm" :bordered="false">告警</NTag>
            <NTag class="cn-tag cn-tag-offline" :bordered="false">离线</NTag>
            <NTag class="cn-tag cn-tag-maintenance" :bordered="false">维护中</NTag>
            <NTag class="cn-tag cn-tag-energy" :bordered="false">能源正常</NTag>
          </div>
          <div
            class="p-8px px-12px rd-4px bg-primary/4 border border-primary/20 border-dashed font-mono text-12px text-cn-blue-80 break-all mt-12px"
          >
            &lt;NTag class="cn-tag cn-tag-running" :bordered="false"&gt;运行中&lt;/NTag&gt;
          </div>
        </NCard>
      </NTabPane>

      <!-- 表单 & 反馈 -->
      <NTabPane name="feedback" :tab="$t('page.themeShowcase.tabs.feedback')">
        <NSpace vertical :size="16">
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.alerts') }}</div>
            <NSpace vertical :size="12">
              <NAlert class="cn-alert cn-alert-info" type="info" title="系统通知">
                产线 A 今日计划产量 12,000 电芯，当前完成 68%。
              </NAlert>
              <NAlert class="cn-alert cn-alert-success" type="success" title="运行正常">
                BMS-001 电池包 SOC 87%，温度 32.5℃，状态良好。
              </NAlert>
              <NAlert class="cn-alert cn-alert-warning" type="warning" title="温度预警">
                BMS-003 电芯温度 48.6℃，接近告警阈值 50℃。
              </NAlert>
              <NAlert class="cn-alert cn-alert-error" type="error" title="严重告警">
                PCS-002 过流保护触发，请立即检查！
              </NAlert>
              <NAlert class="cn-alert cn-alert-industrial" type="info" title="[SYS] 工业日志">
                [2026-06-07 10:00:00] LINE-B CELL-0892 FORMATION COMPLETE
              </NAlert>
            </NSpace>
          </NCard>

          <NGrid cols="1 m:2" :x-gap="16" :y-gap="16" responsive="screen">
            <NGi>
              <NCard :bordered="false" class="cn-card card-wrapper">
                <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.inputs') }}</div>
                <NSpace vertical :size="12">
                  <NInput v-model:value="inputValue" class="cn-input" placeholder="标准输入框" />
                  <NInput
                    v-model:value="inputValue"
                    class="cn-input cn-input-industrial"
                    placeholder="工业风格输入框"
                  />
                  <NSelect
                    v-model:value="selectValue"
                    class="cn-input"
                    :options="selectOptions"
                    placeholder="选择产线"
                  />
                </NSpace>
              </NCard>
            </NGi>
            <NGi>
              <NCard :bordered="false" class="cn-card card-wrapper">
                <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.progress') }}</div>
                <NSpace vertical :size="16">
                  <div>
                    <div class="text-12px text-gray-500 mb-4px">SOC 87%</div>
                    <NProgress type="line" :percentage="87" indicator-placement="inside" processing />
                  </div>
                  <div>
                    <div class="text-12px text-gray-500 mb-4px">产能完成 68%</div>
                    <NProgress type="line" :percentage="68" status="success" />
                  </div>
                  <div>
                    <div class="text-12px text-gray-500 mb-4px">告警指数</div>
                    <NProgress type="line" :percentage="35" status="warning" />
                  </div>
                  <NSpace>
                    <NBadge :value="3" class="cn-badge">
                      <NButton class="cn-btn cn-btn-ghost" size="small">告警消息</NButton>
                    </NBadge>
                    <NSwitch :default-value="true" />
                  </NSpace>
                </NSpace>
              </NCard>
            </NGi>
          </NGrid>
        </NSpace>
      </NTabPane>

      <!-- 卡片 & 弹窗 & 表格 -->
      <NTabPane name="layout" :tab="$t('page.themeShowcase.tabs.layout')">
        <NSpace vertical :size="16">
          <NGrid cols="1 s:3" :x-gap="16" :y-gap="16" responsive="screen">
            <NGi>
              <NCard title="标准卡片" class="cn-card card-wrapper" :bordered="false">
                <p class="text-13px text-gray-500 m-0">class="cn-card"</p>
              </NCard>
            </NGi>
            <NGi>
              <NCard title="高亮卡片" class="cn-card cn-card-highlight card-wrapper" :bordered="false">
                <p class="text-13px text-gray-500 m-0">class="cn-card cn-card-highlight"</p>
              </NCard>
            </NGi>
            <NGi>
              <NCard title="指标卡片" class="cn-card cn-card-metric card-wrapper" :bordered="false">
                <div class="text-24px font-600 text-primary">12,580</div>
                <div class="text-12px text-gray-400">今日产量 (PCS)</div>
              </NCard>
            </NGi>
          </NGrid>

          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.modal') }}</div>
            <div class="flex flex-wrap items-center gap-12px">
              <NButton class="cn-btn cn-btn-primary" type="primary" @click="showModal = true">打开 Modal</NButton>
              <NButton class="cn-btn cn-btn-ghost" @click="showDialog = true">打开 Dialog</NButton>
            </div>
          </NCard>

          <NCard :bordered="false" class="cn-card card-wrapper cn-table">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.table') }}</div>
            <NDataTable :columns="columns" :data="tableData" :bordered="false" size="small" />
            <div
              class="p-8px px-12px rd-4px bg-primary/4 border border-primary/20 border-dashed font-mono text-12px text-cn-blue-80 break-all mt-12px"
            >
              外层容器添加 class="cn-table"
            </div>
          </NCard>
        </NSpace>
      </NTabPane>

      <!-- 页面布局 shortcuts（非 Naive 组件） -->
      <NTabPane name="pageLayout" :tab="$t('page.themeShowcase.tabs.pageLayout')">
        <NSpace vertical :size="16">
          <!-- cn-page-header -->
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.pageHeader') }}</div>
            <p class="text-12px text-gray-400 mb-12px">{{ $t('page.themeShowcase.pageLayout.pageHeaderHint') }}</p>
            <div class="cn-page-header p-12px rd-8px bg-primary/2 border border-primary/10">
              <div>
                <h2 class="cn-page-title">储能站总览</h2>
                <p class="cn-page-desc">湖北基地 · 1 号储能柜 · 最后更新 10:32:05</p>
              </div>
              <NSpace>
                <NButton class="cn-btn cn-btn-ghost" size="small">刷新</NButton>
                <NButton class="cn-btn cn-btn-primary" type="primary" size="small">导出报表</NButton>
              </NSpace>
            </div>
            <div
              class="p-8px px-12px rd-4px bg-primary/4 border border-primary/20 border-dashed font-mono text-12px text-cn-blue-80 break-all mt-12px"
            >
              &lt;div class="cn-page-header"&gt;
              <br />
              &nbsp;&nbsp;&lt;h2 class="cn-page-title"&gt;...&lt;/h2&gt;
              <br />
              &nbsp;&nbsp;&lt;p class="cn-page-desc"&gt;...&lt;/p&gt;
              <br />
              &lt;/div&gt;
            </div>
          </NCard>

          <!-- cn-toolbar -->
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.toolbar') }}</div>
            <p class="text-12px text-gray-400 mb-12px">{{ $t('page.themeShowcase.pageLayout.toolbarHint') }}</p>
            <div class="cn-toolbar">
              <NInput class="cn-input w-200px" placeholder="设备编号 / 名称" size="small" />
              <NSelect class="cn-input w-160px" :options="selectOptions" placeholder="产线" size="small" />
              <NSelect
                class="cn-input w-140px"
                :options="[
                  { label: '运行中', value: 'running' },
                  { label: '告警', value: 'alarm' }
                ]"
                placeholder="状态"
                size="small"
              />
              <div class="flex-1" />
              <NButton class="cn-btn cn-btn-ghost" size="small">重置</NButton>
              <NButton class="cn-btn cn-btn-primary" type="primary" size="small">查询</NButton>
            </div>
            <div
              class="p-8px px-12px rd-4px bg-primary/4 border border-primary/20 border-dashed font-mono text-12px text-cn-blue-80 break-all mt-12px"
            >
              &lt;div class="cn-toolbar"&gt;...筛选控件...&lt;/div&gt;
            </div>
          </NCard>

          <!-- cn-stat-row -->
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.statRow') }}</div>
            <p class="text-12px text-gray-400 mb-12px">{{ $t('page.themeShowcase.pageLayout.statRowHint') }}</p>
            <div class="cn-stat-row">
              <NCard
                v-for="item in statMetrics"
                :key="item.label"
                class="cn-card cn-card-metric card-wrapper"
                :bordered="false"
                size="small"
              >
                <div class="text-12px text-gray-500 mb-4px">{{ item.label }}</div>
                <div class="flex items-baseline gap-4px">
                  <span class="text-24px font-600 text-primary font-mono">{{ item.value }}</span>
                  <span class="text-12px text-gray-400">{{ item.unit }}</span>
                </div>
                <div class="text-11px text-cn-green-aux mt-4px">{{ item.trend }}</div>
              </NCard>
            </div>
            <div
              class="p-8px px-12px rd-4px bg-primary/4 border border-primary/20 border-dashed font-mono text-12px text-cn-blue-80 break-all mt-12px"
            >
              &lt;div class="cn-stat-row"&gt; + cn-card cn-card-metric&lt;/div&gt;
            </div>
          </NCard>

          <!-- cn-kv-grid -->
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.kvGrid') }}</div>
            <p class="text-12px text-gray-400 mb-12px">{{ $t('page.themeShowcase.pageLayout.kvGridHint') }}</p>
            <div class="p-16px rd-8px bg-container border border-primary/12">
              <div class="cn-kv-grid">
                <div v-for="item in deviceParams" :key="item.label">
                  <div class="cn-kv-label">{{ item.label }}</div>
                  <div class="cn-kv-value">{{ item.value }}</div>
                </div>
              </div>
            </div>
            <div
              class="p-8px px-12px rd-4px bg-primary/4 border border-primary/20 border-dashed font-mono text-12px text-cn-blue-80 break-all mt-12px"
            >
              &lt;div class="cn-kv-label"&gt;SOC&lt;/div&gt;
              <br />
              &lt;div class="cn-kv-value"&gt;87.2%&lt;/div&gt;
            </div>
          </NCard>

          <!-- cn-status-dot -->
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.statusDot') }}</div>
            <p class="text-12px text-gray-400 mb-12px">{{ $t('page.themeShowcase.pageLayout.statusDotHint') }}</p>
            <div class="flex flex-wrap gap-24px">
              <div v-for="item in statusDotExamples" :key="item.desc" class="flex items-center gap-8px">
                <span :class="item.class" />
                <div>
                  <div class="text-14px">{{ item.label }}</div>
                  <div class="text-11px text-gray-400 font-mono">{{ item.desc }}</div>
                </div>
              </div>
            </div>
            <div
              class="p-8px px-12px rd-4px bg-primary/4 border border-primary/20 border-dashed font-mono text-12px text-cn-blue-80 break-all mt-12px"
            >
              &lt;span class="cn-status-dot cn-status-dot-running" /&gt; 运行中
            </div>
          </NCard>

          <!-- cn-section-title -->
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.sectionTitle') }}</div>
            <p class="text-12px text-gray-400 mb-12px">{{ $t('page.themeShowcase.pageLayout.sectionTitleHint') }}</p>
            <NSpace vertical :size="12">
              <div class="cn-section-title">实时监测数据</div>
              <div class="cn-section-title">历史趋势分析</div>
            </NSpace>
            <div
              class="p-8px px-12px rd-4px bg-primary/4 border border-primary/20 border-dashed font-mono text-12px text-cn-blue-80 break-all mt-12px"
            >
              &lt;div class="cn-section-title"&gt;实时监测数据&lt;/div&gt;
            </div>
          </NCard>

          <!-- cn-chart-wrap -->
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.chartWrap') }}</div>
            <p class="text-12px text-gray-400 mb-12px">{{ $t('page.themeShowcase.pageLayout.chartWrapHint') }}</p>
            <div class="cn-chart-wrap flex flex-col items-center justify-center gap-8px text-gray-400">
              <span class="text-13px">ECharts 挂载区域 · min-h-360px</span>
              <span class="text-11px font-mono text-gray-300">ref="chartRef" + initChart()</span>
            </div>
            <div
              class="p-8px px-12px rd-4px bg-primary/4 border border-primary/20 border-dashed font-mono text-12px text-cn-blue-80 break-all mt-12px"
            >
              &lt;div ref="chartRef" class="cn-chart-wrap" /&gt;
            </div>
          </NCard>

          <!-- cn-empty -->
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.empty') }}</div>
            <p class="text-12px text-gray-400 mb-12px">{{ $t('page.themeShowcase.pageLayout.emptyHint') }}</p>
            <div class="rd-8px border border-primary/12">
              <div v-if="showEmptyDemo" class="cn-empty">
                <span>暂无告警记录</span>
                <NButton class="cn-btn cn-btn-ghost mt-12px" size="small" @click="showEmptyDemo = false">
                  返回列表
                </NButton>
              </div>
              <div v-else class="p-24px text-center">
                <NButton class="cn-btn cn-btn-ghost" size="small" @click="showEmptyDemo = true">
                  点击查看 cn-empty 效果
                </NButton>
              </div>
            </div>
            <div
              class="p-8px px-12px rd-4px bg-primary/4 border border-primary/20 border-dashed font-mono text-12px text-cn-blue-80 break-all mt-12px"
            >
              &lt;div class="cn-empty"&gt;暂无数据&lt;/div&gt;
            </div>
          </NCard>

          <!-- cn-page 完整组合 -->
          <NCard :bordered="false" class="cn-card cn-card-highlight card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.fullPage') }}</div>
            <p class="text-12px text-gray-400 mb-12px">{{ $t('page.themeShowcase.pageLayout.fullPageHint') }}</p>
            <div class="cn-page p-16px rd-8px bg-primary/2 border border-primary/10">
              <div class="cn-page-header">
                <div>
                  <h2 class="cn-page-title">BMS 电池包监控</h2>
                  <p class="cn-page-desc">产线 A · 实时数据 · 每 5s 刷新</p>
                </div>
                <NButton class="cn-btn cn-btn-primary" type="primary" size="small">导出报表</NButton>
              </div>
              <div class="cn-toolbar">
                <NInput class="cn-input w-200px" placeholder="搜索设备编号" size="small" />
                <NSelect class="cn-input w-160px" :options="selectOptions" placeholder="产线" size="small" />
                <NButton class="cn-btn cn-btn-ghost" size="small">查询</NButton>
              </div>
              <div class="cn-stat-row">
                <NCard
                  v-for="item in statMetrics.slice(0, 2)"
                  :key="item.label"
                  class="cn-card cn-card-metric card-wrapper"
                  :bordered="false"
                  size="small"
                >
                  <div class="text-12px text-gray-500">{{ item.label }}</div>
                  <div class="text-20px font-600 text-primary font-mono mt-4px">{{ item.value }} {{ item.unit }}</div>
                </NCard>
              </div>
              <div class="cn-section-title">实时参数</div>
              <div class="cn-kv-grid">
                <div v-for="item in deviceParams.slice(0, 4)" :key="item.label">
                  <div class="cn-kv-label">{{ item.label }}</div>
                  <div class="cn-kv-value">{{ item.value }}</div>
                </div>
              </div>
              <div class="cn-chart-wrap flex items-center justify-center text-gray-400 text-13px">SOC 趋势图</div>
            </div>
            <div
              class="p-8px px-12px rd-4px bg-primary/4 border border-primary/20 border-dashed font-mono text-12px text-cn-blue-80 break-all mt-12px"
            >
              &lt;div class="cn-page"&gt; ... 组合以上所有 layout class ... &lt;/div&gt;
            </div>
          </NCard>
        </NSpace>
      </NTabPane>
    </NTabs>

    <!-- Modal -->
    <NModal v-model:show="showModal" preset="card" title="设备详情" class="cn-modal" style="width: 480px">
      <NSpace vertical :size="12">
        <NAlert class="cn-alert cn-alert-info" type="info">BMS-001 电池管理系统 · 运行正常</NAlert>
        <NDescriptions :column="2" bordered size="small">
          <NDescriptionsItem label="SOC">87%</NDescriptionsItem>
          <NDescriptionsItem label="温度">32.5 ℃</NDescriptionsItem>
          <NDescriptionsItem label="电压">3.65 V</NDescriptionsItem>
          <NDescriptionsItem label="电流">12.3 A</NDescriptionsItem>
        </NDescriptions>
        <div class="flex justify-end gap-8px pt-8px">
          <NButton class="cn-btn cn-btn-ghost" @click="showModal = false">取消</NButton>
          <NButton class="cn-btn cn-btn-primary" type="primary" @click="showModal = false">确认</NButton>
        </div>
      </NSpace>
    </NModal>

    <!-- Dialog -->
    <NModal
      v-model:show="showDialog"
      preset="dialog"
      title="操作确认"
      class="cn-modal"
      positive-text="确认"
      negative-text="取消"
      @positive-click="showDialog = false"
      @negative-click="showDialog = false"
    >
      确认对 BMS-003 执行远程复位操作？此操作不可撤销。
    </NModal>
  </NSpace>
</template>

<style scoped></style>
