'use client';

import useSWRMutation from 'swr/mutation';

import { addComment } from '../../api';

export const useAddComment = () => {
  return useSWRMutation(`/support/comments/`, addComment, {
    onError() {
      console.log('error');
    },
    onSuccess: () => {
      console.log('success');
    },
  });
};
