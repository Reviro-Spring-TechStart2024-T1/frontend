'use client';

import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { editEstablishment } from '../../api';

import { EditEstablishmentProps } from './types';

export const useEditEstablishment = ({ id }: EditEstablishmentProps) => {
  const { data, trigger, error, isMutating } = useSWRMutation(
    () => (id ? `/establishments/${id}/` : null),
    editEstablishment,
    {
      onError(error: string[][]) {
        console.log('error', error);
      },
      onSuccess() {
        console.log('success');
        mutate('/establishments/partner/');
      },
    },
  );

  return {
    editEstablishmentData: data,
    editEstablishment: trigger,
    editEstablishmentError: error,
    isEditEstablishmentMutating: isMutating,
  };
};
