<template>
  <label class="radio-button-wrapper">
    <div
      class="radio-button"
      :class="{
        'radio-button_checked': isChecked,
        'radio-button_disabled': props.disabled,
      }"
    >
      <div class="radio-button__circle">&nbsp;</div>
    </div>
    <slot>
      <div v-if="label && label.length > 0">{{ props.label }}</div>
    </slot>
    <input
      ref="checkboxRef"
      :name="props.name"
      :checked="props.modelValue"
      class="radio-button__checkbox"
      type="checkbox"
      :disabled="props.disabled"
      @change="onChange"
    />
  </label>
</template>
<script setup lang="ts">
interface IProps {
  name?: string;
  modelValue: boolean;
  disabled?: boolean;
  label?: string;
}

const checkboxRef = ref<HTMLInputElement>();

const props = defineProps<IProps>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();

const isChecked = computed(() => props.modelValue);

const onChange = (event: Event) => {
  const element = event.target as HTMLInputElement;
  const value = element.checked;

  emit('update:modelValue', value);
};
</script>
<style lang="scss" scoped>
.radio-button-wrapper {
  display: flex;
  align-items: center;
  gap: px-to-rem(20px);
}

.radio-button {
  border: 1px solid var(--vkd-gray-900);
  padding: px-to-rem(4px);
  min-width: px-to-rem(40px);
  width: px-to-rem(40px);
  cursor: pointer;

  @include transition(border-color);
  @include rounded-border(16px);

  &__circle {
    border-radius: 50%;
    background-color: var(--vkd-gray-900);
    width: px-to-rem(16px);
    height: px-to-rem(16px);
    margin-left: 0;

    @include transition(margin-left);
  }

  &__checkbox {
    display: none;
  }

  &_checked {
    border-color: var(--vkd-green-main);

    .radio-button__circle {
      background-color: var(--vkd-green-main);
      margin-left: calc(100% - px-to-rem(16px));
    }
  }

  &_disabled {
    background-color: var(--vkd-gray-500) !important;
  }
}

@keyframes slide {
  0% {
    margin-left: 0;
  }

  50% {
    margin-left: 50%;
  }

  100% {
    margin-left: auto;
  }
}
</style>
