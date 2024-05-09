'use client';

import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';

import { authorize } from '../api/authorize';

export const useLogin = () => {
  const router = useRouter();
  return useSWRMutation('/users/token/', authorize, {
    onError() {
      console.log('error');
    },
    onSuccess: data => {
      console.log('success');

      data?.role === 'partner'
        ? router.push('/establishment')
        : router.push('/admin/menu');
    },
  });
};
