import { testApi } from '../services';

export const testFetcher = async (url: string) => {
  const { data } = await testApi(url);

  return data;
};
