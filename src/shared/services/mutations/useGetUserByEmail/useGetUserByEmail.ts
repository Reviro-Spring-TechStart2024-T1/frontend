'use client';

import useSWRMutation from 'swr/mutation';

import { getUserByEmail } from '../../api';

export const useGetUserByEmail = () => {
  const { data, trigger, error, reset, isMutating } = useSWRMutation(
    `/orders/find-customer/`,
    getUserByEmail,
    {
      onSuccess() {
        console.log('success');
      },
      onError() {
        console.log('error');
      },
      revalidate: false,
    },
  );

  return {
    user: data,
    trigger,
    reset,
    error,
    isMutating,
  };
};
