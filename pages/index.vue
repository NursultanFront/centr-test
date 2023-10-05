<template>
  <div>
    <UiInput v-model="inputValue">
      <template #right-icon>
        <SearchIcon />
      </template>
    </UiInput>
    <UiPagintaionChoice />
    <UiButton size="medium">Клик</UiButton>
    <UiButton variant="secondary" size="small">Клик</UiButton>
    <UiAvailabilityInfo :count="30" :max="30" />
  </div>
</template>

<script setup lang="ts">
import SearchIcon from '@/assets/images/svg/zoom.svg?component';
const inputValue = ref<string>('');
</script>
