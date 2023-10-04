type KladrType = 'дом' | 'Область' | 'Город' | 'Улица' | 'Деревня' | 'Район';
type KladrShortType = 'д' | 'обл' | 'г' | 'ул' | 'р-н';
export type KladrContentType = 'building' | 'region' | 'city' | 'street' | 'cityOwner' | 'district';

export enum KladrTypeCode {
  City = 1,
  // Посёлок
  Countryside = 2,
  // Деревня
  Village = 4,
}

export interface IKladrSearchResult {
  id: string;
  name: string;
  zip: number;
  type: KladrType;
  typeShort: KladrShortType;
  okato: string;
  contentType: KladrContentType;
  fullName: string;
  guid: string;
  ifnsfl: string;
  ifnsul: string;
  oktmo: string;
  parentGuid: string;
  cadnum: string;
  parents?: IKladrSearchResult[];
}

interface IKladrSearchResponse {
  searchContext: {
    oneString?: string;
    query?: string;
    withParent: string;
    limit: number;
  };
  result: IKladrSearchResult[];
}

interface IKladrQueryParams {
  regionId?: string;
  districtId?: string;
  cityId?: string;
  streetId?: string;
  buildingId?: string;
  contentType?: KladrContentType;
  withParent?: boolean;
  limit?: number;
  offset?: number;
  typeCode?: KladrTypeCode;
  oneString?: boolean;
}

interface IKladrZIPParam extends IKladrQueryParams {
  contentType: 'building';
  zip: number;
}

export const useSearch = () => {
  const isLoading = ref<boolean>(false);

  const isFetching = computed(() => isLoading.value);

  const searchAddress = async (
    query: string,
    params?: IKladrZIPParam | IKladrQueryParams,
  ): Promise<IKladrSearchResult[]> => {
    const config = useRuntimeConfig();

    try {
      isLoading.value = true;

      const { result } = await useFetchAPI<IKladrSearchResponse>('/kladr/api.php', {
        baseURL: config.public.apiBase,
        headers: {},
        query: {
          query,
          limit: 15,
          ...params,
        },
      });

      return Array.isArray(result) ? result.filter((item) => item.id !== 'Free') : [];
    } catch {
      // TODO: error toast

      return [];
    } finally {
      isLoading.value = false;
    }
  };

  return { isFetching, searchAddress };
};
