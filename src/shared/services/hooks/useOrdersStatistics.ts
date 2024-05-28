'use client';

import { useMemo } from 'react';
import useSWR from 'swr';

import { fetcher, TOrderStatisticsResponse, TOrderTimePeriod } from '@/shared';

export const useOrdersStatistics = (timePeriod: TOrderTimePeriod) => {
  const { data: ordersStatistics, isLoading } =
    useSWR<TOrderStatisticsResponse>(`/orders/partners/stats/`, fetcher);

  const { chartLabels, chartData } = useMemo(() => {
    let labels: string[] = [];
    let data: number[] = [];

    if (ordersStatistics) {
      switch (timePeriod) {
        case 'Weekly':
          labels = Object.keys(ordersStatistics.this_week);
          data = Object.values(ordersStatistics.this_week).map(
            period => period.count,
          );
          break;
        case 'Monthly':
          labels = Object.keys(ordersStatistics.this_month);
          data = Object.values(ordersStatistics.this_month).map(
            period => period.count,
          );
          break;
        case 'Quarterly':
          labels = Object.keys(ordersStatistics.this_quarter);
          data = Object.values(ordersStatistics.this_quarter).map(
            period => period.count,
          );
          break;
        case 'Yearly':
          labels = Object.keys(ordersStatistics.this_year);
          data = Object.values(ordersStatistics.this_year).map(
            period => period.count,
          );
          break;
        default:
          break;
      }
    }

    return { chartLabels: labels, chartData: data };
  }, [timePeriod]);

  return {
    statistics: ordersStatistics,
    chartLabels,
    chartData,
    isLoading,
  };
};
