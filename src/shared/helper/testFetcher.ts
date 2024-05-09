import { testApi } from '../services';

export const testFetcher = async (url: string, args?: any) => {
  const { data } = await testApi(url, { ...args });

  return data;
};
