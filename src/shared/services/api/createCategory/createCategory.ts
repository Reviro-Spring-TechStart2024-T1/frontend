import { drinkjoyApi } from '../../interceptors/interceptors';

import { CreateCategoryArg } from './types';

export const createCategory = async (
  url: string,
  { arg }: { arg: CreateCategoryArg },
) => {
  const { data } = await drinkjoyApi.post(url, { ...arg });

  return data;
};
