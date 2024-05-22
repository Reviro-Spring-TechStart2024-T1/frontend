import { drinkjoyApi } from '../interceptors';

export const createOrderForClient = async (
  url: string,
  { arg }: { arg: { beverage_id: number; customer_id: number } },
) => {
  const { status } = await drinkjoyApi.post(url, { ...arg });

  if (status === 201) {
    return true;
  } else {
    return false;
  }
};
