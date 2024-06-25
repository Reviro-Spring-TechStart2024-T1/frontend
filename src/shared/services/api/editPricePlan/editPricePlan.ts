import { drinkjoyApi } from '../../interceptors';

interface editPricePlanArg {
  plan_id?: string;
  price?: number;
}

export const editPricePlan = async (
  url: string,
  { arg }: { arg: editPricePlanArg },
) => {
  const { data } = await drinkjoyApi.post(url, {
    plan_id: arg.plan_id,
    fixed_price: {
      value: Number(arg.price),
      currency_code: 'USD',
    },
  });

  return data;
};
