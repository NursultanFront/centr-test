<template>
  <div class="header-balance-wrapper">
    <div class="header-balance">
      <div class="header-balance-info">
        <div class="header-balance-info-item">
          <div class="header-balance-info-item__title">Баланс:</div>
          <div class="header-balance-info-item__value">{{ balance }}</div>
        </div>
        <div class="header-balance-info-item header-balance-info-item_dark">
          <div class="header-balance-info-item__title">В буфере:</div>
          <div class="header-balance-info-item__value">{{ companyBalance }}</div>
        </div>
      </div>
      <div class="header-balance-add">
        <UiButton variant="dark" @click="topupBalance">Пополнить</UiButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCompanyStore, useUserStore } from '~/stores';

const userStore = useUserStore();
const companyStore = useCompanyStore();
const { formatCurrency } = useFormat();

const balance = computed(() => formatCurrency(userStore.balance));
const companyBalance = computed(() => formatCurrency(companyStore.balance));

const topupBalance = async () => await navigateTo('/profile/payment');
</script>
<style lang="scss" scoped>
.header-balance-wrapper {
  cursor: pointer;
  position: relative;
  margin-right: 15px;

  &:hover {
    .header-balance-add {
      display: block;
    }
  }
}

.header-balance {
  position: absolute;
  background-color: $black-900;
  transform: translateX(-100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;

  &:hover {
    margin-top: -10px;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.13);
    transform: translateX(calc(-100% + 20px));

    @include padding(10px, 20px);

    @include rounded-border(7px);
  }
}

.header-balance-info-item {
  display: flex;

  @include text-style(16px, 500, $white-main);
  @include gap(15px);

  &__value {
    text-decoration: underline;
    font-weight: 700;
  }

  &_dark {
    text-decoration: none;

    @include text-style(12px, 500, $black-500);

    .header-balance-info-item__value {
      text-decoration: none !important;
      font-weight: 500;
    }
  }
}

.header-balance-add {
  display: none;
  margin: px-to-rem(20px) 0;

  &:hover {
    display: block;
  }
}
</style>
