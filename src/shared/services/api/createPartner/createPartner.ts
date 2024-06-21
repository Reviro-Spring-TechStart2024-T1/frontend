import { drinkjoyApi } from '../../interceptors/interceptors';

import { CreatePartnerArg } from './types';

export const createPartner = async (
  url: string,
  { arg }: { arg: CreatePartnerArg },
) => {
  const { data } = await drinkjoyApi.post(url, { ...arg });

  return data;
};
