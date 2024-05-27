import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { NO_INDEX_PAGE } from '@/shared';
import { Container } from '@/shared/ui';

const Dashboard = dynamic(() => import('@/widgets/dashboard'), {
  ssr: false,
});

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
