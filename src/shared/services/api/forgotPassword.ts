import { extractStructuredErrors } from '@/shared/helper';

import { drinkjoyApi } from '../interceptors';

export const forgotPassword = async (
  url: string,
  { arg }: { arg: { email: string } },
) => {
  try {
    const { data } = await drinkjoyApi.post(url, {
      ...arg,
    });

    return data;
  } catch (error: any) {
    console.error('Forgot password error:', error);
    throw extractStructuredErrors(error.response.data, false);
  }
};
