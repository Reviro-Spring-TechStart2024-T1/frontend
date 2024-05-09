import { drinkjoyApi } from '../interceptors';

export const deleteCategory = async (url: string) => {
  const { status } = await drinkjoyApi.delete(url);

  if (status === 204) {
    return true;
  } else {
    return false;
  }
};
