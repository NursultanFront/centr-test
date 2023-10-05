<template>
  <div class="pagination">
    <div class="navigation">
      <button class="pagination__button" variant="secondary" :disabled="isFirstPage" @click="goBack">
        <ArrowLeftIcon class="navigation__icon" />
      </button>
      <div class="page">
        <div class="page__number">{{ props.currentPage }}</div>
        <div class="page__separator">of</div>
        <div class="page__number">{{ props.lastPage }}</div>
      </div>
      <button class="pagination__button" variant="secondary" :disabled="isLastPage" @click="goForward">
        <ArrowRightIcon class="navigation__icon" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import ArrowLeftIcon from '@/assets/images/svg/chevron_left.svg?component';
import ArrowRightIcon from '@/assets/images/svg/chevron_right.svg?component';
interface IProps {
  currentPage: number;
  lastPage: number;
}

const props = withDefaults(defineProps<IProps>(), {
  currentPage: 1,
  lastPage: 1,
});
const emit = defineEmits<{
  (event: 'onPageChange', page: number): void;
}>();

const goForward = () => emit('onPageChange', props.currentPage + 1);
const goBack = () => emit('onPageChange', props.currentPage - 1);

const isFirstPage = computed(() => props.currentPage === 1);
const isLastPage = computed(() => props.currentPage === props.lastPage);
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: px-to-rem(12px);

  &__button {
    padding: 0;

    background: transparent;
    border: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}

.per-page {
  display: flex;
  align-items: center;
  gap: px-to-rem(25px);

  &__label {
    @include text-style(20px, 300);
  }

  &__variants {
    display: flex;
    gap: px-to-rem(10px);
  }
}

.navigation {
  display: flex;
  align-items: center;
  gap: px-to-rem(12px);

  &__icon {
    width: px-to-rem(24px);
    height: px-to-rem(24px);

    &_right {
      transform: rotate(180deg);
    }
  }
}

.page {
  display: flex;
  align-items: center;
  gap: px-to-rem(12px);

  &__separator {
    color: var(--text-dark-grey, rgba(41, 49, 72, 0.8));
    text-align: center;
    font-family: DM Sans;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 184.615% */
  }
  &__number {
    @include padding(5px, 6px);

    @include border(1px, var(--text-line-gray));
    @include rounded-border(6px);
    text-align: center;

    min-width: 32px;
    height: 32px;

    @include text-style(15px, 400, var(--text-dark-grey));
  }
}
</style>
