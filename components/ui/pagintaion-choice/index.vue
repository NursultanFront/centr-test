<template>
  <div ref="selectRef" class="wrapper">
    <div class="select" @click="onToggleOptionListVisibility">
      <div>{{ props.perPage }}</div>
      <ArrowDowm class="select__arrow-icon" :class="{ 'select__arrow-icon_up': isExpanded }" />
    </div>
    <div v-if="isExpanded" class="options">
      <div v-for="item in perPageList" :key="item" class="options__item" @click="onChangeValue(item)">{{ item }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import ArrowDowm from '@/assets/images/svg/chevron_down.svg?component';

interface IProps {
  perPage: number;
}

const props = defineProps<IProps>();

const perPageList = [9, 12, 15];

const emit = defineEmits<{
  (event: 'onPerPageChange', perPage: number): void;
}>();

const isExpanded = ref<boolean>(false);
const selectRef = ref<HTMLDivElement>();

onMounted(() => {
  onClickOutside(selectRef, () => {
    if (!isExpanded) {
      return;
    }

    isExpanded.value = false;
  });
});

const onToggleOptionListVisibility = () => (isExpanded.value = !isExpanded.value);

const onChangeValue = (value: number) => {
  emit('onPerPageChange', value);
  isExpanded.value = false;
};
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  width: 85px;
  height: 42px;
}

.select {
  @include padding(9px, 16px);
  display: flex;
  align-items: center;
  gap: px-to-rem(16px);

  @include rounded-border(8px);
  border: 1px solid var(--text-line-gray, #e4e4e4);

  &__arrow-icon {
    margin-left: auto;
    width: px-to-rem(24px);
    height: px-to-rem(24px);
    stroke: var(--vkd-black-900);

    @include transition(transform);

    &_up {
      transform: rotate(180deg);
    }
  }
}
.options {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 3;

  display: flex;

  flex-direction: column;
  gap: px-to-rem(10px);

  @include rounded-border(8px);
  border: 1px solid var(--text-line-gray, #e4e4e4);

  background-color: #fff;

  min-height: fit-content;
  max-height: px-to-rem(250px);
  overflow: auto;
  content-visibility: auto;

  &__item {
    @include padding(9px, 16px);
    cursor: pointer;
    text-align: center;

    & + & {
      border-top: 1px solid var(--text-line-gray);
    }
  }
}
</style>
