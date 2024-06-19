'use client';

import useSWRMutation from 'swr/mutation';

import { deleteEstablishment } from '@/shared';

export const useDeleteEstablishment = (id: number | undefined) => {
  return useSWRMutation(
    () => (id ? `/establishments/${id}/` : null),
    deleteEstablishment,
    {
      onError() {
        console.log('error');
      },
      onSuccess() {
        console.log('success');
      },
    },
  );
};
