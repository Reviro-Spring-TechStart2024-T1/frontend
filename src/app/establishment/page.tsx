import { Suspense } from 'react';

import { PartnerProfile } from '@/widgets/partner-profile';

export default function Page() {
  return (
    <Suspense fallback="Loading...">
      <PartnerProfile />
    </Suspense>
  );
}
