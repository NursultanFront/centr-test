<template>
  <section class="vehicle">
    <div class="vehicle__top-box">
      <UiInputSearch :page="page" :per-page="perPage" />
      <div class="vehicle__choice">
        <span>Select vehicles per page:</span>
        <UiPagintaionChoice :per-page="perPage" @on-per-page-change="changePerPage" />
      </div>
      <UiButton variant="primary">Add Vechicle</UiButton>
    </div>
    <div class="vehicle__list">
      <template v-for="item in store.cars.data" :key="item.id">
        <UiCarDetails
          v-if="store.cars.data.length > 0"
          :brand="item.brand"
          :count="item.angles_count"
          :image="item.placeholder"
          :model="item.brand"
        />
      </template>
      <h2 v-if="store.cars.data.length === 0" class="">Nothing found</h2>
    </div>
    <div class="vehicle__bottom-box">
      <div class="vehicle__count">Showing {{ showCountCars }} out of {{ store.cars.meta?.total }}</div>
      <UiPagination
        :current-page="store.cars.meta?.current_page"
        :last-page="store.cars.meta?.last_page"
        @on-page-change="changePage"
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

const isPageMore = computed(() => {
  return store.cars.meta?.last_page && store.cars.meta?.current_page
    ? store.cars.meta.current_page > store.cars.meta.last_page
    : false;
});

const showCountCars = computed(() => {
  const perPageNumber = Number(store.cars.meta?.per_page);
  const total = store.cars.meta?.total;

  if (total !== undefined && perPageNumber > total) {
    return total;
  }
  return perPageNumber;
});

useAsyncData('my-cars', () => store.getVehicleData({ page: page.value, perPage: perPage.value }), {
  watch: [page, perPage],
});

watch(
  () => isPageMore.value,
  () => {
    if (isPageMore.value) {
      page.value = 1;
    }
  },
);

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
    gap: 16px;

    line-height: 22px;

    @include text-style(16px, 400, var(--text-black));
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
