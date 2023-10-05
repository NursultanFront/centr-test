<template>
  <div class="layout">
    <Sidebar />
    <div class="layout__content">
      <UiLayoutHeader />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout {
  display: flex;

  &__content {
    flex-grow: 1;
  }
}
</style>
