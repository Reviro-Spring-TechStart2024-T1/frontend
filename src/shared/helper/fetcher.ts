import { drinkjoyApi } from '../api';

export const fetcher = async (url: string) => {
  const { data } = await drinkjoyApi(url);

  return data;
};
