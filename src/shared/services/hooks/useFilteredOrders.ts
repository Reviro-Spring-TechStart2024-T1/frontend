'use client';

import { useMemo } from 'react';

import { TOrder } from '@/shared';
import { TOrdersFilters, TOrdersSortBy } from '@/shared';

export const useFilteredOrders = (
  orders: TOrder[] | undefined,
  filter: TOrdersFilters,
  sortBy: TOrdersSortBy,
) =>
  useMemo(() => {
    if (!orders) return;

    let filteredData = orders;

    if (filter.status === 'Completed') {
      filteredData = filteredData.filter(order => order.status === 'completed');
    }
    if (filter.status === 'Cancelled') {
      filteredData = filteredData.filter(order => order.status === 'canceled');
    }
    if (filter.status === 'Pending') {
      filteredData = filteredData.filter(order => order.status === 'pending');
    }
    if (sortBy.time === 'Newest first') {
      filteredData = filteredData.sort(
        (a, b) => +new Date(b.order_date) - +new Date(a.order_date),
      );
    }
    if (sortBy.time === 'Oldest first') {
      filteredData = filteredData.sort(
        (a, b) => +new Date(a.order_date) - +new Date(b.order_date),
      );
    }

    return filteredData;
  }, [orders, filter, sortBy]);
