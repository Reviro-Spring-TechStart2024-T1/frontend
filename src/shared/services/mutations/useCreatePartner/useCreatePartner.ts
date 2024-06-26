'use client';

import toast from 'react-hot-toast';
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

import { createPartner } from '../../api';

export const useCreatePartner = () => {
  return useSWRMutation('/users/register/partner/', createPartner, {
    onError() {
      toast.error('The error occurred');
    },
    onSuccess() {
      toast.success('The partner was created');

      mutate(
        key =>
          typeof key === 'string' && key.startsWith('/users/register/partner/'),
        undefined,
      );
    },
  });
};
