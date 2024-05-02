import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared';

export const metadata: Metadata = {
  title: 'Users',
  ...NO_INDEX_PAGE,
};

export default async function Page() {
  return <></>;
}
