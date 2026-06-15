<script setup lang="ts">
import { computed } from 'vue';
import { EMS_LOADING_GIF } from '@/constants/ems/assets';

defineOptions({ name: 'EmsLoading' });

type LoadingSize = 'sm' | 'md' | 'lg';

const props = withDefaults(
  defineProps<{
    /** 是否显示 loading */
    show?: boolean;
    /** 提示文案 */
    tip?: string;
    /** 尺寸 */
    size?: LoadingSize;
    /** 是否占满父容器高度（用于空容器居中） */
    block?: boolean;
  }>(),
  {
    show: true,
    size: 'md',
    block: false
  }
);

const sizeClassMap: Record<LoadingSize, string> = {
  sm: 'w-32px h-32px',
  md: 'w-48px h-48px',
  lg: 'w-64px h-64px'
};

const imageClass = computed(() => sizeClassMap[props.size]);
</script>

<template>
  <div
    v-if="show"
    class="ems-loading"
    :class="{ 'ems-loading--block': block }"
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <img :src="EMS_LOADING_GIF" alt="" class="ems-loading__gif" :class="imageClass" />
    <p v-if="tip" class="ems-loading__tip">{{ tip }}</p>
  </div>
</template>

<style scoped>
.ems-loading {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.ems-loading--block {
  display: flex;
  width: 100%;
  min-height: 160px;
}

.ems-loading__gif {
  object-fit: contain;
  user-select: none;
  pointer-events: none;
}

.ems-loading__tip {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: #656565;
}
</style>
