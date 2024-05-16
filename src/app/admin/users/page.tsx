'use client';

import {
  AdminUsers,
  useAdminUsers,
} from '@/shared/services/hooks/useAdminUsers';
import { Container, Typography } from '@/shared/ui';
import { ColumnsType, Table } from '@/shared/ui/Table';

export default function Page() {
  const { users } = useAdminUsers();

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
    { key: 'date_of_birth', title: 'Birth' },
  ];

  return (
    <Container title="Users">
      <Table<AdminUsers> columns={columns} data={users?.results} />
    </Container>
  );
}
