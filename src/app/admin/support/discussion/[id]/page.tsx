import { Container } from '@/shared/ui';
import { Discussion } from '@/widgets/discussion';

export default function Page() {
  return (
    <Container title="Support discussion" className="flex space-x-4 space-y-0">
      <Discussion />

      <div className="flex-shrink-0 md:hidden">
        <aside className="h-80 w-80 rounded-md border border-theme-grey-200  p-6 shadow-lg">
          RULES
        </aside>
      </div>
    </Container>
  );
}
