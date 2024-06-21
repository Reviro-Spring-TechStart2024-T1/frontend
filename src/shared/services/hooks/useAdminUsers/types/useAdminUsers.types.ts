export interface AdminUsers {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: 'admin' | 'partner';
  sex: string;
  date_of_birth: string;
}

export interface AdminUsersResponse {
  count: number;
  next: string;
  previous: string;
  results: AdminUsers[];
}

export interface AdminUsersProps {
  page: number;
  limit: number;
}
