import { drinkjoyApi } from '../interceptors';

export const updatePassword = async (
  url: string,
  { arg }: { arg: { password: string; token: string } },
) => {
  try {
    const { data } = await drinkjoyApi.post(url, {
      ...arg,
    });

    return data;
  } catch (error: any) {
    console.error('Update password error:', error);
    throw error.response.data.detail;
  }
};
