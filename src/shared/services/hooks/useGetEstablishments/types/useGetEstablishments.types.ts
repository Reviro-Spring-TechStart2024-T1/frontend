export interface TBanner {
  establishment: number;
  id: number;
  url: string;
}

export interface TEstablishment {
  banners: TBanner[];
  description: string;
  email: string;
  happy_hour_start: string;
  happy_hour_end: string;
  latitude: string;
  longitude: string;
  id: number;
  logo: string | null;
  name: string;
  owner: number;
  menu_id: number;
  phone_number: string;
  street_name: string;
  street_number: string;
}

export interface TPartnerEstablishment {
  count: number;
  next: string;
  previous: string;
  results: TEstablishment[];
}
