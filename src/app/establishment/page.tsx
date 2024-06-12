import { Suspense } from 'react';

import { PartnerProfile } from '@/widgets/partner-profile';

export default function Page() {
  return (
    <Suspense fallback={<div className="fixed inset-2/4">Loading...</div>}>
      <PartnerProfile />
    </Suspense>
  );
}
