import { drinkjoyApi } from '../services';

export const fetcher = async (url: string) => {
  try {
    const { data } = await drinkjoyApi(url);

    return data;
  } catch (error: any) {
    throw error.response.data.detail;
  }
};
