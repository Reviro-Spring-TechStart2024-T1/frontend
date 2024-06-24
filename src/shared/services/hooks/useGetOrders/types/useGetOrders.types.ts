export interface TOrder {
  id: number;
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  establishment_name: string;
  beverage_name: string;
  beverage_price: string;
  order_date: string;
  status: 'pending' | 'completed' | 'cancelled';
  quantity: number;
  last_updated: string;
}

export interface TOrdersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TOrder[];
}

export interface OrdersProps {
  establishmentId: number | undefined;
  page: number;
  limit: number;
  search: string;
  beverage_name?: string;
  status?: string;
  time?: string;
}
