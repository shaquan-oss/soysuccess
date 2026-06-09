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
  showcaseCodeHintClass,
  showcaseDeviceParams,
  showcaseGeneralColors,
  showcaseGreenScale,
  showcaseRadiusSpec,
  showcaseScrollbarDemoItems,
  showcaseSelectOptions,
  showcaseStatMetrics,
  showcaseStatusDotExamples,
  showcaseTableData,
  showcaseTextColors,
  type ShowcaseDeviceRow
} from '@/theme/showcase-data';
import IndustrialCharts from './modules/industrial-charts.vue';
import EmsBusinessShowcase from './modules/ems-business.vue';
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
const formCompany = ref('');
const errorInputValue = ref('');
const paginationPage = ref(1);
const checkboxValues = ref(['opt1']);
const switchEnabled = ref(true);
const activeTab = ref('colors');

const selectOptions = showcaseSelectOptions;

const statusTagMap: Record<ShowcaseDeviceRow['status'], { class: string; label: string }> = {
  running: { class: 'cn-tag cn-tag-running', label: '运行中' },
  charging: { class: 'cn-tag cn-tag-charging', label: '充电中' },
  alarm: { class: 'cn-tag cn-tag-alarm', label: '告警' },
  offline: { class: 'cn-tag cn-tag-offline', label: '离线' }
};

const tableData = showcaseTableData;

