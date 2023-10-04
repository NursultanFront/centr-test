<template>
  <div>
    <UiInput v-model="inputValue">
      <template #right-icon>
        <SearchIcon />
      </template>
    </UiInput>
    <UiPagintaionChoice />
  </div>
</template>

<script setup lang="ts">
import SearchIcon from '@/assets/images/svg/zoom.svg?component';
const inputValue = ref<string>('');
</script>
