<template>
  <UiInput v-model="search" placeholder="Search VIN" class="vehicle__input">
    <template #right-icon>
      <ZoomIcon />
    </template>
  </UiInput>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { useCarsStore } from '@/stores/cars';
import ZoomIcon from '@/assets/images/svg/zoom.svg?component';

interface IProps {
  page: number;
  perPage: number;
}

const props = defineProps<IProps>();

const store = useCarsStore();

const search = ref<string>('');

const fetchCars = async (value: string) => {
  await store.getSerachCars({ page: props.page, perPage: props.perPage, search: value });
};

watch(search, useDebounceFn(fetchCars, 750));
</script>

<style scoped lang="scss"></style>
