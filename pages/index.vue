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
      <div class="vehicle__count">Showing {{ store.cars.meta?.per_page }} out of {{ store.cars.meta?.total }}</div>
      <UiPagination
        :current-page="store.cars.meta?.current_page"
        :last-page="store.cars.meta?.last_page"
        @on-page-change="changePage"
        @on-per-page-change="changePerPage"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCarsStore } from '@/stores/cars';

const store = useCarsStore();

const page = ref<number>(1);
const perPage = ref<number>(9);

const changePage = (value: number) => {
  page.value = value;
};

const changePerPage = (value: number) => {
  perPage.value = value;
};

useAsyncData('my-cars', () => store.getVehicleData({ page: page.value, perPage: perPage.value }), {
  watch: [page],
});

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
