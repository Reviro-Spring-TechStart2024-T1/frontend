import useSWR from 'swr';

import { fetcher } from '@/shared/helper';

import { PlansResponse } from '../types';

export const useGetPlans = () => {
  const { data: planData } = useSWR<PlansResponse>(
    '/subscriptions/plans/',
    fetcher,
  );

  const data = {
    ...planData,

    results: planData
      ? planData.results.map(item => {
          const regular_type = item.billing_cycles.find(
            item => item.tenure_type === 'REGULAR',
          );
          return {
            ...item,
            price: regular_type?.pricing_scheme.fixed_price.value,
            period: regular_type?.frequency.interval_unit,
          };
        })
      : [],
  };

  return {
    data,
  };
};
