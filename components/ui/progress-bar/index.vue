<template>
  <progress :value="props.modelValue" :max="max"></progress>
</template>

<script setup lang="ts">
interface IProps {
  modelValue: number;
  max?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  max: 10,
});
</script>

<style scoped>
progress {
  width: 100%;
  height: 4px;
  border: none;
  border-radius: 4px;
  overflow: hidden;
  appearance: none;
  background-color: var(--vkd-gray-800);
}

progress::-webkit-progress-bar {
  background-color: var(--vkd-gray-800);
}

progress::-webkit-progress-value {
  background-color: var(--vkd-blue-light);
  border-radius: 4px;
  transition: width 0.3s;
}

progress::-moz-progress-bar {
  background-color: var(--vkd-blue-light);
  border-radius: 4px;
  transition: width 0.3s;
}
</style>
