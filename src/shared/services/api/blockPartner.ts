import { drinkjoyApi } from '../interceptors';

export const blockPartner = async (
  url: string,
  { arg }: { arg: { email: string } },
) => {
  const { data } = await drinkjoyApi.patch(url, { ...arg });

  return data;
};
