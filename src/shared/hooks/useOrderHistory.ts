import useSWR from 'swr';

import { fetcher } from '@/shared';

export interface OrderHistory {
  id: string;
  beverage: string;
  price: string;
  category: string;
  creation_time: string;
}

export const useOrderHistory = () => {
  const { data } = useSWR<OrderHistory[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/order_history`,
    fetcher,
  );

  return {
    order_history: data,
  };
};
