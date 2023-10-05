<template>
  <section>
    <h1>There is nothing here</h1>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'Settings',
});

definePageMeta({
  layout: 'default',
});
</script>

<style scoped lang="scss">
section {
  @include padding(36px, 30px, 45px, 30px);
}
</style>
