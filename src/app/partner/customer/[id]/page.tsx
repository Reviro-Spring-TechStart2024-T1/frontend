import { Metadata } from 'next';

import { Container } from '@/shared/ui/Container/Container';
import { BeverageTable } from '@/widgets/beverage-table';
import { CustomerInfo } from '@/widgets/customer-info';

export const metadata: Metadata = {
  title: 'Customer Profile',
};

interface CustomerProfileProps {
  params: {
    id: number;
  };
}

export default function CustomerProfile({
  params: { id },
}: CustomerProfileProps) {
  return (
    <Container title="Customer Profile">
      <CustomerInfo id={id} />
      <BeverageTable />
    </Container>
  );
}
