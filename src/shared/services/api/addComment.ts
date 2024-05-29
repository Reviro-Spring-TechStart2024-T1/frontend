import { drinkjoyApi } from '../interceptors';

export const addComment = async (
  url: string,
  { arg }: { arg: { message: string; post: string } },
) => {
  const { data } = await drinkjoyApi.post(url, { ...arg });

  return data;
};
