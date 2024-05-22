'use client';

import { useState } from 'react';
import dayjs from 'dayjs';

import { FilterItem } from '@/features/filter';
import { TOrder, useGetBeverages, useGetOrders } from '@/shared';
import { Container, Typography } from '@/shared/ui';
import { Select } from '@/shared/ui/Select';
import { ColumnsType, Table } from '@/shared/ui/Table';
import { SearchFilter } from '@/widgets/search-filter';

export default function Page() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterItems, setFilterItems] = useState<FilterItem>({
    beverage: null,
    status: null,
    time: null,
  });
  const { beveragesOptions } = useGetBeverages();
  const { data } = useGetOrders(
    currentPage,
    10,
    search,
    filterItems.beverage?.key,
    filterItems.status?.key,
    filterItems.time?.key,
  );

  const statusOptions = [
    { id: 1, key: 'pending', label: 'Pending' },
    { id: 2, key: 'completed', label: 'Completed' },
    { id: 3, key: 'cancelled', label: 'Cancelled' },
  ];
  const timeOptions = [
    { id: 1, key: 'today', label: 'Today' },
    { id: 2, key: 'yesterday', label: 'Yesterday' },
    { id: 3, key: 'this_month', label: 'This month' },
    { id: 4, key: 'last_month', label: 'Last month' },
    { id: 5, key: 'last_6_months', label: 'Last 6 months' },
    { id: 6, key: 'this_year', label: 'This year' },
    { id: 7, key: 'last_year', label: 'Last year' },
  ];

  const columns: ColumnsType<TOrder> = [
    { key: 'id', title: 'ID' },
    {
      key: 'beverage_name',
      title: 'Beverage',
    },
    {
      key: 'beverage_price',
      title: 'Price',
    },
    {
      key: 'order_date',
      title: 'Creation time',
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
      <SearchFilter
        searchPlaceholder="Search by order id"
        onSearch={value => setSearch(value)}
      >
        <Select
          title="Beverage"
          value={filterItems.beverage}
          options={beveragesOptions}
          any="Any"
          onChange={option =>
            setFilterItems({ ...filterItems, beverage: option })
          }
        />
        <Select
          title="Status"
          value={filterItems.status}
          options={statusOptions}
          any="Any"
          onChange={option =>
            setFilterItems({ ...filterItems, status: option })
          }
        />
        <Select
          title="Creation time"
          value={filterItems.time}
          options={timeOptions}
          any="All time"
          onChange={option => setFilterItems({ ...filterItems, time: option })}
        />
      </SearchFilter>

      <Table<TOrder>
        columns={columns}
        data={data?.results}
        currentPage={currentPage}
        pages={data.pages}
        onChange={value => setCurrentPage(value)}
      />
    </Container>
  );
}
