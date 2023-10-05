<template>
  <div class="aviable-info" :class="{ 'aviable-info--full': isFullAviable }">
    <CheckIcon v-if="isFullAviable" />
    <div class="aviable-info__number">
      <span>{{ props.count }}</span>
      <span>/</span>
      <span>{{ props.max }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckIcon from '@/assets/images/svg/check.svg?component';
interface IProps {
  count: number;
  max: number;
}

const props = defineProps<IProps>();

const isFullAviable = computed(() => {
  return props.count === props.max;
});
</script>

<style scoped lang="scss">
.aviable-info {
  @include padding(4px, 12px);

  display: inline-flex;
  align-items: center;
  gap: 8px;

  border-radius: 6px;
  background: var(--secondary-grey);

  &--full {
    background: #e4f5dd;
    .aviable-info__number {
      line-height: 22px; /* 146.667% */
      @include text-style(15px, 700, var(--secondary-green));
    }
  }

  &__number {
    line-height: 22px;
    @include text-style(15px, 700, var(--text-dark-grey));
  }
}
</style>
