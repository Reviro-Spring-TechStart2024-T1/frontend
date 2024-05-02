import useSWR from 'swr';

import { fetcher } from '@/shared/helper';

export const useGetEstablishment = () => {
  const id = localStorage.getItem('establishment_id');
  const { data } = useSWR(`/establishments/${id}`, fetcher);

  return {
    establishment: data,
  };
};
