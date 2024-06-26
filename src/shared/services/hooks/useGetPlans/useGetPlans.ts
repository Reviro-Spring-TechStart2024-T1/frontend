'use client';

import useSWR from 'swr';

import { SUBSCRIPTION_ACTIVE_PATH } from '@/shared/constants';
import { fetcher, useComparePath } from '@/shared/lib';

import { PlansResponse } from './types';

export const useGetPlans = () => {
  const { data: planData } = useSWR<PlansResponse>(
    '/subscriptions/plans/',
    fetcher,
  );
  const isActivePlan = useComparePath(SUBSCRIPTION_ACTIVE_PATH);
  const isExceeded =
    (planData?.filter(item => item.status === 'ACTIVE').length ?? 0) >= 5;

  const data = {
    isExceeded: isExceeded,
    results: planData
      ?.map(item => {
        const regular_type = item.billing_cycles.find(
          item => item.tenure_type === 'REGULAR',
        );
        return {
          ...item,
          price: regular_type?.pricing_scheme.fixed_price.value,
          period: regular_type?.frequency.interval_unit,
        };
      })
      .filter(item =>
        isActivePlan ? item.status === 'ACTIVE' : item.status === 'INACTIVE',
      ),
  };

  return {
    data,
  };
};
