<script setup lang="ts">
import type { EmsEmptyType } from '@/constants/ems/empty';

defineOptions({ name: 'EmsAsyncBoundary' });

withDefaults(
  defineProps<{
    loading?: boolean;
    empty?: boolean;
    emptyType?: EmsEmptyType;
    emptyDescription?: string;
    loadingTip?: string;
    minHeight?: string;
  }>(),
  {
    loading: false,
    empty: false,
    emptyType: 'default',
    loadingTip: '加载中…',
    minHeight: '200px'
  }
);
</script>

<template>
  <div class="ems-async-boundary" :style="{ minHeight }">
    <template v-if="empty && !loading">
      <EmsEmpty :type="emptyType" :description="emptyDescription" block>
        <template v-if="$slots.empty" #extra>
          <slot name="empty" />
        </template>
      </EmsEmpty>
    </template>

    <template v-else-if="$slots.default">
      <div class="ems-async-boundary__content" :class="{ 'is-loading': loading }">
        <slot />
      </div>
      <EmsOverlay v-if="loading" :show="loading" :tip="loadingTip" />
    </template>

    <EmsLoading v-else-if="loading" block :tip="loadingTip" />
  </div>
</template>

<style scoped>
.ems-async-boundary {
  position: relative;
  width: 100%;
}

.ems-async-boundary__content.is-loading {
  pointer-events: none;
  user-select: none;
}
</style>
