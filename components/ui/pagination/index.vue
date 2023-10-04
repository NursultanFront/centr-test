<template>
  <div class="pagination">
    <div class="navigation">
      <UiButton class="pagination__button" variant="secondary" :disabled="isFirstPage" @click="goBack">
        <ArrowLeftIcon class="navigation__icon" />
      </UiButton>
      <div class="page-list">
        <UiButton
          v-for="page in pageList"
          :key="page"
          class="pagination__button"
          :variant="getPageVariant(page)"
          @click="changePage(page)"
          >{{ page }}</UiButton
        >
      </div>
      <UiButton class="pagination__button" variant="secondary" :disabled="isLastPage" @click="goForward">
        <ArrowLeftIcon class="navigation__icon navigation__icon_right" />
      </UiButton>
    </div>
    <div class="per-page">
      <div class="per-page__label">Показать на странице:</div>
      <div class="per-page__variants">
        <UiButton
          v-for="option in props.perPageList"
          :key="option"
          class="pagination__button per-page__item"
          :variant="getPerPageVariant(option)"
          @click="changePerPage(option)"
          >{{ option }}</UiButton
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import ArrowLeftIcon from '@/assets/images/svg/icons/chevron-left.svg';

const PerPage: number[] = [10, 50, 100];
</script>
<script setup lang="ts">
interface IProps {
  perPageList?: number[];
  currentPage: number;
  perPage?: number;
  lastPage: number;
}

const props = withDefaults(defineProps<IProps>(), {
  perPageList: () => PerPage,
  perPage: 10,
  currentPage: 1,
  lastPage: 1,
});
const emit = defineEmits<{
  (event: 'onPerPageChange', perPage: number): void;
  (event: 'onPageChange', page: number): void;
  (event: 'onChange', page: number, perPage: number): void;
}>();

const changePerPage = (perPage: number) => {
  // TODO: deprecated, use onChange event
  emit('onPerPageChange', perPage);

  emit('onChange', 1, perPage);
};
const changePage = (page: number) => {
  // TODO: deprecated, use onChange event
  emit('onPageChange', page);

  emit('onChange', page, props.perPage);
};

const goForward = () => emit('onPageChange', props.currentPage + 1);
const goBack = () => emit('onPageChange', props.currentPage - 1);

const getPerPageVariant = (perPage: number) => {
  const isSelected = props.perPage === perPage;

  return isSelected ? 'primary' : 'secondary';
};

const getPageVariant = (page: number) => {
  const isSelected = props.currentPage === page;

  return isSelected ? 'primary' : 'secondary';
};

const pageList = computed(() => {
  const currentPage = props.currentPage;
  const lastPage = props.lastPage;

  const pages = new Array(lastPage).fill(0).map((_, index) => index + 1);
  const pageFrame = pages.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 3, lastPage));

  return pageFrame;
});

const isFirstPage = computed(() => props.currentPage === 1);
const isLastPage = computed(() => props.currentPage === props.lastPage);
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: px-to-rem(25px);

  &__button {
    padding: 0;
    width: px-to-rem(48px);
    height: px-to-rem(48px);

    display: flex;
    align-items: center;
    justify-content: center;
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
  gap: px-to-rem(25px);

  &__icon {
    width: px-to-rem(24px);
    height: px-to-rem(24px);

    &_right {
      transform: rotate(180deg);
    }
  }
}

.page-list {
  display: flex;
  gap: px-to-rem(10px);
}
</style>
