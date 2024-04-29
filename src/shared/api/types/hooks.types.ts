export interface OrderHistoryItem {
  id: string;
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
  id: string;
  firstName: string;
  email: string;
  phone: number;
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
