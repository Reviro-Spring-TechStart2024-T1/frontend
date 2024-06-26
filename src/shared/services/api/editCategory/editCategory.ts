import { drinkjoyApi } from '../../interceptors/interceptors';

import { EditCategoryArg } from './types';

export const editCategory = async (
  url: string,
  { arg }: { arg: EditCategoryArg },
) => {
  const { data } = await drinkjoyApi.put(url, { ...arg });

  return data;
};
