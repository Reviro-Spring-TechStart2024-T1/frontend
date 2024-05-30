import { drinkjoyApi } from '../interceptors';

export const unblockPartner = async (
  url: string,
  { arg }: { arg: { email: string } },
) => {
  const { data } = await drinkjoyApi.patch(url, { ...arg });

  return data;
};
