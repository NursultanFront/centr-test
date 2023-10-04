<template>
  <div class="layout">
    <UiLayoutHeader />
    <main class="profile">
      <ProfileSidebar :is-opened="userStore.profile.isMenuVisible" @on-close="onCloseMenu" />
      <div class="profile__content">
        <slot />
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();

const onCloseMenu = () => (userStore.profile.isMenuVisible = false);
</script>
<style lang="scss">
.profile {
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100%;

  @include breakpoint('sm', 'max') {
    display: block;
  }

  &__content {
    @include padding(72px, 150px);

    @include breakpoint('sm', 'max') {
      @include padding(57px);
    }
  }
}
</style>
