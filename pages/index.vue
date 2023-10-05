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
    <div class="vehicle__bottom-box">
      <div class="vehicle__count">Showing 9 out of 256</div>
      <UiPagination />
    </div>
  </section>
</template>

<script setup lang="ts">
// const { data: apartmentList } = useAsyncData('myApartmentsPromos', () => apartmentStore.getApartmentList());

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

  &__bottom-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
