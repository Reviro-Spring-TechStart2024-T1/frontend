import { drinkjoyApi } from '../../interceptors/interceptors';

import { CreateCategoryArg } from './types';

export const createCategory = async (
  url: string,
  { arg }: { arg: CreateCategoryArg },
) => {
  const { status } = await drinkjoyApi.post(url, { ...arg });

  if (status === 201) {
    return true;
  } else {
    return false;
  }
};
