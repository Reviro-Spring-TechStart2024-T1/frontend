import { drinkjoyApi } from '../../interceptors/interceptors';

import { EditCategoryArg } from './types';

export const editCategory = async (
  url: string,
  { arg }: { arg: EditCategoryArg },
) => {
  const { status } = await drinkjoyApi.put(url, { ...arg });

  if (status === 200) {
    return true;
  } else {
    return false;
  }
};
