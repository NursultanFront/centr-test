<template>
  <div class="car-details">
    <DotsIcon class="car-details__dots" />
    <div class="car-details__img">
      <img :src="carImage" alt="Картинка машины" />
    </div>
    <div class="car-details__inner">
      <div class="car-details__box">
        <h2 class="car-details__title">{{ carName }}</h2>
        <h3 class="car-details__subtitle">WDB 1400321A333419</h3>
      </div>
      <div class="car-details__divider"></div>
      <div class="car-details__content">
        <UiAvailabilityInfo :count="props.count" />
        <div class="car-details__days">3 days left</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardImage from '@/assets/images/mersedes.png';
import DotsIcon from '@/assets/images/svg/dots.svg';

interface IProps {
  brand: string | null;
  model: string | null;
  image?: string;
  count?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  count: 15,
});

const carName = computed(() => {
  if (props.brand && props.model) {
    return `${props.brand} ${props.model}`;
  }

  return 'No name';
});

const carImage = computed(() => {
  return props.image ? props.image : CardImage;
});
</script>

<style scoped lang="scss">
.car-details {
  position: relative;

  @include padding(40px, 24px, 16px, 24px);
  display: flex;
  flex-direction: column;

  border-radius: 10px;
  background: var(--primary-light-grey);
  @include rounded-border(10px);

  &__dots {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }

  &__img {
    margin: 0 0 24px;
    width: 260px;
    height: 135px;

    img {
      width: inherit;
      height: inherit;
      object-fit: cover;
    }
  }

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  &__box {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__title {
    line-height: 22px;
    @include text-style(20px, 700, var(--text-black));
  }

  &__subtitle {
    line-height: 20px;
    letter-spacing: 0.3px;
    @include text-style(15px, 500, var(--text-grey));
  }

  &__divider {
    @include border(1px, #e4e4e4);
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }
  &__days {
    @include text-style(15px, 500, var(--text-grey));
  }
}
</style>
