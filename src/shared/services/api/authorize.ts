import { drinkjoyApi } from '../drinkjoyApi';

export const authorize = async (
  url: string,
  { arg }: { arg: { email: string; password: string } },
) => {
  const { data } = await drinkjoyApi.post(url, {
    ...arg,
  });

  if (data) {
    localStorage.setItem('token', JSON.stringify(data));
  }

  return data;
};
