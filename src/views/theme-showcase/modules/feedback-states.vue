<script setup lang="ts">
import { ref } from 'vue';
import { showcaseTableData } from '../showcase-data';

defineOptions({ name: 'FeedbackStatesShowcase' });

const demoLoading = ref(false);
const demoEmpty = ref(true);
const demoOverlay = ref(false);
const demoFullscreen = ref(false);

const tableData = ref([...showcaseTableData]);

function simulateLoad() {
  demoLoading.value = true;
  demoEmpty.value = false;
  window.setTimeout(() => {
    demoLoading.value = false;
  }, 1500);
}

function simulateEmptyQuery() {
  demoLoading.value = true;
  demoEmpty.value = false;
  window.setTimeout(() => {
    demoLoading.value = false;
    demoEmpty.value = true;
    tableData.value = [];
  }, 1200);
}

function simulateRestoreData() {
  demoEmpty.value = false;
  tableData.value = [...showcaseTableData];
}

function simulateOverlay() {
  demoOverlay.value = true;
  window.setTimeout(() => {
    demoOverlay.value = false;
  }, 2000);
}

function simulateFullscreenOverlay() {
  demoFullscreen.value = true;
  window.setTimeout(() => {
    demoFullscreen.value = false;
  }, 2000);
}
</script>

<template>
  <NSpace vertical :size="16">
    <NCard title="EmsLoading" :bordered="false" class="card-wrapper" size="small">
      <NSpace :size="24" align="center" wrap>
        <EmsLoading size="sm" tip="小尺寸" />
        <EmsLoading size="md" tip="默认" />
        <EmsLoading size="lg" tip="大尺寸" />
      </NSpace>
    </NCard>

    <NCard title="EmsEmpty" :bordered="false" class="card-wrapper" size="small">
      <NGrid cols="1 m:2 l:3" :x-gap="16" :y-gap="16" responsive="screen">
        <NGi>
          <div class="rd-cn-md border border-cn-border bg-container p-12px">
            <EmsEmpty type="no-data" block />
          </div>
        </NGi>
        <NGi>
          <div class="rd-cn-md border border-cn-border bg-container p-12px">
            <EmsEmpty type="no-device" block>
              <template #extra>
                <NButton type="primary" size="small">同步设备</NButton>
              </template>
            </EmsEmpty>
          </div>
        </NGi>
        <NGi>
          <div class="rd-cn-md border border-cn-border bg-container p-12px">
            <EmsEmpty type="filter-empty" block>
              <template #extra>
                <NButton size="small">重置筛选</NButton>
              </template>
            </EmsEmpty>
          </div>
        </NGi>
      </NGrid>
    </NCard>

    <NCard title="EmsOverlay · 区域遮罩" :bordered="false" class="card-wrapper" size="small">
      <div class="relative rd-cn-md border border-cn-border bg-container p-16px min-h-220px">
        <p class="text-cn-sm text-cn-text-secondary m-0 mb-12px">
          下方为 Card 内容区，遮罩仅覆盖本容器（fullscreen=false）。
        </p>
        <NDataTable :columns="[{ title: '设备', key: 'name' }]" :data="showcaseTableData.slice(0, 3)" size="small" />
        <EmsOverlay :show="demoOverlay" tip="正在同步设备状态…" />
      </div>
      <div class="flex justify-end mt-12px">
        <NButton type="primary" size="small" @click="simulateOverlay">触发 2s 区域遮罩</NButton>
      </div>
    </NCard>

    <NCard title="EmsOverlay · 全屏遮罩" :bordered="false" class="card-wrapper" size="small">
      <p class="text-cn-sm text-cn-text-secondary m-0">用于导出、批量下发等阻塞型操作。</p>
      <div class="flex justify-end mt-12px">
        <NButton type="primary" size="small" @click="simulateFullscreenOverlay">触发 2s 全屏遮罩</NButton>
      </div>
      <EmsOverlay :show="demoFullscreen" tip="正在导出，请稍候…" fullscreen />
    </NCard>

    <NCard title="EmsAsyncBoundary · 列表三态" :bordered="false" class="card-wrapper" size="small">
      <div class="flex flex-wrap gap-8px mb-12px">
        <NButton size="small" @click="simulateLoad">模拟加载</NButton>
        <NButton size="small" @click="simulateEmptyQuery">模拟查询为空</NButton>
        <NButton size="small" @click="simulateRestoreData">恢复数据</NButton>
      </div>

      <EmsAsyncBoundary
        :loading="demoLoading"
        :empty="demoEmpty"
        empty-type="filter-empty"
        loading-tip="正在查询设备…"
        min-height="240px"
      >
        <NDataTable
          :columns="[
            { title: '设备', key: 'name', width: 120 },
            { title: 'SOC', key: 'soc', width: 80, render: row => `${row.soc}%` }
          ]"
          :data="tableData"
          size="small"
          :bordered="false"
        />
        <template #empty>
          <NButton size="small" @click="simulateRestoreData">重置筛选</NButton>
        </template>
      </EmsAsyncBoundary>
    </NCard>
  </NSpace>
</template>
