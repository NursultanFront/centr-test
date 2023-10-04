import { useUserStore } from '~/stores';

export default defineNuxtRouteMiddleware(() => {
  const { isB2B } = useUserStore();

  if (!isB2B) {
    return navigateTo('/');
  }
});
