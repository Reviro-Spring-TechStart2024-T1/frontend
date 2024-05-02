import { Suspense } from 'react';

import { PartnerProfile } from '@/entities/partner';

export default function Page() {
  return (
    <Suspense fallback="Loading...">
      <PartnerProfile />
    </Suspense>
  );
}
