'use client';

import useSWR from 'swr';

import { SUBSCRIPTION_ACTIVE_PATH } from '@/shared/constants';
import { fetcher, useComparePath } from '@/shared/lib';

import { PlansResponse } from './types';

export interface PlansProps {
  page: number;
  limit: number;
}

export const useGetActivePlans = ({ page, limit }: PlansProps) => {
  const offset = (page - 1) * limit;
  const isActivePlan = useComparePath(SUBSCRIPTION_ACTIVE_PATH);

  const { data: planData } = useSWR<PlansResponse>(
    isActivePlan
      ? `/subscriptions/plans/?offset=${offset}&limit=${limit}`
      : `/subscriptions/plans/inactives/?offset=${offset}&limit=${limit}`,
    fetcher,
    { keepPreviousData: true },
  );
  const isExceeded = planData?.results && planData.results.length >= 5;

  const data = {
    isExceeded: isExceeded,
    results: planData?.results.map(item => {
      const regular_type = item.billing_cycles.find(
        item => item.tenure_type === 'REGULAR',
      );
      return {
        ...item,
        price: regular_type?.pricing_scheme.fixed_price.value,
        period: regular_type?.frequency.interval_unit,
      };
    }),
  };

  return {
    data,
  };
};
