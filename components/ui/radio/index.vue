<template>
  <label class="radio">
    <div class="radio-point">
      <div class="radio-point__circle" :class="{ 'radio-point__circle_filled': isChecked }" />
    </div>
    <slot>
      <div v-if="props.label && props.label.length > 0" class="radio__label">{{ props.label }}</div>
    </slot>
    <input
      :checked="isChecked"
      :name="name"
      type="radio"
      class="radio__input"
      :disabled="disabled"
      @change="onChange"
    />
  </label>
</template>
<script setup lang="ts">
interface IProps {
  name: string;
  label?: string;
  value: string | number;
  disabled?: boolean;
}

const props = defineProps<IProps>();
const modelValue = defineModel<string | number>({
  required: false,
});

const isChecked = computed(() => modelValue.value === props.value);

const onChange = () => (modelValue.value = props.value);
</script>
<style lang="scss">
.radio {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: px-to-rem(16px);

  &__input {
    display: none;
  }

  &__label {
    cursor: pointer;
  }

  &:hover {
    .radio-point {
      background-color: var(--vkd-gray-500);
    }
  }

  &-point {
    height: px-to-rem(24px);
    width: px-to-rem(24px);
    border: 1px solid var(--vkd-gray-900);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    @include transition(background-color);

    &__circle {
      background-color: transparent;
      width: calc(100% * 0.6);
      height: calc(100% * 0.6);
      border-radius: 50%;

      @include transition(background-color);

      &_filled {
        background-color: var(--vkd-black-900);
      }
    }
  }
}
</style>
