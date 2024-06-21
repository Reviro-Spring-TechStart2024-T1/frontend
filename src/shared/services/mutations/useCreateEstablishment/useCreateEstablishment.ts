'use client';

import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';

import { createEstablishment } from '../../api';

export const useCreateEstablishment = () => {
  const router = useRouter();
  const { data, trigger, error, isMutating } = useSWRMutation(
    '/establishments/',
    createEstablishment,
    {
      onError(error: string[][]) {
        console.log('Error: ', error);
      },
      onSuccess() {
        console.log('success');
        router.push('/partner/menu');
      },
    },
  );

  return {
    createEstablishmentData: data,
    createEstablishment: trigger,
    createEstablishmentError: error,
    isCreateEstablishmentMutating: isMutating,
  };
};
