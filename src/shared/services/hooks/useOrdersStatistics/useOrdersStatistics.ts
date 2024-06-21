'use client';

import { useMemo } from 'react';
import useSWR from 'swr';

import { addition, arrFromObj, fetcher } from '@/shared';

import { OrdersStatisticProps, TOrderStatisticsResponse } from './types';

export const useOrdersStatistics = ({
  establishmentId,
  timePeriod,
}: OrdersStatisticProps) => {
  const { data: ordersStatistics, isLoading } =
    useSWR<TOrderStatisticsResponse>(
      () =>
        establishmentId ? `/orders/partners/stats/${establishmentId}/` : null,
      fetcher,
    );

  const { chartLabels, chartData, overallOrdersQuantity, overallOrdersSum } =
    useMemo(() => {
      let labels: string[] = [];
      let data: number[] = [];
      let sum: number[] = [];

      let orderQuantity: number = 0;
      let orderSum: number = 0;

      if (ordersStatistics) {
        switch (timePeriod) {
          case 'Weekly':
            labels = Object.keys(ordersStatistics.this_week);
            data = arrFromObj(ordersStatistics.this_week, 'count');
            sum = arrFromObj(ordersStatistics.this_week, 'sum');

            orderQuantity = addition(data);
            orderSum = addition(sum);

            break;
          case 'Monthly':
            labels = Object.keys(ordersStatistics.this_month);
            data = arrFromObj(ordersStatistics.this_month, 'count');
            sum = arrFromObj(ordersStatistics.this_month, 'sum');

            orderQuantity = addition(data);
            orderSum = addition(sum);
            break;
          case 'Quarterly':
            labels = Object.keys(ordersStatistics.this_quarter);
            data = arrFromObj(ordersStatistics.this_quarter, 'count');
            sum = arrFromObj(ordersStatistics.this_quarter, 'sum');

            orderQuantity = addition(data);
            orderSum = addition(sum);
            break;
          case 'Yearly':
            labels = Object.keys(ordersStatistics.this_year);
            data = arrFromObj(ordersStatistics.this_year, 'count');
            sum = arrFromObj(ordersStatistics.this_year, 'sum');

            orderQuantity = addition(data);
            orderSum = addition(sum);
            break;
          default:
            break;
        }
      }

      return {
        chartLabels: labels,
        chartData: data,
        overallOrdersQuantity: orderQuantity,
        overallOrdersSum: orderSum,
      };
    }, [timePeriod, ordersStatistics]);

  return {
    statistics: ordersStatistics,
    chartLabels,
    chartData,
    overallOrdersQuantity,
    overallOrdersSum,
    isLoading,
  };
};
