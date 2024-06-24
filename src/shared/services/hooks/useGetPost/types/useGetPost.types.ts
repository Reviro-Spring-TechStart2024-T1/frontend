import { IComment } from '@/entities/comment';

export interface Author {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: Author;
  comments: IComment[];
}

export interface PostProps {
  id: string;
}
