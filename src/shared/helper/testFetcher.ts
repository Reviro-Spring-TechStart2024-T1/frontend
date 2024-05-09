import { testApi } from '../services';

export const testFetcher = async (url: string, arg?: any) => {
  const { data } = await testApi(url, { ...arg });

  return data;
};
