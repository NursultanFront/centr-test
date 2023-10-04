import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();

  if (!userStore.isAuthed) {
    return navigateTo(`/signin?r=${to.fullPath}`);
  }
});
