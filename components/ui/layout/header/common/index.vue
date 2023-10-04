<template>
  <header class="header">
    <div class="header__logo">
      <RouterLink to="/">
        <Logo />
      </RouterLink>
    </div>
    <div v-if="isB2B" class="header-menu">
      <div v-for="item in MenuItemList" :key="item.path" class="header-menu__item" @click="onMenuItemClick(item.path)">
        {{ item.title }}
      </div>
    </div>
    <div class="header-account">
      <template v-if="userStore.isAuthed">
        <UiLayoutHeaderCommonBalance v-if="isB2B" />
        <div v-else class="header-menu">
          <div
            v-for="item in UserMenuItemList"
            :key="item.path"
            class="header-menu__item"
            @click="onMenuItemClick(item.path)"
          >
            {{ item.title }}
          </div>
        </div>

        <UiButton v-if="canCreatePromo" class="header-account__button header-create-ad" @click="openPromoCreationModal">
          <AddIcon class="header-create-ad__icon" /> Создать объявление
        </UiButton>
        <UiButton variant="dark" class="header-account__button header-account__button_notification">
          <NotificationIcon class="header-account__icon" />
        </UiButton>

        <UiLayoutHeaderCommonMenuAccount />
      </template>
      <template v-else>
        <UiButton v-if="isOnSigninPage" variant="dark" size="medium" @click="onAuthButtonClick(AuthButtonPath.Signup)">
          Регистрация
        </UiButton>
        <UiButton v-else variant="dark" size="medium" @click="onAuthButtonClick(AuthButtonPath.Signin)">
          Войти
        </UiButton>
      </template>
      <Promo v-model="isPromoCreationModalVisible" />
    </div>
  </header>
</template>
<script setup lang="ts">
import Logo from '@/assets/images/svg/logo.svg';
import NotificationIcon from '@/assets/images/svg/icons/bell.svg';
import AddIcon from '@/assets/images/svg/icons/plus.svg';
import { useUserStore } from '~/stores';

const MenuItemList = [
  {
    title: 'Поиск',
    path: '/apartments/search',
  },
  {
    title: 'Заказы',
    path: '/profile',
  },
  {
    title: 'Подборка',
    path: '/apartments/collection',
  },
];

const UserMenuItemList = [
  {
    title: 'Избранное',
    path: '/favorites',
  },
];

enum AuthButtonPath {
  Signin = '/signin',
  Signup = '/signup',
}

const isPromoCreationModalVisible = ref<boolean>(false);

const userStore = useUserStore();
const route = useRoute();

const canCreatePromo = computed(() => {
  const isB2BEmployee = userStore.isB2B && userStore.role !== EmployeeType.Director;

  return isB2BEmployee || !userStore.isB2B;
});

const isB2B = computed(() => userStore.isAuthed && userStore.isB2B);

const isOnSigninPage = computed(() => route.matched.find(({ name }) => name === 'signin'));

const onAuthButtonClick = (path: AuthButtonPath) => navigateTo(path);

const onMenuItemClick = (path: string) => navigateTo(path);

const openPromoCreationModal = () => (isPromoCreationModalVisible.value = true);
</script>
<style lang="scss" scoped>
.header {
  background-color: var(--vkd-black-900);
  height: $header-desktop-height;
  display: flex;
  padding: 0 px-to-rem(40px);
  align-items: center;
  gap: px-to-rem(60px);
}

.header-menu {
  flex: 2 0;
  display: flex;
  gap: px-to-rem(28px);
  align-items: center;
  margin-right: 28px;

  &__item {
    color: var(--vkd-gray-900);
    cursor: pointer;

    @include text-style(14px, 500);
  }
}

.header-account {
  margin-left: auto;
  position: relative;
  display: flex;
  align-items: stretch;

  &__avatar {
    width: px-to-rem(32px);
    height: px-to-rem(32px);
    border-radius: 50%;
  }

  &__button {
    display: flex;
    align-items: center;

    @include padding(4px, 8px);

    &_notification {
      margin-left: px-to-rem(28px);
    }
  }

  &__icon {
    width: px-to-rem(24px);
    height: px-to-rem(24px);
  }
}

.header-create-ad {
  display: flex;
  align-items: center;

  &__icon {
    width: px-to-rem(24px);
    height: px-to-rem(24px);
    margin-right: px-to-rem(8px);
  }
}
</style>
