export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  sex: string;
  date_of_birth: string;
}

export interface CustomersResponse {
  count: number;
  next: string;
  previous: string;
  results: Customer[];
}

export interface CustomersProps {
  establishmentId: number | undefined;
  page: number;
  limit: number;
  search: string;
}
