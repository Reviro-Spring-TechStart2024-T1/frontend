export interface OrderHistoryItem {
  id: number;
  beverage: string;
  price: string;
  category: string;
  creation_time: string;
}

export interface OrderHistoryResponse {
  data: OrderHistoryItem[];
  first?: number;
  items?: number;
  last?: number;
  next?: number;
  pages: number;
  prev?: number;
}

export interface UsersItem {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: number;
  joinedAt: number;
}

export interface UsersResponse {
  data: UsersItem[];
  first?: number;
  items?: number;
  last?: number;
  next?: number;
  pages: number;
  prev?: number;
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
