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
type Variant = 'primary' | 'secondary';
type Size = 'medium' | 'small';

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
  border-radius: 10px;
  font-weight: 800;
}

.button_primary {
  background-color: var(--primary-red);
  color: #fff;
  box-shadow: 0px 8px 24px 0px rgba(217, 14, 50, 0.12);

  &:hover {
    background-color: #de304e;
  }

  &:disabled {
    background-color: #de304e;
  }
}

.button_secondary {
  border-radius: 6px;
  border: 1px solid var(--text-line-gray);
  background-color: #fff;
}

.button_medium {
  font-size: 14px;
  padding: 12px 50px 12px 16px;
}

.button_small {
  font-size: 12px;
  padding: 9px 18px;
}
</style>
