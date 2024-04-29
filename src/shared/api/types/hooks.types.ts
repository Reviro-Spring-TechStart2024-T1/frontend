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
