'use client';

import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

import { editOrderStatus } from '@/shared';

export const useOrderStatus = (id: number) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(`/orders/partners/${id}/`, editOrderStatus, {
    onSuccess() {
      console.log('success');
      mutate('/orders/partners/');
    },
    onError() {
      console.log('error');
    },
  });
};
