'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { fetcher } from '@/shared/helper';

export const useGetEstablishment = () => {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('establishment_id');
    setId(id);
  }, []);

  const { data } = useSWR(`/establishments/${id}`, fetcher);

  return {
    establishment: data,
  };
};
