import { Metadata } from 'next';

import { Container } from '@/shared/ui/Container/Container';
import { CustomerSearchFilter } from '@/widgets/customer-search-filter';
import { UserTable } from '@/widgets/user-table/ui';

export const metadata: Metadata = {
  title: 'Customer Data',
};

export default function CustomerData() {
  return (
    <Container title="Customer Data">
      <CustomerSearchFilter />
      <UserTable />
    </Container>
  );
}
