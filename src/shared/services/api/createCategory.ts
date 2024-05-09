import { drinkjoyApi } from '../interceptors';

export const createCategory = async (
  url: string,
  { arg }: { arg: { name: FormDataEntryValue | null } },
) => {
  const { status } = await drinkjoyApi.post(url, { ...arg });

  if (status === 201) {
    return true;
  } else {
    return false;
  }
};
