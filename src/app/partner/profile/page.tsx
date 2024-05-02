import { Suspense } from 'react';
import type { Metadata } from 'next';

import { PartnerProfile } from '@/entities/partner';
import { NO_INDEX_PAGE } from '@/shared/';

export const metadata: Metadata = {
  title: 'Profile',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return (
    <Suspense fallback="Loading...">
      <PartnerProfile />
    </Suspense>
  );
}
