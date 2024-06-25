import { drinkjoyApi } from '../../interceptors';

export const deletePlan = async (url: string) => {
  const { data } = await drinkjoyApi.delete(url);

  return data;
};
