'use client';

import { useState } from 'react';

import { CreatePartner } from '@/features/create-partner';
import {
  AdminPartners,
  useAdminPartners,
} from '@/shared/services/hooks/useAdminPartners';
import { Container, Typography } from '@/shared/ui';
import { ColumnsType, Table } from '@/shared/ui/Table';

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useAdminPartners(currentPage, 10);

  const columns: ColumnsType<AdminPartners> = [
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
    { key: 'date_of_birth', title: 'Birth' },
  ];

  return (
    <Container title="Partners">
      <CreatePartner />
      <Table<AdminPartners>
        columns={columns}
        data={data?.results}
        currentPage={currentPage}
        pages={data.pages}
        loading={isLoading}
        onChange={offset => setCurrentPage(offset)}
      />
    </Container>
  );
}
