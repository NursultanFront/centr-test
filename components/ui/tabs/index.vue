<template>
  <div class="tabs">
    <div class="tabs__list" role="tablist">
      <button
        v-for="tab in props.list"
        :key="tab.key"
        class="tab"
        :class="{ tab_active: activeTab === tab.key }"
        @click="selectTab(tab.key)"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="tabs__content">
      <slot :active-tab="activeTab" />
    </div>
  </div>
</template>
<script setup lang="ts">
interface ITab {
  title: string;
  key: string;
}

interface IProps {
  list: ITab[];
  active?: string;
  modelValue?: string;
}

const props = defineProps<IProps>();
const emit = defineEmits<{
  (event: 'update:modelValue', activeTab: string): void;
  (event: 'onChange', activeTab: string): void;
}>();

const activeTab = ref<string>(props.list[0].key ?? '');

const selectTab = (newActiveTab: string) => {
  emit('update:modelValue', newActiveTab);
  emit('onChange', newActiveTab);

  activeTab.value = newActiveTab;
};
</script>
<style lang="scss" scoped>
.tabs {
  &__list {
    display: flex;
    align-items: flex-end;
    min-height: px-to-rem(70px);

    @include breakpoint('sm', 'max') {
      overflow: scroll;

      @include padding(0px, 15px);

      // TODO: theme var
      border-bottom: 1px solid #d9d9d9;
    }
  }

  &__content {
    // TODO: theme variable
    border: 1px solid #e1e1e1;
    border-radius: 15px;
    border-top-left-radius: 0;

    @include padding(50px);

    @include breakpoint('sm', 'max') {
      border: 0;

      @include padding(40px, 0px);
    }
  }
}

.tab {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  // TODO: theme var
  background-color: #eef6f7;
  cursor: pointer;

  @include text-style(20px, 700);
  @include padding(10px, 40px);

  @include transition(padding color);

  border: 0;

  @include breakpoint('sm', 'max') {
    white-space: nowrap;
    background-color: transparent;
    // TODO: theme var
    color: var(--vkd-black-100);

    @include padding(10px, 30px);
  }

  &_active {
    background-color: var(--vkd-white-main);
    color: var(--vkd-black-900);

    @include padding(20px, 40px);
    @include border(1px, var(--vkd-gray-800));

    border-bottom: 0;

    @include breakpoint('sm', 'max') {
      border: 0;
      border-bottom: 2px solid var(--vkd-black-900);

      @include padding(10px, 0px);
    }
  }
}
</style>
