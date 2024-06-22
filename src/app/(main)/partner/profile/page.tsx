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
      <PartnerProfile />
    </Container>
  );
}
