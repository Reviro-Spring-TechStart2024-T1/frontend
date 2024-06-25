'use client';

import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

import { actionPlan } from '../../api';

export const useActionPlan = () => {
  const { mutate } = useSWRConfig();

  return useSWRMutation('/subscriptions/plans/actions/', actionPlan, {
    onError() {
      toast.error('The error occurred');
    },
    onSuccess() {
      mutate('/subscriptions/plans/');
    },
  });
};
