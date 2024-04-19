import { Suspense } from 'react';
import type { Metadata } from 'next';

import { AddBeverageButton } from '@/shared';
import { BeverageList } from '@/widgets/beverage-list';
import { CreateModalForm } from '@/widgets/create-beverage-form';
import { EditModalForm } from '@/widgets/edit-beverage-form';

export const metadata: Metadata = {
  title: 'Menu',
};

export default function Page() {
  return (
    <div className="menu-page min-h-dvh bg-[#DEE2E6] p-5 sm:px-10">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="menu relative">
          <div className="mb-5 flex justify-between px-10">
            <h1 className="text-4xl font-bold">Menu</h1>
            <AddBeverageButton />
          </div>
          <BeverageList />
          <CreateModalForm />
          <EditModalForm />
        </div>
      </Suspense>
    </div>
  );
}
