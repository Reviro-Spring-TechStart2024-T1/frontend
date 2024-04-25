import { Suspense } from 'react';
import type { Metadata } from 'next';

import { AddBeverageButton } from '@/shared';
import { Container } from '@/shared/ui/Container/Container';
import { BeverageList } from '@/widgets/beverage-list';
import { CreateModalForm } from '@/widgets/create-beverage-form';
import { EditModalForm } from '@/widgets/edit-beverage-form';

export const metadata: Metadata = {
  title: 'Menu',
};

export default function Page() {
  return (
    <Container title="Menu">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="menu relative">
          <div className="mb-5 flex justify-end">
            <AddBeverageButton />
          </div>
          <BeverageList />
          <CreateModalForm />
          <EditModalForm />
        </div>
      </Suspense>
    </Container>
  );
}
