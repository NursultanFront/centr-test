<template>
  <button
    :type="props.type"
    class="button"
    :class="`button_${props.variant} button_${props.size}`"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'dark' | 'transparent';
type Size = 'large' | 'medium' | 'small' | 'extra_small' | 'borderless';

interface IProps {
  type?: HTMLButtonElement['type'];
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'button',
  variant: 'primary',
  size: 'medium',
});
</script>
<style lang="scss">
.button {
  border: 0;
  padding: 13.5px 32px;
  transition-property: background-color, color;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;
  font-size: 18px;
  border-radius: 4px;
  font-weight: 800;
}

.button_primary {
  background-color: var(--vkd-turquoise-main);
  color: var(--vkd-white-main);

  &:hover {
    background-color: var(--vkd-turquoise-light);
  }

  &:active {
    background-color: var(--vkd-turquoise-dark);
  }

  &:disabled {
    background-color: var(--vkd-gray-700);
  }
}

.button_secondary {
  background-color: var(--vkd-gray-500);
  color: var(--vkd-blue-light);
  font-weight: 600;

  &:hover {
    background-color: var(--vkd-blue-light);
    color: var(--vkd-white-main);
  }

  &:active {
    background-color: var(--vkd-blue-dark);
    color: var(--vkd-white-main);
  }

  &:disabled {
    background-color: var(--vkd-gray-500);
    color: var(--vkd-gray-800);
  }
}

.button_dark {
  color: var(--vkd-white-main);
  background-color: var(--vkd-black-800);
  font-weight: 600;

  &:hover {
    background-color: var(--vkd-black-600);
  }

  &:active {
    background-color: var(--vkd-black-700);
  }

  &:disabled {
    color: var(--vkd-black-200);
  }
}

.button_transparent {
  color: var(--vkd-turquoise-main);
  background-color: var(--vkd-white-main);
  font-weight: 600;
}

.button_medium {
  font-size: 16px;
  padding: 10.5px 24px;
}

.button_small {
  font-size: 14px;
  padding: 8px 16px;
}

.button_extra-small {
  font-size: 14px;
  padding: 4px 8px;
}

.button_borderless {
  padding: 0;
  font-weight: 700;
}
</style>
