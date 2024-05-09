import type { Metadata } from 'next';

import { CreatePartner } from '@/features/create-partner';
import { NO_INDEX_PAGE } from '@/shared';
import { Container } from '@/shared/ui';
import { AdminPartnersTable } from '@/widgets/user-table copy 2';

export const metadata: Metadata = {
  title: 'Partners',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return (
    <Container title="Partners">
      <CreatePartner />
      <AdminPartnersTable />
    </Container>
  );
}
