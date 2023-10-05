<template>
  <div class="aside">
    <h2 class="aside__title">Demo Test</h2>
    <div class="aside__nav">
      <NuxtLink v-for="item in userMenuItemList" :key="item.path" :to="item.path">
        <div class="aside__item" :class="{ 'aside__item--selected': isSelected(item.path) }">
          <component :is="item.icon" />
          <span>{{ item.title }}</span>
        </div>
      </NuxtLink>
    </div>

    <img :src="BackAside" alt="Какой то прикольный рисунок" class="aside__img" />
  </div>
</template>

<script setup lang="ts">
import { userMenuItemList } from './menu';
import BackAside from '@/assets/images/aside-back.png';
const route = useRoute();
const isSelected = (path: string) => route.path === path;
</script>

<style scoped lang="scss">
.aside {
  position: relative;
  @include padding(30px, 0);
  height: 100%;
  background: var(--primary-dark);

  &__title {
    margin-bottom: 102px;
    text-align: center;
    @include text-style(24px, 700, #fff);
  }
  &__nav {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__item {
    @include padding(12px, 30px);

    display: flex;
    align-items: center;
    gap: 20px;

    line-height: 20px;

    cursor: pointer;

    @include text-style(16px, 500, var(--text-white-45));

    &--selected {
      @include text-style(16px, 500, #fff);
      background: var(--text-white-20);
    }
  }

  &__img {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
