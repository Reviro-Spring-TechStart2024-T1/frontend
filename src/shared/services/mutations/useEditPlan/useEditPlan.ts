'use client';

import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

import { editPlan } from '../../api';

export const useEditPlan = () => {
  const { mutate } = useSWRConfig();

  return useSWRMutation('/subscriptions/plans/patch/', editPlan, {
    onError() {
      toast.error('The error occurred');
    },
    onSuccess() {
      toast.success('The plan was edited');

      mutate('/subscriptions/plans/');
    },
  });
};
