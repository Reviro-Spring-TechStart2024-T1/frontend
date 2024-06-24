'use client';
import useSWRMutation from 'swr/mutation';

import { deleteEstablishment } from '../../api';

import { DeleteEstablishmentProps } from './types';

export const useDeleteEstablishment = ({ id }: DeleteEstablishmentProps) => {
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
