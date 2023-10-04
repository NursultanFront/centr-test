type LoadingKeyType = string | number;

interface ILoadingData {
  [key: LoadingKeyType]: boolean;
}

export const useLoading = () => {
  const isLoading = reactive<ILoadingData>({});

  const startLoading = (key: LoadingKeyType) => (isLoading[key] = true);

  const stopLoading = (key: LoadingKeyType) => (isLoading[key] = false);

  return { isLoading, startLoading, stopLoading };
};
