import { drinkjoyApi } from '../../interceptors/interceptors';

import { CreatePostArg } from './types';

export const createPost = async (
  url: string,
  { arg }: { arg: CreatePostArg },
) => {
  const { data } = await drinkjoyApi.post(url, { ...arg });

  return data;
};
