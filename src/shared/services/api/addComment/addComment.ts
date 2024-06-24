import { drinkjoyApi } from '../../interceptors/interceptors';

import { AddCommentArg } from './types';

export const addComment = async (
  url: string,
  { arg }: { arg: AddCommentArg },
) => {
  const { data } = await drinkjoyApi.post(url, { ...arg });

  return data;
};
