'use client';

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
