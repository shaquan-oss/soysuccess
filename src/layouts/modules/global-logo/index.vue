<script setup lang="ts">
defineOptions({
  name: 'GlobalLogo'
});

interface Props {
  /** Whether to show the title */
  showTitle?: boolean;
}

withDefaults(defineProps<Props>(), {
  showTitle: true
});
</script>

<template>
  <RouterLink
    to="/"
    class="w-full flex-y-center nowrap-hidden"
    :class="showTitle ? 'justify-start px-16px' : 'justify-center px-8px'"
  >
    <SystemLogo :compact="!showTitle" :class="showTitle ? 'h-28px w-full' : 'size-32px'" />
    <!--
 管理系统标题暂隐藏
    <h2 v-show="showTitle" class="pl-8px text-16px text-primary font-bold transition duration-300 ease-in-out">
      {{ $t('system.title') }}
    </h2>
    -->
  </RouterLink>
</template>

<style scoped></style>
