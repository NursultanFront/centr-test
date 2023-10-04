<template>
  <div ref="selectRef" class="wrapper">
    <div class="select" :class="{ select_expanded: isExpanded }" @click="onToggleOptionListVisibility">
      <slot
        :item="selectedOption"
        :placeholder="placeholder"
        :value="value"
        :is-selected="isChoosenOption"
        name="selected"
      >
        <div class="select__choosen-option" :class="{ 'select__choosen-option_placeholder': !isChoosenOption }">
          {{ value }}
        </div>
      </slot>
      <ArrowIcon class="select__arrow-icon" :class="{ 'select__arrow-icon_up': isExpanded }" />
    </div>
    <div v-if="isExpanded" class="options">
      <slot name="options" :items="props.items">
        <div
          v-for="(item, index) in props.items"
          :key="item.value"
          class="option"
          :class="{ option_even: index % 2 === 0 }"
          @click="onChooseOption(item)"
        >
          <div class="option__text">{{ item.title }}</div>
          <div v-if="item.placeholder" class="option__placeholder">{{ item.placeholder }}</div>
        </div>
      </slot>
    </div>
    <div v-if="hasError" class="error">{{ props.error }}</div>
  </div>
</template>
<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import ArrowIcon from '@/assets/images/svg/icons/chevron-down.svg';

export interface IItem {
  title: string;
  value: string;
  placeholder?: string | null;
}

interface IProps {
  items?: IItem[];
  placeholder?: string;
  modelValue?: string;
  error?: string;
}

const selectRef = ref<HTMLDivElement>();
const selectedOption = ref<IItem>();
const isExpanded = ref<boolean>(false);

const props = defineProps<IProps>();
const emit = defineEmits<{
  (event: 'onSelected', item: IItem): void;
  (event: 'update:modelValue', value: string): void;
}>();

onMounted(() => {
  onClickOutside(selectRef, () => {
    if (!isExpanded) {
      return;
    }

    isExpanded.value = false;
  });
});

const value = computed(() => selectedOption.value?.title ?? props.placeholder);

const isChoosenOption = computed(() => selectedOption.value);

watch(
  () => props.modelValue,
  (value?: string) => {
    // если значение было предустановлено, выбираем подходящий вариант из списка опций

    if (!value || (value && value.length === 0)) return;

    const itemInfo = props.items?.find((item) => item.value === value);

    // если ничего не нашлось, то плейсхолдер заменит пустое значение
    if (!itemInfo) return;

    selectedOption.value = itemInfo;
  },
);

const onToggleOptionListVisibility = () => (isExpanded.value = !isExpanded.value);

const onChooseOption = (option: IItem) => {
  selectedOption.value = option;

  isExpanded.value = false;

  emit('onSelected', option);
  emit('update:modelValue', option.value);
};

const hasError = computed(() => typeof props.error === 'string' && props.error.length > 0);
</script>
<style lang="scss" scoped>
.wrapper {
  position: relative;
}

.select {
  display: flex;
  height: 100%;
  max-height: 28px;
  color: var(--vkd-black-900);
  align-items: center;
  font-size: px-to-rem(18px);

  @include transition(border-radius);
  @include border(1px, var(--vkd-gray-900));
  @include padding(7px, 16px);
  @include rounded-border;

  &_expanded {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &__choosen-option {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &_placeholder {
      color: var(--vkd-black-100);
    }
  }

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

  @include border(1px, var(--vkd-gray-900));

  border-top: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: var(--vkd-white-main);

  min-height: px-to-rem(120px);
  max-height: px-to-rem(250px);
  overflow: auto;
  content-visibility: auto;
}

.option {
  color: var(--vkd-black-900);
  cursor: pointer;
  background-color: var(--vkd-white-main);

  @include padding(8px);

  &__placeholder {
    color: var(--vkd-black-500);

    @include text-style(14px);
  }

  &_even {
    background-color: var(--vkd-gray-500);
  }
}

.error {
  margin-top: px-to-rem(8px);
  color: var(--vkd-pink-main);
}
</style>
