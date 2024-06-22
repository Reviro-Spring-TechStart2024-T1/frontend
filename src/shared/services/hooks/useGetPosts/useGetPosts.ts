'use client';

import useSWR from 'swr';

import { fetcher } from '@/shared/lib';

import { PostsResponse } from './types';

export const useGetPosts = () => {
  const { data: postData, mutate } = useSWR<PostsResponse>(
    '/support/posts/?limit=100&offset=0',
    fetcher,
  );

  // FIX_ME: Sort on backend and make pagination

  const data = {
    ...postData,
    results: postData?.results.toSorted((a, b) => {
      if (a.id > b.id) return -1;
      if (a.id < b.id) return 1;

      return 0;
    }),
  };

  return {
    data,
    mutate,
  };
};
