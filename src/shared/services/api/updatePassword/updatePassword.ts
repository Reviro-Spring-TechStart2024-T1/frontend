import { drinkjoyApi } from '../../interceptors/interceptors';

import { UpdatePasswordArg } from './types';

export const updatePassword = async (
  url: string,
  { arg }: { arg: UpdatePasswordArg },
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
