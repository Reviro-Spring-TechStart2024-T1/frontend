export interface AdminPartners {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'partner';
  sex: string;
  date_of_birth: string;
  is_blocked: boolean;
}

export interface AdminPartnersResponse {
  count: number;
  next: string;
  previous: string;
  results: AdminPartners[];
}

export interface AdminPartnersProps {
  page: number;
  limit: number;
}
