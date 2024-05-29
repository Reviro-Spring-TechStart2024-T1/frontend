import useSWR from 'swr';

import { fetcher } from '@/shared/helper';

import { PostsResponse } from '../types';

export const useGetPosts = () => {
  const { data } = useSWR<PostsResponse>('/support/posts/', fetcher);

  return {
    data,
  };
};
