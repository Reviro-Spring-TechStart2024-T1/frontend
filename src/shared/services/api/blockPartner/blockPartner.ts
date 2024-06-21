import { drinkjoyApi } from '../../interceptors/interceptors';

import { BlockPartnerArg } from './types';

export const blockPartner = async (
  url: string,
  { arg }: { arg: BlockPartnerArg },
) => {
  const { data } = await drinkjoyApi.patch(url, { ...arg });

  return data;
};
