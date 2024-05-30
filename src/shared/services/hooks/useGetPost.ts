'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared/helper';

import { Post } from '../types';

export const useGetPost = (id: string) => {
  const { data: post } = useSWR<Post>(`/support/posts/${id}`, fetcher);

  return {
    post,
  };
};
