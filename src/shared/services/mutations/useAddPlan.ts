'use client';

import useSWRMutation from 'swr/mutation';

import { addPlan } from '../api';

export const useAddPlan = () => {
  return useSWRMutation('/subscriptions/plans/', addPlan, {
    onError() {
      console.log('error');
    },
    onSuccess() {
      console.log('success');
    },
  });
};
