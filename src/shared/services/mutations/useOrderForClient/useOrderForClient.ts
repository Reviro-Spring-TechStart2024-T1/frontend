'use client';

import useSWRMutation from 'swr/mutation';

import { createOrderForClient } from '../../api';

export const useOrderForClient = () => {
  const { data, trigger, error, reset, isMutating } = useSWRMutation(
    `/orders/partners/create/`,
    createOrderForClient,
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
    isSuccess: data,
    trigger,
    reset,
    error,
    isMutating,
  };
};
