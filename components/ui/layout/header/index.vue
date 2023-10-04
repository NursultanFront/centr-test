<template>
  <UiLayoutHeaderMobile v-if="isMobile" />
  <UiLayoutHeaderCommon v-else />
</template>
<script setup lang="ts">
const { isMobile } = useDevice();
</script>
