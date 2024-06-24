import { drinkjoyApi } from '../../interceptors/interceptors';

import { GetUserByEmailArg } from './types';

export const getUserByEmail = async (
  url: string,
  { arg }: { arg: GetUserByEmailArg },
) => {
  const { data } = await drinkjoyApi.post(url, { ...arg });

  return data;
};
