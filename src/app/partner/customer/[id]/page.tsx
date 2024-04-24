import { Metadata } from 'next';

import { Typography } from '@/shared/ui';
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
    <>
      <Typography variant="h2" weight="bold">
        Customer Profile {id}
      </Typography>

      <BeverageTable />
    </>
  );
}
