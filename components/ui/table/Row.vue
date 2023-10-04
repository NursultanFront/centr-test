<template>
  <div class="table-row">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.table-row {
  display: table-row;

  // TODO: theme var
  border-bottom: 1px solid #d9d9d9;

  &:last-child {
    border: none;
  }
}
</style>
