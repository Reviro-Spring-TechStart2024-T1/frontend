import { Suspense } from 'react';
import type { Metadata } from 'next';

import { AddBeverageButton } from '@/shared';
import { Typography } from '@/shared/ui';
import { BeverageList } from '@/widgets/beverage-list';
import { Modal } from '@/widgets/modal';

export const metadata: Metadata = {
  title: 'Menu',
};

export default function Page() {
  return (
    <div className="menu-page relative min-h-dvh  p-5 sm:px-10">
      <div className="mb-5 flex justify-between">
        <Typography variant="h2" weight="bold">
          Menu
        </Typography>
        <AddBeverageButton />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <BeverageList />
      </Suspense>
      <Modal />
    </div>
  );
}
