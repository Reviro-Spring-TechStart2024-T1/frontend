import { drinkjoyApi } from '../../interceptors';

export interface actionPlanArg {
  plan_id: string | number;
  action: 'activate' | 'deactivate';
}

export const actionPlan = async (
  url: string,
  { arg }: { arg: actionPlanArg },
) => {
  const { data } = await drinkjoyApi.post(url, {
    ...arg,
  });

  return data;
};
