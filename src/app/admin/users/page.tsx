import type { Metadata } from 'next';

import { UsersList } from '@/entities/user';
import { NO_INDEX_PAGE } from '@/shared';

export const metadata: Metadata = {
  title: 'Users',
  ...NO_INDEX_PAGE,
};

export default async function Page() {
  return <UsersList />;
}
