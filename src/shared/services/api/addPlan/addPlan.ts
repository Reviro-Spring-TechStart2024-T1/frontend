import { drinkjoyApi } from '../../interceptors/interceptors';

import { PlanArg } from './types';

export const addPlan = async (
  url: string,
  {
    arg,
  }: {
    arg: PlanArg;
  },
) => {
  // FIX_ME: use dynamic data
  const { data } = await drinkjoyApi.post(url, {
    product_id: 'PROD-9L12605115881351F',
    name: arg.title,
    description: arg.description,
    status: 'ACTIVE',
    billing_cycles: [
      {
        frequency: {
          interval_unit: arg.period.key,
          interval_count: 1,
        },
        tenure_type: 'REGULAR',
        sequence: 1,
        total_cycles: 0,
        pricing_scheme: {
          fixed_price: {
            value: arg.price,
            currency_code: 'USD',
          },
        },
      },
    ],
    payment_preferences: {
      auto_bill_outstanding: true,
      setup_fee: {
        value: '0',
        currency_code: 'USD',
      },
      setup_fee_failure_action: 'CONTINUE',
      payment_failure_threshold: 3,
    },
    taxes: {
      percentage: '0',
      inclusive: false,
    },
  });

  return data;
};
