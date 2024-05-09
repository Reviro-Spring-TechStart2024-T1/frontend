import { drinkjoyApi } from '../interceptors';

export const createPartner = async (
  url: string,
  { args }: { args: { email: FormDataEntryValue | null } },
) => {
  const { data } = await drinkjoyApi.post(url, { ...args });

  return data;
};
