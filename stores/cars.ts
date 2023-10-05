import { IVehicleDataResponse, IMeta, ICar, ILinks } from '@/structures';

type VehicleRequest = {
  perPage: number;
  page: number;
  search?: string;
};

type State = {
  meta: IMeta | null;
  data: ICar[];
  links: ILinks | null;
};

export const useCarsStore = defineStore('cars', {
  state: () => ({
    cars: {
      data: [],
      links: null,
      meta: null,
    } as State,
  }),
  getters: {},
  actions: {
    async getVehicleData({ page, perPage }: VehicleRequest) {
      try {
        const res = await useFetchAPI<IVehicleDataResponse>(`/cars-test?per_page=${perPage}&page=${page}`);

        this.cars.data = res.data;
        this.cars.links = res.links;
        this.cars.meta = res.meta;
      } catch (error) {}
    },

    async getSerachCars({ page = 1, perPage = 9, search }: VehicleRequest) {
      try {
        const res = await useFetchAPI<IVehicleDataResponse>(
          `/cars-test?search=${search}&per_page=${perPage}&page=${page}`,
        );

        this.cars.data = res.data;
        this.cars.links = res.links;
        this.cars.meta = res.meta;
      } catch (error) {}
    },
  },
});
