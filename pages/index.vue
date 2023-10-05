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
    <div class="flex">
      <UiCarDetails />
      <UiCarDetails />
    </div>
    <UiAvatar />
  </div>
</template>

<script setup lang="ts">
import SearchIcon from '@/assets/images/svg/zoom.svg?component';
const inputValue = ref<string>('');
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  gap: 30px;
}
</style>
