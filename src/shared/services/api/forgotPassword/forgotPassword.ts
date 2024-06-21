import { extractStructuredErrors } from '@/shared/helper';

import { drinkjoyApi } from '../../interceptors/interceptors';

import { ForgotPasswordArg } from './types';

export const forgotPassword = async (
  url: string,
  { arg }: { arg: ForgotPasswordArg },
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
