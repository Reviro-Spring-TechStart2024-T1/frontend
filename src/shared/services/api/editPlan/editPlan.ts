import { drinkjoyApi } from '../../interceptors';

interface editPlanArg {
  plan_id?: string | number;
  name?: string;
  description?: string;
}

export const editPlan = async (url: string, { arg }: { arg: editPlanArg }) => {
  const { data } = await drinkjoyApi.patch(url, { ...arg });

  return data;
};
