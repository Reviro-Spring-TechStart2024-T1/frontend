'use client';

import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

import { editOrderStatus } from '../api/editOrderStatus';

export const useOrderStatus = (id: number | null) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    () => (id ? `/orders/partners/${id}/` : null),
    editOrderStatus,
    {
      onSuccess() {
        console.log('success');
        mutate('/orders/partners/'); //TODO - set queryParams together with the key
      },
      onError() {
        console.log('error');
      },
    },
  );
};
