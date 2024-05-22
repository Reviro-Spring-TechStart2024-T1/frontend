export interface IUserJwtPayload {
  refresh: string;
  access: string;
  role: 'admin' | 'partner';
}
