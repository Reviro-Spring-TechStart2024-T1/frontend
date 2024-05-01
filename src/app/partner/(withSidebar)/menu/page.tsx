import { Suspense } from 'react';
import type { Metadata } from 'next';

import { Container } from '@/shared/ui/Container/Container';
import { BeverageList } from '@/widgets/beverage-list';
import { Modal } from '@/widgets/modal';

export const metadata: Metadata = {
  title: 'Menu',
};

export default function Page() {
  return (
    <Container title="Menu">
      <Suspense fallback={<div>Loading...</div>}>
        <BeverageList />
        <Modal />
      </Suspense>
    </Container>
  );
}
