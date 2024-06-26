import { Container } from '@/shared/ui';
import { Discussion } from '@/widgets/discussion';

export default function Page() {
  return (
    <Container title="Support discussion" className="flex space-x-4 space-y-0">
      <Discussion />
    </Container>
  );
}
