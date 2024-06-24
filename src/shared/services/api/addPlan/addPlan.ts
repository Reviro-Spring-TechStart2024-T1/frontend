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
  const intervalUnit =
    arg?.period?.key === 'QUARTER' ? 'MONTH' : arg.period?.key;
  const intervalCount = arg?.period?.key === 'QUARTER' ? 3 : 1;
  const isTrial = arg.days;
  const productId = 'PROD-9L12605115881351F';

  const { data } = await drinkjoyApi.post(url, {
    product_id: productId,
    name: arg.title,
    description: arg.description,
    status: 'ACTIVE',

    billing_cycles: isTrial
      ? [
          {
            frequency: {
              interval_unit: 'DAY',
              interval_count: arg.days,
            },
            tenure_type: 'TRIAL',
            sequence: 1,
            total_cycles: 1,
            pricing_scheme: {
              fixed_price: {
                value: arg.price,
                currency_code: 'USD',
              },
            },
          },
          {
            frequency: {
              interval_unit: intervalUnit,
              interval_count: intervalCount,
            },
            tenure_type: 'REGULAR',
            sequence: 2,
            total_cycles: 0,
            pricing_scheme: {
              fixed_price: {
                value: arg.price,
                currency_code: 'USD',
              },
            },
          },
        ]
      : [
          {
            frequency: {
              interval_unit: intervalUnit,
              interval_count: intervalCount,
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
