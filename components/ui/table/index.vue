<template>
  <div class="table-wrapper">
    <div class="table">
      <div class="table-header">
        <UiTableRow>
          <slot name="header" />
        </UiTableRow>
      </div>
      <div class="table-body">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.table-wrapper {
  @include border(1px, var(--vkd-gray-800));
  @include rounded-border(15px);
}

.table {
  display: table;
  width: 100%;
  box-sizing: border-box;
  empty-cells: show;
  border: none;
  border-collapse: collapse;

  @include rounded-border(15px);
}

.table-header {
  display: table-header-group;
  color: var(--vkd-black-main);

  // TODO: theme var
  border-bottom: 1px solid #d9d9d9;

  @include text-style(20px, 700);
}

.table-body {
  display: table-row-group;

  @include text-style(20px, 300);
}
</style>
