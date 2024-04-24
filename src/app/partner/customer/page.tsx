import { Metadata } from 'next';

import { Typography } from '@/shared/ui';
import { UserTable } from '@/widgets/user-table/ui';

export const metadata: Metadata = {
  title: 'Customer Data',
};

export default function CustomerData() {
  return (
    <>
      <Typography variant="h2" weight="bold">
        Customer Data
      </Typography>

      <UserTable />
    </>
  );
}
