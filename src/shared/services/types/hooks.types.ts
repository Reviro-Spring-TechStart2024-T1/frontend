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
  status: 'pending' | 'completed' | 'cancelled';
  quantity: number;
  last_updated: string;
};
export interface Author {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}
export interface Comment {
  id: number;
  message: string;
  post: number;
  author: {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  created_at: string;
  updated_at: string;
}
export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: Author;
  comments: Comment[];
}
export interface PostsResponse {
  count: number;
  next: string;
  previous: string;
  results: Post[];
}

export type TOrderStatisticsResponse = {
  this_week: TTimeInterval;
  this_month: TTimeInterval;
  this_quarter: TTimeInterval;
  this_year: TTimeInterval;
};

export type TTimeInterval = {
  [key: string]: TTimeIntervalData;
};

export type TTimeIntervalData = {
  count: number;
  sum: number;
};
export interface AdminPartners {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'partner';
  sex: string;
  date_of_birth: string;
  is_blocked: boolean;
}
export interface AdminPartnersResponse {
  count: number;
  next: string;
  previous: string;
  results: AdminPartners[];
}

export type TOrderTimePeriod = 'Weekly' | 'Monthly' | 'Quarterly' | 'Yearly';

export type TPartnerEstablishment = {
  count: number;
  next: string;
  previous: string;
  results: TEstablishment[];
};

export type TEstablishment = {
  banners: TBanner[];
  description: string;
  email: string;
  happy_hour_start: string;
  happy_hour_end: string;
  latitude: string;
  longitude: string;
  id: number;
  logo: string | null;
  name: string;
  owner: number;
  menu_id: number;
  phone_number: string;
  street_name: string;
  street_number: string;
};

export type TBanner = {
  establishment: number;
  id: number;
  url: string;
};

export interface Plan {
  id: number;
  plan_id: string;
  product_id: string;
  name: string;
  description: string;
  status: string;
  price?: number;
  period?: string;
  billing_cycles: [
    {
      frequency: {
        interval_unit: string;
        interval_count: number;
      };
      tenure_type: string;
      sequence: number;
      total_cycles: number;
      pricing_scheme: {
        fixed_price: {
          value: number;
          currency_code: string;
        };
      };
    },
  ];
  payment_preferences: {
    auto_bill_outstanding: boolean;
    setup_fee: {
      value: number;
      currency_code: string;
    };
    setup_fee_failure_action: string;
    payment_failure_threshold: number;
  };
  taxes: {
    percentage: number;
    inclusive: boolean;
  };
}

export interface PlansResponse {
  count: number;
  next: string;
  previous: string;
  results: Plan[];
}
