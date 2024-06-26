import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared';
import { Container } from '@/shared/ui';
import { Dashboard } from '@/widgets/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return (
    <Container title="Dashboard">
      <Dashboard />
    </Container>
  );
}
