<template>
  <div class="table-cell">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.table-cell {
  display: table-cell;
  text-align: left;

  @include padding(20px, 30px);

  &:nth-child(even) {
    // TODO: theme var
    background-color: #eef6f7;
  }
}
</style>
