import { drinkjoyApi } from '../interceptors';

export const createPartner = async (
  url: string,
  { arg }: { arg: { email: FormDataEntryValue | null } },
) => {
  const { data } = await drinkjoyApi.post(url, { ...arg });

  return data;
};
