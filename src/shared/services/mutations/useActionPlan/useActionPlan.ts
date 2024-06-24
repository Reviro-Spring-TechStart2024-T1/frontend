'use client';

import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

import { actionPlan } from '../../api';

export const useActionPlan = () => {
  const { mutate } = useSWRConfig();

  return useSWRMutation('/subscriptions/plans/actions/', actionPlan, {
    onError() {
      console.log('error');
    },
    onSuccess() {
      console.log('success');

      mutate('/subscriptions/plans/');
    },
  });
};
