<script setup lang="ts">
import { h, ref } from 'vue';
import type { DataTableColumns } from 'naive-ui';
import { NTag } from 'naive-ui';
import {
  showcaseAuxColors,
  showcaseBlueScale,
  showcaseButtonHeightSpec,
  showcaseButtonInteractionColors,
  showcaseChartColors,
  showcaseGeneralColors,
  showcaseGreenScale,
  showcaseRadiusSpec,
  showcaseScrollbarDemoItems,
  showcaseSelectOptions,
  showcaseTableData,
  showcaseTabs,
  showcaseTextColors,
  type ShowcaseDeviceRow
} from './showcase-data';
import IndustrialCharts from './modules/industrial-charts.vue';
import EmsBusinessShowcase from './modules/ems-business.vue';
import FeedbackStatesShowcase from './modules/feedback-states.vue';
import { useThemeStore } from '@/store/modules/theme';

defineOptions({
  name: 'ThemeShowcase'
});

const themeStore = useThemeStore();

const showModal = ref(false);
const showDialog = ref(false);
const inputValue = ref('');
const selectValue = ref<string | null>('line-c');
const formCompany = ref('');
const errorInputValue = ref('');
const paginationPage = ref(5);
const checkboxValues = ref(['opt1']);
const switchEnabled = ref(true);
const activeTab = ref('colors');

const statusTagMap: Record<ShowcaseDeviceRow['status'], { class: string; label: string }> = {
  running: { class: 'cn-tag-running', label: '运行中' },
  charging: { class: 'cn-tag-charging', label: '充电中' },
  alarm: { class: 'cn-tag-alarm', label: '告警' },
  offline: { class: 'cn-tag-offline', label: '离线' }
};

const columns: DataTableColumns<ShowcaseDeviceRow> = [
  { title: '设备', key: 'name', width: 120 },
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
  { title: 'SOC', key: 'soc', width: 80, render: row => `${row.soc}%` },
  {
    title: '温度',
    key: 'temperature',
    width: 80,
    render: row => (row.temperature ? `${row.temperature}` : '-')
  }
];

const semanticColors = [
  { name: 'primary', color: themeStore.themeColor },
  { name: 'info', color: themeStore.otherColor.info },
  { name: 'success', color: themeStore.otherColor.success },
  { name: 'warning', color: themeStore.otherColor.warning },
  { name: 'error', color: themeStore.otherColor.error }
];
</script>

