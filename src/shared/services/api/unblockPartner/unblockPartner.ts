import { drinkjoyApi } from '../../interceptors/interceptors';

import { UnblockPartnerArg } from './types';

export const unblockPartner = async (
  url: string,
  { arg }: { arg: UnblockPartnerArg },
) => {
  const { data } = await drinkjoyApi.patch(url, { ...arg });

  return data;
};
