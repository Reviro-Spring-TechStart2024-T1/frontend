import { Metadata } from 'next';

import { Container } from '@/shared/ui/Container/Container';
import { UserTable } from '@/widgets/user-table/ui';

export const metadata: Metadata = {
  title: 'Customer Data',
};

export default function CustomerData() {
  return (
    <Container title="Customers">
      <UserTable />
    </Container>
  );
}
