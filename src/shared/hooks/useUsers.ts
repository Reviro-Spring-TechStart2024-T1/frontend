import useSWR from 'swr';

import { fetcher } from '@/shared';

export interface Users {
  id: string;
  firstName: string;
  email: string;
  phone: number;
}

export const useUsers = () => {
  const { data } = useSWR<Users[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/users`,
    fetcher,
  );

  return {
    users: data,
  };
};
