'use client';

import { useState } from 'react';

import { AdminUsers, useAdminUsers } from '@/shared';
import { Container, Typography } from '@/shared/ui';
import { ColumnsType, Table } from '@/shared/ui/Table';

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useAdminUsers({ page: currentPage, limit: 10 });

  const columns: ColumnsType<AdminUsers> = [
    { key: 'id', title: '№' },
    {
      key: 'firstName',
      title: 'Name',
      render: record => {
        return (
          <div className="flex flex-col">
            <Typography variant="caption" color="grey" weight="semibold">
              {record.first_name} {record.last_name}
            </Typography>
            <Typography variant="caption" color="grey">
              {record.email}
            </Typography>
          </div>
        );
      },
    },
  ];

  return (
    <Container title="Users">
      <Table<AdminUsers>
        columns={columns}
        data={data.results}
        currentPage={currentPage}
        pages={data.pages}
        loading={isLoading}
        onChange={offset => setCurrentPage(offset)}
      />
    </Container>
  );
}
