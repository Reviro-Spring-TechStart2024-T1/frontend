export type TLoginForm = {
  status: 'success' | 'error' | string;
  message?: string;
  user_id?: number;
};
