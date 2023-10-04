<template>
  <div class="input-box">
    <label v-if="shouldShowLabel" :id="props.id" class="label">{{ props.label }}</label>
    <div
      class="input-wrapper"
      :class="{
        'input-wrapper_disabled': disabled,
        [`input-wrapper_${variant}`]: variant,
        'input-wrapper_success': isInputValidated,
        'input-wrapper_error': hasError,
      }"
    >
      <slot name="left-icon" />
      <input
        :id="props.id"
        :value="input"
        :name="name"
        :type="calculatedInputType"
        class="input"
        :placeholder="placeholder"
        :disabled="disabled"
        :minlength="minLength"
        :maxlength="maxLength"
        @change="onChange"
        @input="onInput"
        @focusin="(e) => emit('focusin', e)"
        @focusout="(e) => emit('focusout', e)"
        @blur="(e) => emit('blur', e)"
      />
      <slot v-if="!rightIconDisabled" name="right-icon">
        <template v-if="isTogglePasswordIconVisible">
          <EyeIcon
            v-if="isPasswordVisible"
            class="input__right-icon input__right-icon_clear"
            @click="onTogglePasswordVisibility"
          />
          <EyeIcon v-else class="input__right-icon input__right-icon_clear" @click="onTogglePasswordVisibility" />
        </template>
        <RemoveIcon
          v-else-if="isCleanIconVisible"
          width="24"
          height="24"
          class="input__right-icon input__right-icon_clear"
          @click="onClear"
        />
      </slot>
    </div>
    <slot name="tip">
      <div
        v-if="isTipTextVisible"
        class="input-box__tip text-3"
        :class="{
          [`input-box__tip_${variant}`]: variant,
          'input-box__tip_error': hasError,
        }"
      >
        {{ tipTextForInput }}
      </div>
    </slot>
  </div>
</template>
<script setup lang="ts">
import { Mask } from 'maska';

import EyeIcon from '@/assets/images/svg/eye.svg?component';

type InputVariant = 'default' | 'warning';
type InputType = 'text' | 'password' | 'email' | 'tel';

export interface IProps {
  id?: string;
  name?: string;
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  // TODO: deprecated
  variant?: InputVariant;
  minLength?: number;
  maxLength?: number;
  rightIconDisabled?: boolean;
  tipText?: string;
  errorText?: string;
  isLoading?: boolean;
  type?: InputType;
  isValidated?: boolean;
  mask?: string;
  label?: string;
  modelModifiers?: {
    lazy?: boolean;
  };
}

export interface IChangedEvent {
  masked: string;
  unmasked: string;
  completed: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  disabled: false,
  variant: 'default',
  modelValue: '',
  modelModifiers: () => ({
    lazy: false,
  }),
});
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
  (event: 'focusin', value: Event): void;
  (event: 'focusout', value: Event): void;
  (event: 'onChange', value: IChangedEvent): void;
  (event: 'blur', value: Event): void;
}>();

const isPasswordVisible = ref(false);
const maskInstance = ref<Mask>(
  new Mask({
    mask: props.mask,
  }),
);

const input = computed<string>({
  get() {
    return maskInstance.value.masked(props.modelValue ?? '');
  },
  set(value: string) {
    emit('update:modelValue', maskInstance.value.unmasked(value));
  },
});

const isInputValidated = computed(() => input.value.length > 0 && props.isValidated);

const isCleanIconVisible = computed(() => input.value.length > 0);
const isTogglePasswordIconVisible = computed(() => props.type === 'password' && input.value.length > 0);
const calculatedInputType = computed(() =>
  props.type === 'password' && isPasswordVisible.value ? 'text' : props.type,
);
const hasError = computed(() => props.errorText && props.errorText.length > 0);
const isTipTextVisible = computed(() => {
  const hasTip = props.tipText && props.tipText.length > 0;

  return hasError.value || hasTip;
});
const tipTextForInput = computed(() => (hasError.value ? props.errorText : props.tipText ?? null));
const shouldShowLabel = computed(() => props.label && props.label.length > 0);

const onClear = () => (input.value = '');
const onTogglePasswordVisibility = () => (isPasswordVisible.value = !isPasswordVisible.value);

const handleChangeEvent = (event: Event) => {
  const element = event.target as HTMLInputElement;
  const value = element.value;

  input.value = value;
};

const onInput = (event: Event) => !props.modelModifiers.lazy && handleChangeEvent(event);
const onChange = (event: Event) => props.modelModifiers.lazy && handleChangeEvent(event);
</script>
<style lang="scss">
.input-box {
  &__tip {
    margin-top: px-to-rem(8px);
    color: var(--vkd-black-100);

    &_error {
      color: var(--vkd-pink-main);
    }

    &_warning {
      color: var(--vkd-orange-main);
    }
  }
}

.input-wrapper {
  display: flex;
  align-items: center;
  color: var(--vkd-black-900);
  padding: 7px 16px 7px 16px;
  font-size: 18px;
  font-weight: 500;
  position: relative;
  background-color: $white-main;

  @include transition(color border-color);
  @include border(1px, var(--text-line-gray));
  @include rounded-border(10px);

  &:focus-within {
    border-color: var(--secondary-blue);
  }

  &_error {
    border-color: var(--vkd-pink-main);
  }

  &_warning {
    border-color: var(--vkd-orange-main);
  }

  &_success {
    border-color: var(--vkd-green-main);
  }

  &_disabled {
    background-color: var(--vkd-gray-400);
    @include border(1px, var(--vkd-gray-800));

    .input {
      background-color: transparent;
      color: var(--vkd-gray-900);
    }
  }
}

.input {
  border: 0;
  outline: none;
  width: 100%;

  color: var(--vkd-black-900);
  font-size: px-to-rem(18px);
  font-weight: 500;
  text-align: inherit;

  &::placeholder {
    color: var(--vkd-black-100);
  }

  &__right-icon {
    position: absolute;
    right: px-to-rem(8px);
    width: px-to-rem(24px);

    &_clear {
      color: var(--vkd-black-100);
    }

    &_success {
      color: var(--vkd-green-main);
    }
  }
}

.label {
  display: block;
  color: var(--vkd-black-100);
  margin-bottom: px-to-rem(8px);

  @include text-style(14px, 500);
}
</style>
