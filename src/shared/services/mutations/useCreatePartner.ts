'use client';

import useSWRMutation from 'swr/mutation';

import { createPartner } from '../api/createPartner';

export const useCreatePartner = () => {
  return useSWRMutation('/users/register/partner/', createPartner, {
    onSuccess() {
      console.log('success');
    },
    onError() {
      console.log('error');
    },
  });
};
