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
}
</style>
