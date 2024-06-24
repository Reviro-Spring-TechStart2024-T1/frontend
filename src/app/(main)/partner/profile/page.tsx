import { Suspense } from 'react';
import type { Metadata } from 'next';

import { Container, NO_INDEX_PAGE } from '@/shared';
import { PartnerProfile } from '@/widgets/partner-profile';

export const metadata: Metadata = {
  title: 'Partner Profile',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return (
    <Container title="Profile">
      <Suspense fallback={<div className="fixed inset-1/2">Loading...</div>}>
        <PartnerProfile />
      </Suspense>
    </Container>
  );
}
