import { drinkjoyApi } from '../interceptors';

export const authorize = async (
  url: string,
  { arg }: { arg: { email: string; password: string } },
) => {
  const { data } = await drinkjoyApi.post(url, {
    ...arg,
  });

  if (data) {
    localStorage.setItem('current_user', JSON.stringify(data));
  }

  return data;
};
