<template>
  <div class="avatar">
    <img :src="AvatarInfo" alt="Иконка пользователя" />
    <div class="avatar__title">John Doe</div>
  </div>
</template>

<script setup lang="ts">
import AvatarInfo from '@/assets/images/avatar.png';
</script>

<style scoped lang="scss">
.avatar {
  display: flex;
  align-items: center;
  gap: 14px;

  &__title {
    line-height: 22px;
    @include text-style(15px, 500, var(--text-black));
  }
}
</style>
