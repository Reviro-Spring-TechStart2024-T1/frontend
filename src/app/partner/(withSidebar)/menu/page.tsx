import { Suspense } from 'react';
import type { Metadata } from 'next';

import { AddBeverageButton } from '@/shared';
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
        <div className="flex justify-end">
          <AddBeverageButton />
        </div>
        <BeverageList />
        <Modal />
      </Suspense>
    </Container>
  );
}
