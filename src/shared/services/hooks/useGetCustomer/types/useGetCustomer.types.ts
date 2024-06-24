export interface OrderHistory {
  id: number;
  beverage: string;
  price: string;
  category: string;
  order_date: string;
}

export interface CustomerResponse {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  sex?: string;
  date_of_birth?: string;
  orders?: OrderHistory[];
}

export interface CustomerProps {
  id: string | number;
}
