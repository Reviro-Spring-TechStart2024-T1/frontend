'use client';

import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';

import { createEstablishment } from '../api/establishment';

export const useCreateEstablishment = () => {
  const router = useRouter();
  return useSWRMutation('/establishments/', createEstablishment, {
    onError(error: string[][]) {
      console.log('Error: ', error);
    },
    onSuccess() {
      console.log('success');
      router.push('/partner/menu');
    },
  });
};
