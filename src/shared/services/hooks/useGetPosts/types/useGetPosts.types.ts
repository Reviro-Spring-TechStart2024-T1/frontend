import { Post } from '../../useGetPost/types';

export interface PostsResponse {
  count: number;
  next: string;
  previous: string;
  results: Post[];
}
