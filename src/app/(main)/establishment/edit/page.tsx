import { Suspense } from 'react';
import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared';
import { EstablishmentForms } from '@/widgets/establishment-forms';

export const metadata: Metadata = {
  title: 'Edit Establishment',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return (
    <Suspense fallback={<div className="fixed inset-2/4">Loading...</div>}>
      <EstablishmentForms />
    </Suspense>
  );
}
