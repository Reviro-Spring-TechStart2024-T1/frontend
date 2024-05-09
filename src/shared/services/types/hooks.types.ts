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

type TCategory = {
  id: number;
  name: string;
};
