export interface OrderHistoryResponse {
  id: number;
  beverage: string;
  price: string;
  category: string;
  creation_time: string;
}

export interface UsersResponse {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: number;
  joinedAt: number;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: number;
  joinedAt: number;
}

export type TCategoriesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TCategory[];
};

export type TCategory = {
  id: number;
  name: string;
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
