<template>
  <div class="checkbox">
    <div class="checkbox-wrapper" :class="{ 'checkbox-wrapper_checked': modelValue }" @click="onToggle">
      <OkIcon class="checkbox-wrapper__icon" />
    </div>
    <label class="checkbox__label" :for="id">
      <span>
        <slot>{{ props.label }}</slot>
      </span>
      <input
        :id="id"
        ref="checkboxInputRef"
        class="checkbox__input"
        :name="name"
        type="checkbox"
        :value="modelValue"
        :disabled="disabled"
        @change="onChange"
      />
    </label>
  </div>
</template>
<script setup lang="ts">
import OkIcon from '@/assets/images/svg/icons/ok.svg';

interface IProps {
  id: string;
  name: string;
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
}

const checkboxInputRef = ref<HTMLInputElement>();

const props = defineProps<IProps>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();

const onChange = (event: Event) => {
  const element = event.target as HTMLInputElement;
  const isChecked = element.checked;

  emit('update:modelValue', isChecked);
};

const onToggle = () => checkboxInputRef.value?.click();
</script>
<style lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  gap: px-to-rem(16px);
  cursor: pointer;

  &__input {
    display: none;
  }

  &__label {
    cursor: pointer;
  }
}

.checkbox-wrapper {
  width: px-to-rem(24px);
  height: px-to-rem(24px);
  border: 1px solid var(--vkd-gray-900);
  border-radius: px-to-rem(5px);

  @include transition(background-color border-color);

  &:hover {
    background-color: var(--vkd-gray-500);
    border: 1px solid var(--vkd-black-100);
  }

  &_checked {
    .checkbox-wrapper__icon {
      opacity: 1;
    }
  }

  &__icon {
    opacity: 0;
    stroke: var(--vkd-black-900);
    width: px-to-rem(24px);
    height: px-to-rem(24px);

    @include transition(opacity);
  }
}
</style>
