import { drinkjoyApi } from '../services';

export const fetcher = async (url: string) => {
  const { data } = await drinkjoyApi(url);

  return data;
};
