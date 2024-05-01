import useSWR from 'swr';

import { fetcher } from '@/shared/helper';

import { UserResponse } from '../types';

export const useGetUser = (id: number) => {
  const { data } = useSWR<UserResponse>(`/users/${id}`, fetcher);

  return {
    user: data,
  };
};
