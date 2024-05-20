'use client';

import { useRouter } from 'next/navigation';

import { Search } from '@/features/search';
import { UsersResponse, useUsers } from '@/shared';
import { Typography } from '@/shared/ui';
import { Container } from '@/shared/ui/Container/Container';
import { ColumnsType, Table } from '@/shared/ui/Table';

export default function CustomerData() {
  const router = useRouter();
  const { users } = useUsers(1);

  const columns: ColumnsType<UsersResponse> = [
    { key: 'id', title: '№' },
    {
      key: 'firstName',
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
              {record.firstName}
            </Typography>
            <Typography variant="caption" color="grey">
              {record.email}
            </Typography>
          </div>
        );
      },
    },
    { key: 'joinedAt', title: 'Joined at' },
  ];

  return (
    <Container title="Customers">
      <Search placeholder="Search by name or email" />
      <Table columns={columns} data={users} />
    </Container>
  );
}
