import { drinkjoyApi } from '../interceptors';
import { IUserJwtPayload } from '../types';

export const authorize = async (
  url: string,
  { arg }: { arg: { email: string; password: string } },
) => {
  try {
    const { data } = await drinkjoyApi.post<IUserJwtPayload>(url, {
      ...arg,
    });

    if (data.detail) {
      throw new Error(data.detail);
    } else {
      localStorage.setItem('current_user', JSON.stringify(data));
      return data;
    }
  } catch (error: any) {
    console.error('Authorize Error:', error);
    throw error.response?.data.detail;
  }
};
