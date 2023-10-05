<template>
  <header class="header">
    <div class="header__box">
      <div class="header__name">{{ headerText }}</div>
      <div v-if="isVehiclePage" class="header__count">256</div>
    </div>
    <div class="header__content">
      <UiButton variant="secondary" size="square">
        <PlusIcon />
      </UiButton>
      <UiAvatar />
      <UiChoiceLang />
    </div>
  </header>
</template>

<script setup lang="ts">
import PlusIcon from '@/assets/images/svg/plus.svg?component';
const route = useRoute();

const headerTextMappings = {
  index: 'Vehicles',
  profile: 'Profile',
  setting: 'Settings',
};

const headerText = computed(() => {
  const routeName = route.name as keyof typeof headerTextMappings;
  return headerTextMappings[routeName] || 'Default Header Text';
});

const isVehiclePage = computed(() => {
  const routeName = route.name as keyof typeof headerTextMappings;
  return routeName === 'index';
});
</script>

<style scoped lang="scss">
.header {
  @include padding(30px);
  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid #e4e4e4;

  &__box {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  &__name {
    line-height: 38px;
    @include text-style(32px, 700, var(--text-black));
  }

  &__count {
    @include padding(4px, 14px);
    background: var(--primary-light-grey);
    @include rounded-border(6px);

    text-align: center;
    line-height: 22px;

    @include text-style(15px, 700, var(--text-dark-grey));
  }

  &__content {
    display: flex;

    align-items: center;
    gap: 35px;
  }
}
</style>
