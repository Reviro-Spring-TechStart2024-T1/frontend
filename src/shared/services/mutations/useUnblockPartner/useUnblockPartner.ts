'use client';

import useSWRMutation from 'swr/mutation';

import { unblockPartner } from '../../api';

export const useUnblockPartner = () => {
  return useSWRMutation('/users/partner/unblock/', unblockPartner, {
    onError() {
      console.log('error');
    },
    onSuccess() {
      console.log('success');
    },
  });
};
