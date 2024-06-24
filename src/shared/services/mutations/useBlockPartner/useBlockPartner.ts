'use client';

import useSWRMutation from 'swr/mutation';

import { blockPartner } from '../../api';

export const useBlockPartner = () => {
  return useSWRMutation('/users/partner/block/', blockPartner, {
    onError() {
      console.log('error');
    },
    onSuccess() {
      console.log('success');
    },
  });
};
