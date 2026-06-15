<script setup lang="ts">
import { computed, onUnmounted, watch } from 'vue';

defineOptions({ name: 'EmsOverlay' });

const props = withDefaults(
  defineProps<{
    /** 是否显示遮罩 */
    show?: boolean;
    /** 遮罩内 loading 文案 */
    tip?: string;
    /** true: 固定全屏；false: 覆盖最近 relative 父级 */
    fullscreen?: boolean;
    /** 是否显示半透明背景 */
    mask?: boolean;
    zIndex?: number;
    loadingSize?: 'sm' | 'md' | 'lg';
  }>(),
  {
    show: false,
    fullscreen: false,
    mask: true,
    zIndex: 1000,
    loadingSize: 'md'
  }
);

const overlayClass = computed(() => ({
  'ems-overlay--fullscreen': props.fullscreen,
  'ems-overlay--mask': props.mask
}));

function lockBodyScroll() {
  if (props.fullscreen && props.show) {
    document.body.style.overflow = 'hidden';
  }
}

function unlockBodyScroll() {
  if (props.fullscreen) {
    document.body.style.overflow = '';
  }
}

watch(
  () => props.show,
  visible => {
    if (!props.fullscreen) return;
    if (visible) lockBodyScroll();
    else unlockBodyScroll();
  },
  { immediate: true }
);

onUnmounted(unlockBodyScroll);
</script>

<template>
  <Transition name="ems-overlay-fade">
    <div
      v-if="show"
      class="ems-overlay"
      :class="overlayClass"
      :style="{ zIndex }"
      role="presentation"
      aria-hidden="true"
    >
      <EmsLoading :show="true" :tip="tip" :size="loadingSize" />
    </div>
  </Transition>
</template>

<style scoped>
.ems-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ems-overlay--fullscreen {
  position: fixed;
}

.ems-overlay--mask {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(1px);
}

.ems-overlay-fade-enter-active,
.ems-overlay-fade-leave-active {
  transition: opacity 0.2s ease;
}

.ems-overlay-fade-enter-from,
.ems-overlay-fade-leave-to {
  opacity: 0;
}
</style>
