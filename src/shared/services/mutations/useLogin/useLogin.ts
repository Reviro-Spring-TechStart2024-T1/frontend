'use client';

import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';

import { ESTABLISHMENT_PATH, PARTNER_DASHBOARD_PATH } from '@/shared/constants';
import { useLocalStorage } from '@/shared/helper';

import { authorize } from '../../api';

export const useLogin = () => {
  const router = useRouter();
  const [establishment_id] = useLocalStorage('establishment_id', null);

  return useSWRMutation('/users/token/', authorize, {
    onError(error: string) {
      console.log('Error:', error);
    },
    onSuccess: data => {
      console.log('success');

      if (data?.role === 'partner') {
        establishment_id
          ? router.push(PARTNER_DASHBOARD_PATH)
          : router.push(ESTABLISHMENT_PATH);
      } else {
        router.push('/admin/menu');
      }
    },
  });
};
