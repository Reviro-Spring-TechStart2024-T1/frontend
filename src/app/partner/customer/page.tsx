'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Search } from '@/features/search';
import { Customer, useGetCustomers } from '@/shared';
import { Typography } from '@/shared/ui';
import { Container } from '@/shared/ui/Container/Container';
import { ColumnsType, Table } from '@/shared/ui/Table';

export default function CustomerData() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data, isLoading } = useGetCustomers(currentPage, 10, search);

  const columns: ColumnsType<Customer> = [
    { key: 'id', title: '№' },
    {
      key: 'name',
      title: 'Name',
      render: record => {
        return (
          <div
            className="flex flex-col"
            onClick={() => router.push(`/partner/customer/${record.id}`)}
          >
            <Typography
              variant="caption"
              color="grey"
              weight="semibold"
              className="group-hover:text-theme-blue-300"
            >
              {record.first_name} {record.last_name}
            </Typography>
            <Typography variant="caption" color="grey">
              {record.email}
            </Typography>
          </div>
        );
      },
    },
    { key: 'sex', title: 'Sex' },
    { key: 'date_of_birth', title: 'Date of birth' },
  ];

  return (
    <Container title="Customers">
      <Search
        placeholder="Search by name or email"
        onSearch={value => setSearch(value)}
      />
      <Table
        columns={columns}
        data={data?.results}
        currentPage={currentPage}
        pages={data.pages}
        loading={isLoading}
        onChange={value => setCurrentPage(value)}
      />
    </Container>
  );
}
