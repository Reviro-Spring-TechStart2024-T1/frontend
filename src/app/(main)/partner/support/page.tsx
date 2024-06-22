import { Suspense } from 'react';

import { Container } from '@/shared/ui';
import { PostsList } from '@/widgets/posts-list';

export default function Page() {
  return (
    <Container title="Support">
      <Suspense fallback="Loading...">
        <PostsList />
      </Suspense>
    </Container>
  );
}
