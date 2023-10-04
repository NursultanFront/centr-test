<template>
  <header class="header">
    <div class="menu">
      <div class="menu-item">
        <SearchIcon class="menu-item__icon" />
        <span>Поиск</span>
      </div>
      <div class="menu-item">
        <CartIcon class="menu-item__icon" />
        <span>Заказы</span>
      </div>
      <div class="menu-item">
        <ListIcon class="menu-item__icon" />
        <span>Подборка</span>
      </div>
      <div class="menu-item menu-item_active">
        <ProfileIcon class="menu-item__icon" />
        <span>Профиль</span>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import CartIcon from '@/assets/images/svg/icons/menu/cart.svg';
import SearchIcon from '@/assets/images/svg/icons/menu/search.svg';
import ListIcon from '@/assets/images/svg/icons/menu/dashboard.svg';
import ProfileIcon from '@/assets/images/svg/icons/menu/person.svg';
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--vkd-black-900);
  height: 70px;
  z-index: 5;
}

.menu {
  display: flex;
  align-items: center;
  height: 100%;
}

.menu-item {
  flex: 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--vkd-black-200);

  &__icon {
    width: px-to-rem(28px);
    height: px-to-rem(28px);
  }

  &_active {
    color: #4ba5b0;
  }
}
</style>
