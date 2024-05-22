import { drinkjoyApi } from '../interceptors';

export const getUserByEmail = async (
  url: string,
  { arg }: { arg: { email: string } },
) => {
  const { data } = await drinkjoyApi.post(url, { ...arg });

  return data;
};
