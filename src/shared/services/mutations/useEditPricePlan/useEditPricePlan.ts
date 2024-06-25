'use client';

import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

import { editPricePlan } from '../../api';

export const useEditPricePlan = () => {
  const { mutate } = useSWRConfig();
  return useSWRMutation(
    '/subscriptions/plans/update-pricing-scheme/',
    editPricePlan,
    {
      onError() {
        toast.error('The error occurred');
      },
      onSuccess() {
        toast.success('The price was edited');

        mutate('/subscriptions/plans/');
      },
    },
  );
};