<template>
  <NSpace vertical :size="16">
    <NTabs v-model:value="activeTab" type="line" animated>
      <NTabPane v-for="tab in showcaseTabs" :key="tab.name" :name="tab.name" :tab="tab.label">
        <!-- 配色 -->
        <NSpace v-if="tab.name === 'colors'" vertical :size="16">
          <NCard :bordered="false" class="card-wrapper">
            <NGrid cols="2 s:3 m:5" :x-gap="12" :y-gap="12" responsive="screen">
              <NGi v-for="item in semanticColors" :key="item.name">
                <div class="flex flex-col items-center gap-6px">
                  <div class="w-full h-48px rd-6px border border-black/6" :style="{ backgroundColor: item.color }" />
                  <span class="text-cn-sm font-mono">{{ item.name }}</span>
                  <span class="font-mono text-10px text-cn-text-hint">{{ item.color }}</span>
                </div>
              </NGi>
            </NGrid>
          </NCard>

          <NCard :bordered="false" class="card-wrapper">
            <NGrid cols="5 s:10" :x-gap="8" :y-gap="8" responsive="screen">
              <NGi v-for="item in showcaseBlueScale" :key="item.label">
                <div class="flex flex-col items-center gap-6px">
                  <div class="w-full h-48px rd-6px border border-black/6" :style="{ backgroundColor: item.hex }" />
                  <span class="text-cn-sm font-mono">{{ item.label }}</span>
                  <span class="font-mono text-10px text-cn-text-hint">{{ item.hex }}</span>
                </div>
              </NGi>
            </NGrid>
          </NCard>

          <NCard :bordered="false" class="card-wrapper">
            <NGrid cols="5 s:10" :x-gap="8" :y-gap="8" responsive="screen">
              <NGi v-for="item in showcaseGreenScale" :key="item.label">
                <div class="flex flex-col items-center gap-6px">
                  <div class="w-full h-48px rd-6px border border-black/6" :style="{ backgroundColor: item.hex }" />
                  <span class="text-cn-sm font-mono">{{ item.label }}</span>
                  <span class="font-mono text-10px text-cn-text-hint">{{ item.hex }}</span>
                </div>
              </NGi>
            </NGrid>
          </NCard>

          <NCard :bordered="false" class="card-wrapper">
            <NGrid cols="3" :x-gap="12" responsive="screen">
              <NGi v-for="item in showcaseTextColors" :key="item.hex">
                <div class="flex flex-col items-center gap-6px">
                  <div
                    class="w-full h-48px rd-6px border border-cn-border flex items-center justify-center"
                    :style="{ color: item.hex }"
                  >
                    Aa
                  </div>
                  <span class="text-cn-sm font-mono">{{ item.label }}</span>
                  <span class="font-mono text-10px text-cn-text-hint">{{ item.hex }}</span>
                </div>
              </NGi>
            </NGrid>
          </NCard>

          <NCard :bordered="false" class="card-wrapper">
            <NSpace vertical :size="12">
              <div class="text-cn-xl text-cn-text-primary">24px</div>
              <div class="text-cn-lg text-cn-text-primary">20px</div>
              <div class="text-cn-md text-cn-text-primary">16px</div>
              <div class="text-cn-base text-cn-text-primary">14px</div>
              <div class="text-cn-sm text-cn-text-hint">12px</div>
            </NSpace>
          </NCard>

          <NCard :bordered="false" class="card-wrapper">
            <NGrid cols="2 s:3 m:5" :x-gap="12" :y-gap="12" responsive="screen">
              <NGi v-for="item in showcaseAuxColors" :key="item.hex">
                <div class="flex flex-col items-center gap-6px">
                  <div class="w-full h-48px rd-6px border border-black/6" :style="{ backgroundColor: item.hex }" />
                  <span class="text-cn-sm font-mono">{{ item.label }}</span>
                  <span class="font-mono text-10px text-cn-text-hint">{{ item.hex }}</span>
                </div>
              </NGi>
            </NGrid>
          </NCard>

          <NCard :bordered="false" class="card-wrapper">
            <NGrid cols="3 s:5 m:9" :x-gap="8" :y-gap="8" responsive="screen">
              <NGi v-for="item in showcaseChartColors" :key="item.hex">
                <div class="flex flex-col items-center gap-6px">
                  <div class="w-full h-40px rd-4px border border-cn-border" :style="{ backgroundColor: item.hex }" />
                  <span class="text-cn-sm font-mono text-cn-text-hint">{{ item.label }}</span>
                </div>
              </NGi>
            </NGrid>
          </NCard>

          <NCard :bordered="false" class="card-wrapper">
            <div class="flex flex-wrap gap-24px">
              <div v-for="item in showcaseRadiusSpec" :key="item.px" class="flex flex-col items-center gap-8px">
                <div class="size-80px bg-cn-blue-100" :style="{ borderRadius: `${item.px}px` }" />
                <span class="text-cn-sm font-mono">{{ item.px }}px</span>
              </div>
            </div>
          </NCard>

          <NCard :bordered="false" class="card-wrapper">
            <div class="flex flex-wrap items-end gap-24px">
              <div v-for="item in showcaseButtonHeightSpec" :key="item.size" class="flex flex-col items-center gap-8px">
                <NButton type="primary" :size="item.size">{{ item.px }}px</NButton>
                <span class="text-cn-sm font-mono">{{ item.size }}</span>
              </div>
            </div>
          </NCard>

          <NCard :bordered="false" class="card-wrapper">
            <NGrid cols="2 s:3 m:5" :x-gap="12" :y-gap="12" responsive="screen">
              <NGi v-for="item in showcaseGeneralColors" :key="item.hex">
                <div class="flex flex-col items-center gap-6px">
                  <div class="w-full h-48px rd-6px border border-black/6" :style="{ backgroundColor: item.hex }" />
                  <span class="text-cn-sm font-mono">{{ item.label }}</span>
                  <span class="font-mono text-10px text-cn-text-hint">{{ item.hex }}</span>
                </div>
              </NGi>
            </NGrid>
          </NCard>
        </NSpace>

        <!-- 按钮 -->
        <NCard v-else-if="tab.name === 'buttons'" :bordered="false" class="card-wrapper">
          <NSpace vertical :size="20">
            <div class="flex flex-wrap gap-16px">
              <div v-for="item in showcaseButtonInteractionColors" :key="item.label" class="flex items-center gap-8px">
                <div class="size-32px rd-4px border border-cn-border" :style="{ backgroundColor: item.hex }" />
                <span class="text-cn-sm font-mono">{{ item.label }} · {{ item.hex }}</span>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-12px">
              <NButton type="primary">确定</NButton>
              <NButton type="default">取消</NButton>
              <NButton tertiary>新增</NButton>
              <NButton type="success">导出</NButton>
              <NButton type="error">删除</NButton>
              <NButton type="warning">警告</NButton>
              <NButton type="primary" disabled>禁用</NButton>
              <NButton type="primary" loading>加载</NButton>
              <NButton text class="!text-primary">文字</NButton>
            </div>
            <div class="flex flex-wrap items-end gap-16px">
              <NButton v-for="item in showcaseButtonHeightSpec" :key="item.size" type="primary" :size="item.size">
                {{ item.px }}px
              </NButton>
            </div>
          </NSpace>
        </NCard>

        <!-- 标签 -->
        <NCard v-else-if="tab.name === 'tags'" :bordered="false" class="card-wrapper">
          <div class="flex flex-wrap items-center gap-12px">
            <NTag class="cn-tag-running" :bordered="false">运行中</NTag>
            <NTag class="cn-tag-charging" :bordered="false">充电中</NTag>
            <NTag class="text-cn-sm font-600 !bg-warning/12 !border !border-warning/35 !text-warning" :bordered="false">
              放电中
            </NTag>
            <NTag class="cn-tag-alarm" :bordered="false">告警</NTag>
            <NTag class="cn-tag-offline" :bordered="false">离线</NTag>
            <NTag class="text-cn-sm font-600 !bg-info/10 !border !border-info/30 !text-info" :bordered="false">
              维护中
            </NTag>
          </div>
        </NCard>

        <!-- 表单 -->
        <NSpace v-else-if="tab.name === 'feedback'" vertical :size="16">
          <NCard :bordered="false" class="card-wrapper">
            <NSpace vertical :size="12">
              <NAlert type="info" title="通知">产线 A 计划产量 12,000，完成 68%。</NAlert>
              <NAlert type="success" title="正常">BMS-001 SOC 87%，温度 32.5℃。</NAlert>
              <NAlert type="warning" title="预警">BMS-003 温度 48.6℃。</NAlert>
              <NAlert type="error" title="告警">PCS-002 过流保护触发。</NAlert>
              <NAlert class="!border-l-4 !border-l-primary !bg-cn-bg font-mono" type="info" title="日志">
                [2026-06-07 10:00:00] FORMATION COMPLETE
              </NAlert>
            </NSpace>
          </NCard>

          <NGrid cols="1 m:2" :x-gap="16" :y-gap="16" responsive="screen">
            <NGi>
              <NCard :bordered="false" class="card-wrapper">
                <NSpace vertical :size="16">
                  <NInput v-model:value="formCompany" placeholder="请输入" />
                  <NSelect v-model:value="selectValue" :options="showcaseSelectOptions" placeholder="请选择" />
                  <NInput v-model:value="inputValue" placeholder="聚焦态" />
                  <NInput v-model:value="errorInputValue" status="error" placeholder="错误态" />
                </NSpace>
              </NCard>
            </NGi>
            <NGi>
              <NCard :bordered="false" class="card-wrapper">
                <NSpace vertical :size="16">
                  <NProgress type="line" :percentage="87" indicator-placement="inside" processing />
                  <NPagination v-model:page="paginationPage" :page-count="8" />
                  <NCheckboxGroup v-model:value="checkboxValues">
                    <NSpace>
                      <NCheckbox value="opt1" label="选项 A" />
                      <NCheckbox value="opt2" label="选项 B" />
                    </NSpace>
                  </NCheckboxGroup>
                  <NSwitch v-model:value="switchEnabled" />
                  <NBadge :value="3">
                    <NButton type="default" size="small">消息</NButton>
                  </NBadge>
                </NSpace>
              </NCard>
            </NGi>
          </NGrid>
        </NSpace>

        <!-- 状态：Loading / Empty / Overlay -->
        <FeedbackStatesShowcase v-else-if="tab.name === 'states'" />

        <!-- 布局 -->
        <NSpace v-else-if="tab.name === 'layout'" vertical :size="16">
          <NGrid cols="1 s:3" :x-gap="16" :y-gap="16" responsive="screen">
            <NGi>
              <NCard title="卡片" class="card-wrapper" :bordered="false">内容</NCard>
            </NGi>
            <NGi>
              <NCard title="高亮" class="card-wrapper border-primary/20 bg-cn-bg" :bordered="false">内容</NCard>
            </NGi>
            <NGi>
              <NCard
                title="指标"
                class="card-wrapper !border-l-3 !border-l-primary !rd-l-0 !rd-r-cn-md"
                :bordered="false"
              >
                <div class="text-cn-xl text-primary font-mono">12,580</div>
              </NCard>
            </NGi>
          </NGrid>

          <NCard :bordered="false" class="card-wrapper">
            <div class="flex flex-wrap items-center gap-12px mb-16px">
              <NButton type="primary" @click="showModal = true">Modal</NButton>
              <NButton type="default" @click="showDialog = true">Dialog</NButton>
            </div>
            <NDataTable :columns="columns" :data="showcaseTableData" :bordered="false" size="small" />
          </NCard>
        </NSpace>

        <!-- 图表 -->
        <NSpace v-else-if="tab.name === 'industrial'" vertical :size="16">
          <NCard :bordered="false" class="card-wrapper">
            <IndustrialCharts />
          </NCard>
          <NCard :bordered="false" class="card-wrapper">
            <div class="rd-cn-md bg-cn-bg border border-cn-border cn-scrollbar h-240px">
              <div
                v-for="item in showcaseScrollbarDemoItems"
                :key="item.id"
                class="flex items-center justify-between py-10px px-8px border-b border-cn-border last:border-b-0 hover:bg-cn-hover rd-4px"
              >
                <span class="font-mono">{{ item.name }}</span>
                <span class="text-cn-sm text-cn-text-hint">{{ item.soc }}</span>
                <NTag
                  size="small"
                  :bordered="false"
                  :class="item.status === '告警' ? 'cn-tag-alarm' : 'cn-tag-running'"
                >
                  {{ item.status }}
                </NTag>
              </div>
            </div>
          </NCard>
        </NSpace>

        <!-- EMS -->
        <EmsBusinessShowcase v-else-if="tab.name === 'ems'" />
      </NTabPane>
    </NTabs>

    <NModal v-model:show="showModal" preset="card" title="详情" style="width: 480px">
      <NSpace vertical :size="12">
        <NAlert type="info">BMS-001 · 运行正常</NAlert>
        <NDescriptions :column="2" bordered size="small">
          <NDescriptionsItem label="SOC">87%</NDescriptionsItem>
          <NDescriptionsItem label="温度">32.5 ℃</NDescriptionsItem>
        </NDescriptions>
        <div class="flex justify-end gap-8px pt-8px">
          <NButton type="default" @click="showModal = false">取消</NButton>
          <NButton type="primary" @click="showModal = false">确认</NButton>
        </div>
      </NSpace>
    </NModal>

    <NModal
      v-model:show="showDialog"
      preset="dialog"
      title="确认"
      positive-text="确认"
      negative-text="取消"
      @positive-click="showDialog = false"
      @negative-click="showDialog = false"
    >
      确认执行该操作？
    </NModal>
  </NSpace>
</template>

<style scoped></style>
