export interface Beverage {
  id: number;
  menu: number;
  name: string;
  category: number;
  price: number;
  description: string;
  in_stock: number;
}

export interface BeveragesResponse {
  count: number;
  next: string;
  previous: string;
  results: Beverage[];
}
