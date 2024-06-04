'use client';

import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';

import { useLocalStorage } from '@/shared/helper';

import { authorize } from '../api/authorize';

export const useLogin = () => {
  const router = useRouter();
  const [establishment_id] = useLocalStorage('establishment_id', null);

  return useSWRMutation('/users/token/', authorize, {
    onError() {
      console.log('error');
    },
    onSuccess: data => {
      console.log('success');

      if (data?.role === 'partner') {
        establishment_id
          ? router.push('/partner/dashboard')
          : router.push('/establishment');
      } else {
        router.push('/admin/menu');
      }
    },
  });
};
