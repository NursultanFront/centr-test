<template>
  <div ref="selectRef" class="wrapper">
    <div class="language" @click="onToggleOptionListVisibility">
      <component :is="flags[chosenLang].icon" />
      <div class="language__inner">
        <div class="language__title">{{ flags[chosenLang].value }}</div>
        <ArrowIcon class="language__arrow-icon" :class="{ 'language__arrow-icon_up': isExpanded }" />
      </div>
    </div>
    <div v-if="isExpanded" class="options">
      <div v-for="(item, idx) in flags" :key="idx" class="options__item" @click="onSelectLang(idx)">
        <component :is="item.icon" />
        <div>{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

import USAFlagIcon from '@/assets/images/svg/flags/usa.svg?component';
import UKFlagIcon from '@/assets/images/svg/flags/uk.svg?component';
import GerFlagIcon from '@/assets/images/svg/flags/germany.svg?component';
import PortugalFlagIcon from '@/assets/images/svg/flags/portugal.svg?component';
import ArrowIcon from '@/assets/images/svg/chevron_down.svg?component';

const flags = ref([
  { value: 'En', icon: USAFlagIcon },
  { value: 'En', icon: UKFlagIcon },
  { value: 'De', icon: GerFlagIcon },
  { value: 'Pu', icon: PortugalFlagIcon },
]);

const isExpanded = ref<boolean>(false);
const selectRef = ref<HTMLDivElement>();
const chosenLang = ref<number>(1);

onMounted(() => {
  onClickOutside(selectRef, () => {
    if (!isExpanded) {
      return;
    }

    isExpanded.value = false;
  });
});

const onToggleOptionListVisibility = () => (isExpanded.value = !isExpanded.value);

const onSelectLang = (value: number) => {
  chosenLang.value = value;
  isExpanded.value = false;
};
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
}
.language {
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;

  &__inner {
    display: flex;
    align-items: center;
  }

  &__arrow-icon {
    width: px-to-rem(24px);
    height: px-to-rem(24px);

    @include transition(transform);

    &_up {
      transform: rotate(180deg);
    }
  }
}
.options {
  display: flex;
  flex-direction: column;

  position: absolute;
  z-index: 5;

  background-color: #fff;
  @include border(1px, var(--text-line-gray));
  @include rounded-border(10px);

  &__item {
    @include padding(16px);
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;

    & + & {
      border-top: 1px solid var(--text-line-gray);
    }
  }
}
</style>
