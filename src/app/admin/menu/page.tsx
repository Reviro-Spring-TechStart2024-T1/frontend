import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared';
import { Container } from '@/shared/ui';
import { CategoriesTable } from '@/widgets/categories-table';

export const metadata: Metadata = {
  title: 'Menu',
  ...NO_INDEX_PAGE,
};

export default function AdminMenuPage() {
  return (
    <Container title="Categories">
      <CategoriesTable />
    </Container>
  );
}
