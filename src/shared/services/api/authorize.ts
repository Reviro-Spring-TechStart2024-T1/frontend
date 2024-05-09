import { drinkjoyApi } from '../interceptors';

export const authorize = async (
  url: string,
  { args }: { args: { email: string; password: string } },
) => {
  const { data } = await drinkjoyApi.post(url, {
    ...args,
  });

  if (data) {
    localStorage.setItem('token', JSON.stringify(data));
  }

  return data;
};
