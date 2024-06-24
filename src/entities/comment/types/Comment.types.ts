export interface IComment {
  id: number;
  message: string;
  post: number;
  author: {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  created_at: string;
  updated_at: string;
}
