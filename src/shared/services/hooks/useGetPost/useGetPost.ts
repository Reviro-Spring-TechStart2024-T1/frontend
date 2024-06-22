'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared/lib';

import { Post, PostProps } from './types';

export const useGetPost = ({ id }: PostProps) => {
  const { data: post } = useSWR<Post>(`/support/posts/${id}`, fetcher);

  return {
    post,
  };
};
