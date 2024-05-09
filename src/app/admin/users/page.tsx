import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared';
import { Container } from '@/shared/ui';
import { AdminUserTable } from '@/widgets/user-table copy';

export const metadata: Metadata = {
  title: 'Users',
  ...NO_INDEX_PAGE,
};

export default async function Page() {
  return (
    <Container title="Users">
      <AdminUserTable />
    </Container>
  );
}
