import { drinkjoyApi } from '../interceptors';

export const createPost = async (
  url: string,
  { arg }: { arg: { title: string; content: string } },
) => {
  const { data } = await drinkjoyApi.post(url, { ...arg });

  return data;
};
