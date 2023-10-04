<template>
  <div ref="popoverBoxRef" class="header-account-menu-wrapper">
    <UiButton variant="dark" class="header-account-summary" @click="onToggleMenu">
      <img class="header-account-summary__avatar" :src="userStore.avatar" />
      <DownIcon class="header-account-summary__down-icon" />
    </UiButton>
    <div class="account-menu" :class="{ 'account-menu_visible': isMenuVisible }">
      <div class="user-info">
        <img class="user-info__avatar" :src="userStore.avatar" />
        <div class="user-info-details">
          <div class="user-info-details__name">
            {{ userFullname }}
          </div>
          <div v-if="userStore.isB2B" class="user-info-details__role">
            {{ convertEnumKeyToValue('employee_type', userStore.role) }}
          </div>
        </div>
      </div>
      <div class="header-account-menu">
        <div
          v-for="item in AccountMenuItemList"
          :key="item.title"
          class="header-account-menu__item"
          @click="item?.onClick"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import DownIcon from '@/assets/images/svg/icons/chevron-down.svg';
import { useUserStore } from '~/stores/user';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const userStore = useUserStore();
const { convertEnumKeyToValue } = useFormat();

const AccountMenuItemList = computed(() => {
  const menuItemList = [
    {
      title: 'Личные данные',
      onClick: async () => await navigateTo('/profile'),
    },
    {
      title: 'Помощь',
    },
    {
      title: 'Выйти',
      onClick: () => {
        authStore.logout();
      },
    },
  ];

  if (userStore.isB2B) {
    menuItemList.unshift({
      title: 'Настройки компании',
      onClick: async () => await navigateTo('/profile/company'),
    });
  }

  return menuItemList;
});

const popoverBoxRef = ref<HTMLDivElement>();
const isMenuVisible = ref<boolean>(false);

const userFullname = computed(() => `${userStore.user?.first_name} ${userStore.user?.last_name}`);

onClickOutside(popoverBoxRef, () => (isMenuVisible.value = false));

const onToggleMenu = () => (isMenuVisible.value = !isMenuVisible.value);
</script>
<style lang="scss" scoped>
.account-menu {
  position: absolute;
  background: var(--vkd-black-800);
  right: 0;
  top: calc(100% + 4px);
  max-width: px-to-rem(300px);
  pointer-events: none;
  opacity: 0;
  min-width: px-to-rem(230px);
  z-index: 30;

  @include padding(10px, 16px);
  @include rounded-border;
  @include transition(opacity);

  &__user-info {
    display: flex;
    gap: px-to-rem(15px);
    align-items: center;
    margin-bottom: px-to-rem(20px);
  }

  &_visible {
    opacity: 1;
    pointer-events: all;
  }
}

.user-info-details {
  &__name {
    color: var(--vkd-white-main);

    @include text-style(16px, 600);
  }

  &__role {
    color: var(--vkd-white-main);

    @include text-style(11px, 300);
  }
}

.header-account-menu {
  display: flex;
  flex-direction: column;
  gap: px-to-rem(6px);

  &__item {
    cursor: pointer;
    background-color: var(--vkd-black-900);
    color: var(--vkd-gray-500);

    @include padding(10px, 20px);
    @include rounded-border;
  }
}

.user-info {
  display: flex;
  gap: px-to-rem(15px);
  align-items: center;
  margin-bottom: px-to-rem(20px);

  &__avatar {
    width: px-to-rem(32px);
    height: px-to-rem(32px);
    border-radius: 50%;
  }
}

.header-avatar-button {
  align-items: center;
  margin-left: px-to-rem(10px);

  &__image {
    width: px-to-rem(32px);
    height: px-to-rem(32px);
    border-radius: 50%;
  }

  &__down-icon {
    width: px-to-rem(24px);
    height: px-to-rem(24px);
    margin-left: px-to-rem(6px);
    stroke: var(--vkd-gray-900);
  }
}

.header-account-summary {
  display: flex;
  align-items: center;
  display: block;
  margin-left: px-to-rem(10px);

  @include padding(4px, 8px);

  &__avatar {
    width: px-to-rem(32px);
    height: px-to-rem(32px);
    border-radius: 50%;
  }

  &__down-icon {
    width: px-to-rem(24px);
    height: px-to-rem(24px);
    margin-left: px-to-rem(6px);
    stroke: $gray-900;
  }
}
</style>
