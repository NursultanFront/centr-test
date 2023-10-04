<template>
  <Teleport to="body">
    <dialog
      :id="modalId"
      ref="modalElementRef"
      class="modal"
      :class="[{ modal_fullscreen: props.isFullscreenEnabled }, attrs.class]"
      @keydown.esc="onCloseViaEsc"
    >
      <form v-if="isVisible" class="modal-layout" @submit.prevent="submit">
        <UiButtonBack class="modal__back-button" />
        <div v-if="hasHeader" class="modal-header">
          <slot name="header" :close="close">
            <h3 class="modal-header__title">
              {{ props.title }}
            </h3>
            <UiButton variant="secondary" class="modal-header__close-button" :disabled="!props.canClose" @click="close">
              <CloseIcon width="32" />
            </UiButton>
          </slot>
        </div>
        <div class="modal-content">
          <slot :close="close" />
        </div>
        <div v-if="hasFooter" class="modal-footer">
          <slot name="footer">
            <UiButton type="submit" :disabled="!canSubmit">{{ submitText }}</UiButton>
            <UiButton type="reset" variant="secondary" :disabled="!props.canClose" @click="onCancel">{{
              cancelText
            }}</UiButton>
          </slot>
        </div>
      </form>
    </dialog>
  </Teleport>
</template>
<script setup lang="ts">
import CloseIcon from '@/assets/images/svg/icons/close.svg?component';

interface IProps {
  id: string;
  title?: string;
  submitText?: string;
  cancelText?: string;
  hasHeader?: boolean;
  hasFooter?: boolean;
  canClose?: boolean;
  canSubmit?: boolean;
  isFullscreenEnabled?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  submitText: 'Отправить',
  cancelText: 'Отмена',
  hasHeader: true,
  // TODO: включить эту опцию вдальнейшем
  hasFooter: false,
  canClose: true,
  canSubmit: true,
  modelValue: false,
  isFullscreenEnabled: false,
});
const emit = defineEmits<{
  (event: 'onClose'): void;
  (event: 'onSubmit', payload: Event, close: Function): void;
  (event: 'onCancel'): void;
}>();
const isVisible = defineModel<boolean>({
  required: true,
  default: false,
});

const modalElementRef = ref<HTMLDialogElement>();

const attrs = useAttrs();

const modalId = computed(() => `modal-${props.id}`);

const close = () => {
  isVisible.value = false;

  emit('onClose');
};

const submit = (e: Event) => emit('onSubmit', e, close);

const onChangeVisibility = (isVisible: boolean) => {
  const modalElement = modalElementRef.value;

  if (isVisible) {
    modalElement?.showModal();
  } else {
    modalElement?.close();
  }
};

const onCloseViaEsc = () => (isVisible.value = false);
const onCancel = () => {
  emit('onCancel');

  close();
};

watch(isVisible, onChangeVisibility);

defineExpose({
  // TODO: удалить старый алиас
  modal: modalElementRef,
  modalElementRef,
});
</script>

<style lang="scss">
.modal {
  border: 0;
  background-color: var(--vkd-white-main);
  width: 85%;
  max-height: 90vh;
  overflow: hidden;

  @include padding(16px);
  @include rounded-border(24px);

  @include breakpoint('md') {
    width: 100%;
    max-width: px-to-rem(770px);

    @include padding(40px, 40px);
  }

  &::backdrop {
    background: rgba(105, 109, 116, 0.6);
    backdrop-filter: blur(5px);
  }

  &__back-button {
    display: none;

    @include breakpoint('sm', 'max') {
      display: inherit;
      margin-bottom: px-to-rem(37px);
    }
  }

  // TODO: реализовать полноэкранный режим для обычных модалок
  &_fullscreen {
    @include breakpoint('sm', 'max') {
      $padding: 57px;

      width: calc(100vw - 2 * $padding);
      height: calc(100vh - 2 * $padding);
      max-width: calc(100vw - 2 * $padding);
      max-height: calc(100vh - 2 * $padding);

      @include padding($padding);
      @include rounded-border(0);
    }
  }
}

.modal-header {
  display: flex;
  margin-bottom: px-to-rem(16px);

  @include breakpoint('md') {
    align-items: center;
  }

  &__title {
    color: var(--vkd-black-900);
    margin-bottom: px-to-rem(16px);
  }

  &__close-button {
    margin-left: auto;
    padding: 0;
    width: px-to-rem(48px);
    height: px-to-rem(48px);
    min-width: px-to-rem(48px);
    min-height: px-to-rem(48px);

    @include breakpoint('sm', 'max') {
      display: none;
    }
  }
}

.modal-layout {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  max-height: inherit;
}

.modal-content {
  overflow-y: auto;
}

.modal-footer {
  display: flex;
  gap: px-to-rem(16px);
  margin-top: px-to-rem(42px);

  @include breakpoint('sm', 'max') {
    display: flex;
    flex-direction: column;
    margin-top: px-to-rem(21px);
  }
}
</style>
