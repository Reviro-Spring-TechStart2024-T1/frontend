import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';

import { authorize } from '../api/authorize';

export const useLogin = () => {
  const router = useRouter();
  return useSWRMutation('/users/token/', authorize, {
    onError() {
      console.log('error');
    },
    onSuccess: () => {
      console.log('success');

      router.push('/establishment');
    },
  });
};
