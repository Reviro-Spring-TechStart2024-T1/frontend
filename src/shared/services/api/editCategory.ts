import { drinkjoyApi } from '../interceptors';

export const editCategory = async (
  url: string,
  { arg }: { arg: { name: FormDataEntryValue | null } },
) => {
  const { status } = await drinkjoyApi.put(url, { ...arg });

  if (status === 200) {
    return true;
  } else {
    return false;
  }
};
