'use client';

import { useState } from 'react';
import dayjs from 'dayjs';

import { Filter } from '@/features/filter';
import { Sort } from '@/features/sort';
import {
  filters,
  sorting,
  TOrder,
  TOrdersFilters,
  TOrdersSortBy,
  useFilteredOrders,
  useOrders,
} from '@/shared';
import { Container, Typography } from '@/shared/ui';
import { ColumnsType, Table } from '@/shared/ui/Table';

export default function PartnerOrdersPage() {
  const { data } = useOrders();

  const [filter, setFilter] = useState<TOrdersFilters>({
    status: 'Pending',
  });
  const [sortBy, setSortBy] = useState<TOrdersSortBy>({
    time: 'Newest first',
  });

  const filteredOrders = useFilteredOrders(data?.results, filter, sortBy);

  const columns: ColumnsType<TOrder> = [
    { key: 'id', title: 'ID' },
    {
      key: 'beverage_name',
      title: 'Beverage name',
    },
    {
      key: 'beverage_price',
      title: 'Price',
    },
    {
      key: 'order_date',
      title: 'Time',
      render: record => {
        const formattedTime = dayjs(record.order_date).format(
          'DD-MM-YYYY | HH:mm:ss',
        );
        return (
          <Typography variant="caption" color="grey">
            {formattedTime}
          </Typography>
        );
      },
    },
    { key: 'status', title: 'Status' },
  ];

  return (
    <Container title="Orders">
      <Filter filters={filters} setFilter={setFilter} />
      <Sort sortBy={sorting} setSortBy={setSortBy} />
      <Table<TOrder> columns={columns} data={filteredOrders} />
    </Container>
  );
}