const columns: DataTableColumns<ShowcaseDeviceRow> = [
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

const blueScale = showcaseBlueScale;
const greenScale = showcaseGreenScale;

const semanticColors = [
  { name: 'primary', label: '主色 Primary', color: themeStore.themeColor },
  { name: 'info', label: '信息 Info', color: themeStore.otherColor.info },
  { name: 'success', label: '成功 Success', color: themeStore.otherColor.success },
  { name: 'warning', label: '警告 Warning', color: themeStore.otherColor.warning },
  { name: 'error', label: '错误 Error', color: themeStore.otherColor.error }
];

const auxColors = showcaseAuxColors;
const textColors = showcaseTextColors;
const chartColors = showcaseChartColors;
const generalColors = showcaseGeneralColors;
const scrollbarDemoItems = showcaseScrollbarDemoItems;
const statMetrics = showcaseStatMetrics;
const deviceParams = showcaseDeviceParams;
const statusDotExamples = showcaseStatusDotExamples;
const showEmptyDemo = ref(false);
const codeHintClass = showcaseCodeHintClass;
const buttonInteractionColors = showcaseButtonInteractionColors;
const radiusSpec = showcaseRadiusSpec;
const buttonHeightSpec = showcaseButtonHeightSpec;
</script>

<template>
  <NSpace vertical :size="16">
    <!-- 页头 -->
    <NCard :bordered="false" class="cn-card cn-card-highlight card-wrapper">
      <div class="flex items-center justify-between flex-wrap gap-12px">
        <div>
          <h2 class="text-20px font-600 text-primary m-0 mb-4px">{{ $t('page.themeShowcase.title') }}</h2>
          <p class="cn-text-secondary text-14px m-0">{{ $t('page.themeShowcase.subtitle') }}</p>
        </div>
        <NSpace>
          <NTag class="cn-tag cn-tag-energy" :bordered="false">Cornex 楚能</NTag>
          <NTag class="cn-tag cn-tag-maintenance" :bordered="false">UI 设计稿 v2</NTag>
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
                  <span class="cn-text-sm font-mono text-cn-text-secondary">{{ item.label }}</span>
                  <span class="font-mono text-10px text-cn-text-hint">{{ item.color }}</span>
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
                  <span class="cn-text-sm font-mono text-cn-text-secondary">{{ item.label }}</span>
                  <span class="font-mono text-10px text-cn-text-hint">{{ item.hex }}</span>
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
                  <span class="cn-text-sm font-mono text-cn-text-secondary">{{ item.label }}</span>
                  <span class="font-mono text-10px text-cn-text-hint">{{ item.hex }}</span>
                </div>
              </NGi>
            </NGrid>
          </NCard>

          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.textColors') }}</div>
            <NGrid cols="3" :x-gap="12" responsive="screen">
              <NGi v-for="item in textColors" :key="item.hex">
                <div class="flex flex-col items-center gap-6px">
                  <div
                    class="w-full h-48px rd-6px border border-cn-border flex items-center justify-center"
                    :style="{ color: item.hex }"
                  >
                    Aa 文字
                  </div>
                  <span class="cn-text-sm font-mono text-cn-text-secondary">{{ item.label }}</span>
                  <span class="font-mono text-10px text-cn-text-hint">{{ item.hex }}</span>
                </div>
              </NGi>
            </NGrid>
          </NCard>

          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.typography') }}</div>
            <NSpace vertical :size="12">
              <div class="cn-text-xl">特大标题 24px / 36px</div>
              <div class="cn-text-lg">文章标题 20px / 30px</div>
              <div class="cn-text-md">小标题 / 按钮 / 表头 16px / 24px</div>
              <div class="cn-text-base">正文 / 表单 / 列表 14px / 20px</div>
              <div class="cn-text-sm">次要信息 / 辅助说明 12px / 18px</div>
            </NSpace>
          </NCard>

          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.auxColors') }}</div>
            <NGrid cols="2 s:3 m:5" :x-gap="12" :y-gap="12" responsive="screen">
              <NGi v-for="item in auxColors" :key="item.hex">
                <div class="flex flex-col items-center gap-6px">
                  <div
                    class="w-full h-48px rd-6px border border-black/6 transition-transform hover:scale-y-105"
                    :style="{ backgroundColor: item.hex }"
                  />
                  <span class="cn-text-sm font-mono text-cn-text-secondary">{{ item.label }}</span>
                  <span class="font-mono text-10px text-cn-text-hint">{{ item.hex }}</span>
                </div>
              </NGi>
            </NGrid>
          </NCard>

          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.chartColors') }}</div>
            <NGrid cols="3 s:5 m:9" :x-gap="8" :y-gap="8" responsive="screen">
              <NGi v-for="item in chartColors" :key="item.hex">
                <div class="flex flex-col items-center gap-6px">
                  <div class="w-full h-40px rd-4px border border-cn-border" :style="{ backgroundColor: item.hex }" />
                  <span class="cn-text-sm font-mono text-cn-text-hint">{{ item.label }}</span>
                </div>
              </NGi>
            </NGrid>
          </NCard>

          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.controls.radius') }}</div>
            <p class="cn-text-sm mb-16px">{{ $t('page.themeShowcase.controls.radiusHint') }}</p>
            <div class="flex flex-wrap gap-24px mb-16px">
              <div v-for="item in radiusSpec" :key="item.px" class="flex flex-col items-center gap-8px">
                <div class="size-80px bg-cn-blue-100" :style="{ borderRadius: `${item.px}px` }" />
                <div class="text-center">
                  <div class="cn-text-base font-600">{{ item.px }}px</div>
                  <div class="cn-text-sm">{{ item.label }}</div>
                  <div class="font-mono text-10px text-cn-text-hint mt-4px">{{ item.shortcut }}</div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 m:grid-cols-3 gap-12px">
              <div v-for="item in radiusSpec" :key="item.usage" class="cn-industrial-panel">
                <div class="cn-text-sm mb-4px">{{ item.label }}</div>
                <div class="cn-text-secondary text-14px">{{ item.usage }}</div>
              </div>
            </div>
          </NCard>

          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.controls.buttonHeight') }}</div>
            <p class="cn-text-sm mb-16px">{{ $t('page.themeShowcase.controls.buttonHeightHint') }}</p>
            <div class="flex flex-wrap items-end gap-24px mb-16px">
              <div v-for="item in buttonHeightSpec" :key="item.size" class="flex flex-col items-center gap-8px">
                <NButton class="cn-btn cn-btn-primary" type="primary" :size="item.size">{{ item.px }}px</NButton>
                <div class="text-center">
                  <div class="cn-text-sm font-mono">{{ item.size }} · {{ item.px }}px</div>
                  <div class="cn-text-sm max-w-160px">{{ item.desc }}</div>
                </div>
              </div>
            </div>
          </NCard>

          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.generalColors') }}</div>
            <NGrid cols="2 s:3 m:5" :x-gap="12" :y-gap="12" responsive="screen">
              <NGi v-for="item in generalColors" :key="item.hex">
                <div class="flex flex-col items-center gap-6px">
                  <div class="w-full h-48px rd-6px border border-black/6" :style="{ backgroundColor: item.hex }" />
                  <span class="cn-text-sm font-mono text-cn-text-secondary">{{ item.label }}</span>
                  <span class="font-mono text-10px text-cn-text-hint">{{ item.hex }}</span>
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
          <p class="cn-text-sm mb-16px">{{ $t('page.themeShowcase.buttonHint') }}</p>

          <NSpace vertical :size="20">
            <div>
              <div class="cn-text-secondary text-14px mb-8px">设计稿 · 主按钮交互色（cn-btn-primary 自动应用）</div>
              <div class="flex flex-wrap gap-16px mb-12px">
                <div v-for="item in buttonInteractionColors" :key="item.label" class="flex items-center gap-8px">
                  <div class="size-32px rd-4px border border-cn-border" :style="{ backgroundColor: item.hex }" />
                  <div>
                    <div class="cn-text-sm">{{ item.label }}</div>
                    <div class="font-mono text-11px text-cn-text-hint">{{ item.hex }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="cn-text-secondary text-14px mb-8px">设计稿 · 按钮类型（搜索 / 导出 / 确定 / 取消 / 新增）</div>
              <div class="flex flex-wrap items-center gap-12px">
                <NButton class="cn-btn cn-btn-primary" type="primary">搜索</NButton>
                <NButton class="cn-btn cn-btn-primary" type="primary">导出</NButton>
                <NButton class="cn-btn cn-btn-primary" type="primary">确定</NButton>
                <NButton class="cn-btn cn-btn-secondary">取消</NButton>
                <NButton class="cn-btn cn-btn-outline">+ 新增任务</NButton>
                <NButton class="cn-btn cn-btn-primary" type="primary">+ 新增</NButton>
              </div>
              <div class="mt-8px" :class="[codeHintClass]">
                cn-btn-primary / cn-btn-secondary / cn-btn-outline
              </div>
            </div>

            <div>
              <div class="cn-text-secondary text-14px mb-8px">状态：禁用 / 成功</div>
              <div class="flex flex-wrap items-center gap-12px">
                <NButton class="cn-btn cn-btn-primary" type="primary" disabled>禁用</NButton>
                <NButton class="cn-btn cn-btn-success" type="success">成功</NButton>
                <NButton class="cn-btn cn-btn-secondary-success">取消·成功</NButton>
                <NButton class="cn-btn cn-btn-outline-success">+ 新增任务·成功</NButton>
                <NButton class="cn-btn cn-btn-danger" type="error">危险</NButton>
                <NButton class="cn-btn cn-btn-warning" type="warning">警告</NButton>
              </div>
            </div>

            <div>
              <div class="cn-text-secondary text-14px mb-8px">其他风格</div>
              <div class="flex flex-wrap items-center gap-12px">
                <NButton class="cn-btn cn-btn-accent" type="success">能源强调</NButton>
                <NButton class="cn-btn cn-btn-industrial">INDUSTRIAL-01</NButton>
                <NButton class="cn-btn cn-btn-text" text>文字按钮</NButton>
                <NButton class="cn-btn cn-btn-primary" type="primary" loading>加载中</NButton>
              </div>
            </div>

            <div>
              <div class="cn-text-secondary text-14px mb-8px">
                尺寸（设计稿：Small 32px / Medium 36px / Large 48px）
              </div>
              <div class="flex flex-wrap items-end gap-16px">
                <div v-for="item in buttonHeightSpec" :key="item.size" class="flex flex-col items-center gap-6px">
                  <NButton class="cn-btn cn-btn-primary" type="primary" :size="item.size">
                    {{ item.size === 'small' ? 'Small' : item.size === 'medium' ? 'Medium' : 'Large' }}
                  </NButton>
                  <span class="cn-text-sm font-mono">{{ item.px }}px</span>
                </div>
              </div>
            </div>
          </NSpace>
        </NCard>
      </NTabPane>

      <!-- 标签 -->
      <NTabPane name="tags" :tab="$t('page.themeShowcase.tabs.tags')">
        <NCard :bordered="false" class="cn-card card-wrapper">
          <div class="cn-section-title mb-12px">{{ $t('page.themeShowcase.deviceStatusTags') }}</div>
          <p class="cn-text-sm mb-16px">
            {{ $t('page.themeShowcase.tagHint') }} · 运行中/成功态使用设计稿青色 #2CCFDC（cn-tag-running）
          </p>
          <div class="flex flex-wrap items-center gap-12px">
            <NTag class="cn-tag cn-tag-running" :bordered="false">运行中</NTag>
            <NTag class="cn-tag cn-tag-charging" :bordered="false">充电中</NTag>
            <NTag class="cn-tag cn-tag-discharging" :bordered="false">放电中</NTag>
            <NTag class="cn-tag cn-tag-alarm" :bordered="false">告警</NTag>
            <NTag class="cn-tag cn-tag-offline" :bordered="false">离线</NTag>
            <NTag class="cn-tag cn-tag-maintenance" :bordered="false">维护中</NTag>
            <NTag class="cn-tag cn-tag-energy" :bordered="false">能源正常</NTag>
          </div>
          <div class="mt-12px" :class="[codeHintClass]">
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
                <p class="cn-text-sm mb-16px">{{ $t('page.themeShowcase.formHint') }}</p>
                <NSpace vertical :size="16">
                  <NFormItem label="公司名称" label-placement="top">
                    <NInput v-model:value="formCompany" class="cn-input" placeholder="请输入公司名称" />
                  </NFormItem>
                  <NFormItem label="产线选择" label-placement="top">
                    <NSelect
                      v-model:value="selectValue"
                      class="cn-select"
                      :options="selectOptions"
                      placeholder="选择产线"
                    />
                  </NFormItem>
                  <NFormItem label="输入中（聚焦态）" label-placement="top">
                    <NInput v-model:value="inputValue" class="cn-input" placeholder="聚焦时显示主题蓝边框" />
                  </NFormItem>
                  <NFormItem label="校验失败" label-placement="top" validation-status="error" feedback="请输入有效内容">
                    <NInput
                      v-model:value="errorInputValue"
                      class="cn-input"
                      status="error"
                      placeholder="错误态红色边框"
                    />
                  </NFormItem>
                </NSpace>
              </NCard>
            </NGi>
            <NGi>
              <NCard :bordered="false" class="cn-card card-wrapper">
                <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.progress') }}</div>
                <NSpace vertical :size="16">
                  <div>
                    <div class="cn-text-sm mb-4px">SOC 87%</div>
                    <NProgress type="line" :percentage="87" indicator-placement="inside" processing />
                  </div>
                  <div>
                    <div class="cn-text-sm mb-8px">{{ $t('page.themeShowcase.pagination') }}</div>
                    <NPagination v-model:page="paginationPage" class="cn-pagination" :page-count="8" />
                  </div>
                  <div>
                    <div class="cn-text-sm mb-8px">{{ $t('page.themeShowcase.checkboxSwitch') }}</div>
                    <NSpace vertical :size="12">
                      <NCheckboxGroup v-model:value="checkboxValues">
                        <NSpace>
                          <NCheckbox value="opt1" label="选中项" />
                          <NCheckbox value="opt2" label="未选中" />
                        </NSpace>
                      </NCheckboxGroup>
                      <NSwitch v-model:value="switchEnabled" />
                    </NSpace>
                  </div>
                  <NSpace>
                    <NBadge :value="3" class="cn-badge">
                      <NButton class="cn-btn cn-btn-ghost" size="small">告警消息</NButton>
                    </NBadge>
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
                <p class="cn-text-secondary text-14px m-0">class="cn-card"</p>
              </NCard>
            </NGi>
            <NGi>
              <NCard title="高亮卡片" class="cn-card cn-card-highlight card-wrapper" :bordered="false">
                <p class="cn-text-secondary text-14px m-0">class="cn-card cn-card-highlight"</p>
              </NCard>
            </NGi>
            <NGi>
              <NCard title="指标卡片" class="cn-card cn-card-metric card-wrapper" :bordered="false">
                <div class="cn-text-xl text-primary font-mono">12,580</div>
                <div class="cn-text-sm">今日产量 (PCS)</div>
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
            <div class="mt-12px" :class="[codeHintClass]">外层容器添加 class="cn-table"</div>
          </NCard>
        </NSpace>
      </NTabPane>

      <!-- 页面布局 shortcuts（非 Naive 组件） -->
      <NTabPane name="pageLayout" :tab="$t('page.themeShowcase.tabs.pageLayout')">
        <NSpace vertical :size="16">
          <!-- cn-page-header -->
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.pageHeader') }}</div>
            <p class="cn-text-sm mb-12px">{{ $t('page.themeShowcase.pageLayout.pageHeaderHint') }}</p>
            <div class="cn-page-header cn-industrial-panel">
              <div>
                <h2 class="cn-page-title">储能站总览</h2>
                <p class="cn-page-desc">湖北基地 · 1 号储能柜 · 最后更新 10:32:05</p>
              </div>
              <NSpace>
                <NButton class="cn-btn cn-btn-ghost" size="small">刷新</NButton>
                <NButton class="cn-btn cn-btn-primary" type="primary" size="small">导出报表</NButton>
              </NSpace>
            </div>
            <div class="mt-12px" :class="[codeHintClass]">
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
            <p class="cn-text-sm mb-12px">{{ $t('page.themeShowcase.pageLayout.toolbarHint') }}</p>
            <div class="cn-toolbar">
              <NInput class="cn-input w-200px" placeholder="设备编号 / 名称" size="small" />
              <NSelect class="cn-select w-160px" :options="selectOptions" placeholder="产线" size="small" />
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
            <div class="mt-12px" :class="[codeHintClass]">&lt;div class="cn-toolbar"&gt;...筛选控件...&lt;/div&gt;</div>
          </NCard>

          <!-- cn-stat-row -->
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.statRow') }}</div>
            <p class="cn-text-sm mb-12px">{{ $t('page.themeShowcase.pageLayout.statRowHint') }}</p>
            <div class="cn-stat-row">
              <NCard
                v-for="item in statMetrics"
                :key="item.label"
                class="cn-card cn-card-metric card-wrapper"
                :bordered="false"
                size="small"
              >
                <div class="cn-text-sm mb-4px">{{ item.label }}</div>
                <div class="flex items-baseline gap-4px">
                  <span class="cn-text-xl text-primary font-mono">{{ item.value }}</span>
                  <span class="cn-text-sm">{{ item.unit }}</span>
                </div>
                <div class="text-11px text-cn-green-aux mt-4px">{{ item.trend }}</div>
              </NCard>
            </div>
            <div class="mt-12px" :class="[codeHintClass]">
              &lt;div class="cn-stat-row"&gt; + cn-card cn-card-metric&lt;/div&gt;
            </div>
          </NCard>

          <!-- cn-kv-grid -->
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.kvGrid') }}</div>
            <p class="cn-text-sm mb-12px">{{ $t('page.themeShowcase.pageLayout.kvGridHint') }}</p>
            <div class="cn-industrial-panel">
              <div class="cn-kv-grid">
                <div v-for="item in deviceParams" :key="item.label">
                  <div class="cn-kv-label">{{ item.label }}</div>
                  <div class="cn-kv-value">{{ item.value }}</div>
                </div>
              </div>
            </div>
            <div class="mt-12px" :class="[codeHintClass]">
              &lt;div class="cn-kv-label"&gt;SOC&lt;/div&gt;
              <br />
              &lt;div class="cn-kv-value"&gt;87.2%&lt;/div&gt;
            </div>
          </NCard>

          <!-- cn-status-dot -->
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.statusDot') }}</div>
            <p class="cn-text-sm mb-12px">{{ $t('page.themeShowcase.pageLayout.statusDotHint') }}</p>
            <div class="flex flex-wrap gap-24px">
              <div v-for="item in statusDotExamples" :key="item.desc" class="flex items-center gap-8px">
                <span :class="item.class" />
                <div>
                  <div class="text-14px">{{ item.label }}</div>
                  <div class="cn-text-sm font-mono text-cn-text-hint">{{ item.desc }}</div>
                </div>
              </div>
            </div>
            <div class="mt-12px" :class="[codeHintClass]">
              &lt;span class="cn-status-dot cn-status-dot-running" /&gt; 运行中
            </div>
          </NCard>

          <!-- cn-section-title -->
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.sectionTitle') }}</div>
            <p class="cn-text-sm mb-12px">{{ $t('page.themeShowcase.pageLayout.sectionTitleHint') }}</p>
            <NSpace vertical :size="12">
              <div class="cn-section-title">实时监测数据</div>
              <div class="cn-section-title">历史趋势分析</div>
            </NSpace>
            <div class="mt-12px" :class="[codeHintClass]">
              &lt;div class="cn-section-title"&gt;实时监测数据&lt;/div&gt;
            </div>
          </NCard>

          <!-- cn-chart-wrap -->
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.chartWrap') }}</div>
            <p class="cn-text-sm mb-12px">{{ $t('page.themeShowcase.pageLayout.chartWrapHint') }}</p>
            <div class="cn-chart-wrap flex flex-col items-center justify-center gap-8px cn-text-hint">
              <span class="cn-text-secondary text-14px">ECharts 挂载区域 · min-h-360px</span>
              <span class="cn-text-sm font-mono">ref="chartRef" + initChart()</span>
            </div>
            <div class="mt-12px" :class="[codeHintClass]">&lt;div ref="chartRef" class="cn-chart-wrap" /&gt;</div>
          </NCard>

          <!-- cn-empty -->
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.empty') }}</div>
            <p class="cn-text-sm mb-12px">{{ $t('page.themeShowcase.pageLayout.emptyHint') }}</p>
            <div class="cn-industrial-panel p-0 overflow-hidden">
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
            <div class="mt-12px" :class="[codeHintClass]">&lt;div class="cn-empty"&gt;暂无数据&lt;/div&gt;</div>
          </NCard>

          <!-- cn-page 完整组合 -->
          <NCard :bordered="false" class="cn-card cn-card-highlight card-wrapper">
            <div class="cn-section-title mb-16px">{{ $t('page.themeShowcase.pageLayout.fullPage') }}</div>
            <p class="cn-text-sm mb-12px">{{ $t('page.themeShowcase.pageLayout.fullPageHint') }}</p>
            <div class="cn-page cn-industrial-panel">
              <div class="cn-page-header">
                <div>
                  <h2 class="cn-page-title">BMS 电池包监控</h2>
                  <p class="cn-page-desc">产线 A · 实时数据 · 每 5s 刷新</p>
                </div>
                <NButton class="cn-btn cn-btn-primary" type="primary" size="small">导出报表</NButton>
              </div>
              <div class="cn-toolbar">
                <NInput class="cn-input w-200px" placeholder="搜索设备编号" size="small" />
                <NSelect class="cn-select w-160px" :options="selectOptions" placeholder="产线" size="small" />
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
                  <div class="cn-text-sm">{{ item.label }}</div>
                  <div class="cn-text-lg text-primary font-mono mt-4px">{{ item.value }} {{ item.unit }}</div>
                </NCard>
              </div>
              <div class="cn-section-title">实时参数</div>
              <div class="cn-kv-grid">
                <div v-for="item in deviceParams.slice(0, 4)" :key="item.label">
                  <div class="cn-kv-label">{{ item.label }}</div>
                  <div class="cn-kv-value">{{ item.value }}</div>
                </div>
              </div>
              <div class="cn-chart-wrap flex items-center justify-center cn-text-hint cn-text-secondary text-14px">
                SOC 趋势图
              </div>
            </div>
            <div class="mt-12px" :class="[codeHintClass]">
              &lt;div class="cn-page"&gt; ... 组合以上所有 layout class ... &lt;/div&gt;
            </div>
          </NCard>
        </NSpace>
      </NTabPane>

      <!-- 工业化图表 & 滚动条 -->
      <NTabPane name="industrial" :tab="$t('page.themeShowcase.tabs.industrial')">
        <NSpace vertical :size="16">
          <NCard :bordered="false" class="cn-card card-wrapper">
            <div class="cn-section-title mb-12px">{{ $t('page.themeShowcase.industrial.charts') }}</div>
            <p class="cn-text-sm mb-16px">{{ $t('page.themeShowcase.industrial.chartsHint') }}</p>
            <IndustrialCharts />
          </NCard>

          <NGrid cols="1 m:2" :x-gap="16" :y-gap="16" responsive="screen">
            <NGi>
              <NCard :bordered="false" class="cn-card card-wrapper">
                <div class="cn-section-title mb-12px">{{ $t('page.themeShowcase.industrial.scrollbar') }}</div>
                <p class="cn-text-sm mb-12px">{{ $t('page.themeShowcase.industrial.scrollbarHint') }}</p>
                <div class="cn-industrial-panel cn-scrollbar h-240px">
                  <div
                    v-for="item in scrollbarDemoItems"
                    :key="item.id"
                    class="flex items-center justify-between py-10px px-8px border-b border-cn-border last:border-b-0 hover:bg-cn-hover rd-4px cn-text-base"
                  >
                    <span class="font-mono">{{ item.name }}</span>
                    <span class="cn-text-sm">SOC {{ item.soc }}</span>
                    <NTag
                      size="small"
                      :bordered="false"
                      :class="item.status === '告警' ? 'cn-tag cn-tag-alarm' : 'cn-tag cn-tag-running'"
                    >
                      {{ item.status }}
                    </NTag>
                  </div>
                </div>
                <div class="mt-12px" :class="[codeHintClass]">class="cn-scrollbar"</div>
              </NCard>
            </NGi>
            <NGi>
              <NCard :bordered="false" class="cn-card card-wrapper">
                <div class="cn-section-title mb-12px">{{ $t('page.themeShowcase.industrial.monitor') }}</div>
                <p class="cn-text-sm mb-12px">{{ $t('page.themeShowcase.industrial.monitorHint') }}</p>
                <div class="cn-industrial-panel">
                  <div class="cn-stat-row mb-16px">
                    <div
                      v-for="item in statMetrics.slice(0, 2)"
                      :key="item.label"
                      class="p-12px rd-6px bg-container border border-cn-border"
                    >
                      <div class="cn-text-sm">{{ item.label }}</div>
                      <div class="text-22px font-600 text-primary font-mono mt-4px">
                        {{ item.value }}
                        <span class="text-12px text-cn-text-hint">{{ item.unit }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="cn-kv-grid">
                    <div v-for="item in deviceParams.slice(0, 4)" :key="item.label">
                      <div class="cn-kv-label">{{ item.label }}</div>
                      <div class="cn-kv-value">{{ item.value }}</div>
                    </div>
                  </div>
                </div>
              </NCard>
            </NGi>
          </NGrid>
        </NSpace>
      </NTabPane>

      <!-- EMS 业务场景 -->
      <NTabPane name="ems" :tab="$t('page.themeShowcase.tabs.ems')">
        <EmsBusinessShowcase />
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
