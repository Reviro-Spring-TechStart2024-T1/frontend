import { extractStructuredErrors, TChangePassForm } from '@/shared';

import { drinkjoyApi } from '../interceptors';

export const changePassword = async (
  url: string,
  { arg }: { arg: TChangePassForm },
) => {
  try {
    const { data } = await drinkjoyApi.patch(url, {
      ...arg,
    });

    return data;
  } catch (error: any) {
    console.error('Change password error:', error);
    throw extractStructuredErrors(error.response.data);
  }
};
