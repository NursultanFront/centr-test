import { $fetch, FetchOptions } from 'ofetch';

export const useFetchAPI = <T>(request: RequestInfo, opts?: FetchOptions<'json'>) => {
  const config = useRuntimeConfig();

  return $fetch<T>(request, {
    baseURL: `${config.public.apiBase}/api`,
    ...opts,
  });
};

export const usePagination = (defaultOptions?: IPagination) => {
  const currentPage = ref<number>(defaultOptions?.current_page ?? 1);
  const lastPage = ref<number>(defaultOptions?.last_page ?? 1);
  const perPage = ref<number>(defaultOptions?.per_page ?? 10);
  const total = ref<number>(defaultOptions?.per_page ?? 0);

  const extract = <T extends IPagination>(payload?: T | null): void => {
    if (!payload) return;

    currentPage.value = payload.current_page;
    lastPage.value = payload.last_page;
    perPage.value = payload.per_page;
    total.value = payload.total;
  };

  const next = () => currentPage.value + 1;

  const previous = () => currentPage.value - 1;

  const go = (page: number, newPerPage?: number) => {
    currentPage.value = page;

    if (newPerPage) perPage.value = newPerPage;
  };

  const isLastPage = computed(() => currentPage.value === lastPage.value);

  return { currentPage, perPage, lastPage, isLastPage, extract, next, previous, go, total };
};
