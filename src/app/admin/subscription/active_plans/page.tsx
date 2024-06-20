import { Suspense } from 'react';

import { Container } from '@/shared';
import { SubscriptionList } from '@/widgets/subscription-list';

export default function Page() {
  return (
    <Container title="Subscription plans">
      <Suspense fallback={<div className="fixed inset-2/4">Loading...</div>}>
        <SubscriptionList />
      </Suspense>
    </Container>
  );
}
