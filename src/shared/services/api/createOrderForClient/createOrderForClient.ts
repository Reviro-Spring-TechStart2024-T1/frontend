import { drinkjoyApi } from '../../interceptors/interceptors';

import { CreateOrderForClientArg } from './types';

export const createOrderForClient = async (
  url: string,
  { arg }: { arg: CreateOrderForClientArg },
) => {
  const { status } = await drinkjoyApi.post(url, { ...arg });

  if (status === 201) {
    return true;
  } else {
    return false;
  }
};
