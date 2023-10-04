<template>
  <div ref="addressInputRef" class="address-input">
    <UiInput
      v-model="search"
      :is-loading="isLoading[FIND_ADDRESS_LOADING_KEY]"
      :placeholder="props.placeholder"
      :error-text="error"
      @focusin="onInputGetFocus"
    >
      <template v-if="props.isIconVisible" #left-icon>
        <LocationIcon width="24" height="24" />
      </template>
    </UiInput>
    <div v-if="isAutocompleteVisible" class="address-input-autocomplete">
      <div
        v-for="(item, index) in autocomplete"
        :key="item.id || item.name"
        class="address-input-autocomplete__item"
        :class="{
          'address-input-autocomplete__item_inverted': index % 2 === 0,
        }"
        @click="onAddressSelect(item)"
      >
        {{ item.fullName }}
      </div>
    </div>
    <input name="location[region]" type="hidden" :value="location?.region" />
    <input name="location[city]" type="hidden" :value="location?.city" />
    <input name="location[district]" type="hidden" :value="location?.district" />
    <input name="location[street]" type="hidden" :value="location?.street" />
    <input name="location[building]" type="hidden" :value="location?.building" />
    <input name="location[full]" type="hidden" :value="location?.full" />
  </div>
</template>
<script setup lang="ts">
import { onClickOutside, useDebounceFn } from '@vueuse/core';
import LocationIcon from '@/assets/images/svg/icons/location.svg';
import { IKladrSearchResult, KladrContentType } from '@/composables/location';

interface IProps {
  name?: string;
  placeholder?: string;
  error?: string;
  // возвращаемые результаты, по умолчанию возвращается вплоть до номера дома
  scope?: Exclude<KladrContentType, 'cityOwner'>;
  isIconVisible: boolean;
}

const FIND_ADDRESS_LOADING_KEY = 'FIND_ADDRESS_LOADING_KEY';

const addressInputRef = ref<HTMLDivElement>();
const search = ref('');
const autocomplete = ref<IKladrSearchResult[]>([]);
const shouldShowAutocomplete = ref<boolean>(false);

// TODO: fill this data on address select
const location = ref<ILocation>();

const isAutocompleteVisible = computed(
  () => shouldShowAutocomplete.value && search.value.length > 0 && autocomplete.value.length > 0,
);

onMounted(() => {
  onClickOutside(addressInputRef, () => {
    if (!isAutocompleteVisible) {
      return;
    }

    shouldShowAutocomplete.value = false;
  });
});

const props = withDefaults(defineProps<IProps>(), {
  scope: 'building',
  typeCode: 1,
  isIconVisible: true,
});
const emit = defineEmits<{
  (event: 'change', info: ILocation): void;
}>();

const { searchAddress } = useSearch();
const { isLoading, startLoading, stopLoading } = useLoading();

const fetchLocationInfo = async (value: string) => {
  const canSendRequest = shouldShowAutocomplete.value && typeof value === 'string' && value.length > 0;

  if (!canSendRequest) return;

  startLoading(FIND_ADDRESS_LOADING_KEY);

  autocomplete.value = await searchAddress(value, {
    contentType: props.scope,
    // когда пытаются найти дом, необходимо активировать это надстройку
    // для более точных и релевантных результатов
    ...(props.scope === 'building' && { oneString: true, withParent: true }),
  });

  stopLoading(FIND_ADDRESS_LOADING_KEY);
};

const onInputGetFocus = () => (shouldShowAutocomplete.value = true);
const onInputLoseFocus = () => {
  if (!shouldShowAutocomplete.value) {
    return;
  }

  shouldShowAutocomplete.value = false;
};

const onAddressSelect = (info: IKladrSearchResult) => {
  onInputLoseFocus();

  search.value = info.fullName;

  const findValueByKey = (type: KladrContentType) => {
    const locationInfo = { ...info };
    const parents = [...(locationInfo.parents ?? [])];

    const locationObject = [locationInfo, ...parents]?.find((item) => item.contentType === type);

    return locationObject?.type ? `${locationObject.type} ${locationObject.name}` : locationObject?.name;
  };

  const locationInfo: ILocation = {
    full: info.fullName,
    region: findValueByKey('region'),
    city: findValueByKey('city'),
    district: findValueByKey('district'),
    street: findValueByKey('street'),
    building: findValueByKey('building'),
  };

  emit('change', locationInfo);
};

watch(search, useDebounceFn(fetchLocationInfo, 750));
</script>
<style lang="scss">
.address-input {
  position: relative;
}

.address-input-autocomplete {
  position: absolute;
  background: var(--vkd-white-main);
  border: 1px solid var(--vkd-gray-900);
  z-index: 1;
  border-radius: 0 0 5px 5px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: px-to-rem(4px);
  overflow: auto;
  max-height: px-to-rem(200px);
  margin-top: -2px;

  @include padding(8px);

  &__label {
    text-align: center;
  }

  &__item {
    color: var(--vkd-black-900);

    @include padding(8px);
    @include rounded-border;

    &_inverted {
      background-color: var(--vkd-gray-500);
    }
  }
}
</style>
