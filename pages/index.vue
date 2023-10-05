<template>
  <section class="vehicle">
    <div class="vehicle__top-box">
      <UiInput placeholder="Search VIN" class="vehicle__input"></UiInput>
      <div class="vehicle__choice">
        <span>Select vehicles per page:</span>
        <UiPagintaionChoice />
      </div>
      <UiButton variant="primary">Add Vechicle</UiButton>
    </div>
    <div class="vehicle__list">
      <UiCarDetails
        v-for="item in store.cars.data"
        :key="item.id"
        :brand="item.brand"
        :count="item.angles_count"
        :image="item.placeholder"
        :model="item.brand"
      />
    </div>
    <div class="vehicle__bottom-box">
      <div class="vehicle__count">Showing 9 out of 256</div>
      <UiPagination />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCarsStore } from '@/stores/cars';

const store = useCarsStore();

useAsyncData('my-cars', () => store.getVehicleData({ page: 1, perPage: 9 }));

useHead({
  title: 'Vehcile',
});

definePageMeta({
  layout: 'default',
});
</script>

<style scoped lang="scss">
.vehicle {
  @include padding(36px, 30px, 45px, 30px);

  display: flex;
  flex-direction: column;
  gap: 35px;

  &__top-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  &__choice {
    display: flex;
    align-items: center;
  }

  &__input {
    width: 322px;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }

  &__bottom-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
