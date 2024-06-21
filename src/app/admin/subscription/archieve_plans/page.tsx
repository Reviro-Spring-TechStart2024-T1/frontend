import { Container } from '@/shared';
import { SubscriptionList } from '@/widgets/subscription-list';

export default function Page() {
  return (
    <Container title="Subscription plans">
      <SubscriptionList />
    </Container>
  );
}
