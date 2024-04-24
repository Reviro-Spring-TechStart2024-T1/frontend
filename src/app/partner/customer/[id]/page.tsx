import { Metadata } from 'next';

import { Container } from '@/shared/ui/Container/Container';
import { BeverageTable } from '@/widgets/beverage-table';

export const metadata: Metadata = {
  title: 'Customer Profile',
};

interface CustomerProfileProps {
  params: {
    id: string;
  };
}

export default function CustomerProfile({
  params: { id },
}: CustomerProfileProps) {
  return (
    <Container title="Customer Profile">
      <BeverageTable />
    </Container>
  );
}
