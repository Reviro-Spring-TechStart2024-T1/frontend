'use client';

import toast from 'react-hot-toast';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { addPlan } from '../../api';

export const useAddPlan = () => {
  return useSWRMutation('/subscriptions/plans/', addPlan, {
    onError() {
      toast.success('The error occurred');
    },
    onSuccess() {
      toast.success('The plan was created');

      mutate(
        key =>
          typeof key === 'string' && key.startsWith('/subscriptions/plans/'),
        undefined,
      );
    },
  });
};
