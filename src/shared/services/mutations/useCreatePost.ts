'use client';

import useSWRMutation from 'swr/mutation';

import { createPost } from '../api';

export const useCreatePost = () => {
  return useSWRMutation('/support/posts/', createPost, {
    onError() {
      console.log('error');
    },
    onSuccess() {
      console.log('success');
    },
  });
};
