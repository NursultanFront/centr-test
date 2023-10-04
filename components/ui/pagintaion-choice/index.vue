<template>
  <div ref="selectRef" class="wrapper">
    <div class="select"></div>
    <div v-if="isExpanded" class="options"></div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

const isExpanded = ref<boolean>(false);
const selectRef = ref<HTMLDivElement>();

onMounted(() => {
  onClickOutside(selectRef, () => {
    if (!isExpanded) {
      return;
    }

    isExpanded.value = false;
  });
});
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
}
.options {
  position: absolute;
}
</style>
