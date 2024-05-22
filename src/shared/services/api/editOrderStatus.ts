import { drinkjoyApi } from '../interceptors';

export const editOrderStatus = async (
  url: string,
  { arg }: { arg: { status: 'pending' | 'completed' | 'canceled' } }, //NOTE - canceled - spelling mistake on backend
) => {
  const { status } = await drinkjoyApi.patch(url, { ...arg });

  if (status === 200) {
    return true;
  } else {
    return false;
  }
};
