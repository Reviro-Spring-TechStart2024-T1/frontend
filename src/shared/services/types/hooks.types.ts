import { TCategory } from '@/entities/category';

export interface OrderHistoryResponse {
  id: number;
  beverage: string;
  price: string;
  category: string;
  order_date: string;
}

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

export interface CustomerResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  sex: string;
  date_of_birth: string;
  orders: [];
}

export type TCategoriesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TCategory[];
};

export type TOrdersResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TOrder[];
};

export type TOrder = {
  id: number;
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  establishment_name: string;
  beverage_name: string;
  beverage_price: string;
  order_date: string;
  status: 'pending' | 'completed' | 'canceled'; //NOTE - canceled - spelling mistake on backend
  quantity: number;
  last_updated: string;
};
