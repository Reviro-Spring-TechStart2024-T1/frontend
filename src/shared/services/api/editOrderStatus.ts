import { drinkjoyApi } from '../interceptors';

export const editOrderStatus = async (
  url: string,
  { arg }: { arg: { status: 'pending' | 'completed' | 'cancelled' } },
) => {
  try {
    const { status } = await drinkjoyApi.patch(url, { ...arg });

    return status === 200;
  } catch (error: any) {
    throw error.message
      ? error.message
      : error.response.data.detail
        ? error.response.data.detail
        : error.response.data;
  }
};
