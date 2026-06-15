<script setup lang="ts">
import { computed } from 'vue';
import type { EmsEmptyType } from '@/constants/ems/empty';
import { getEmsEmptyDescription } from '@/constants/ems/empty';
import { EMS_EMPTY_IMAGE } from '@/constants/ems/assets';

defineOptions({ name: 'EmsEmpty' });

type EmptySize = 'sm' | 'md' | 'lg';

const props = withDefaults(
  defineProps<{
    /** 预设场景类型 */
    type?: EmsEmptyType;
    /** 自定义描述，优先级高于 type */
    description?: string;
    size?: EmptySize;
    /** 是否占满父容器 */
    block?: boolean;
  }>(),
  {
    type: 'default',
    size: 'md',
    block: true
  }
);

const sizeClassMap: Record<EmptySize, string> = {
  sm: 'w-120px',
  md: 'w-160px',
  lg: 'w-200px'
};

const displayDescription = computed(() => getEmsEmptyDescription(props.type, props.description));
const imageClass = computed(() => sizeClassMap[props.size]);
</script>

<template>
  <div class="ems-empty" :class="{ 'ems-empty--block': block }">
    <img :src="EMS_EMPTY_IMAGE" alt="" class="ems-empty__image" :class="imageClass" />
    <p class="ems-empty__desc">{{ displayDescription }}</p>
    <div v-if="$slots.extra" class="ems-empty__extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<style scoped>
.ems-empty {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;
}

.ems-empty--block {
  display: flex;
  width: 100%;
  min-height: 200px;
  padding: 24px 16px;
}

.ems-empty__image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
}

.ems-empty__desc {
  margin: 0;
  max-width: 360px;
  font-size: 14px;
  line-height: 20px;
  color: #656565;
}

.ems-empty__extra {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 4px;
}
</style>
