export interface ILink {
  url?: string;
  label: string;
  active: boolean;
}

export interface IPhoto {
  id: number;
  car_id: number;
  angle_id: number;
  url: string;
  processed_url?: string;
  status: number;
  status_name: string;
  defect_state: string;
  in_process_by_admin: number;
  created_at: number;
}

export interface ICar {
  id: number;
  user_id: number;
  company_id: number;
  angles_count: number;
  vin: string;
  vin_postfix: string | null;
  vehicle_name: string | null;
  brand: string | null;
  model: string | null;
  body_type: string | null;
  fuel_type: string | null;
  hp: string | null;
  ccm: string | null;
  description: string | null;
  moderated: boolean;
  defect_state: string;
  placeholder: string;
  preview?: string;
  photo?: IPhoto;
  photos_count: number;
  uploads: number;
  created_at: number;
}

export interface ILinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface IMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: ILink[];
  path: string;
  per_page: string;
  to: number;
  total: number;
}

export interface IVehicleDataResponse {
  data: ICar[];
  links: ILinks;
  meta: IMeta;
}
