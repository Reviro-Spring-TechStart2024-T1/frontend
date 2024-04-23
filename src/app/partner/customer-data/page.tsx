import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';
import { Typography } from '@/shared/ui';
import { CustomerSearchFilter } from '@/widgets/customer-search-filter';

export const metadata: Metadata = {
  title: 'Customer Data',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return (
    <div className="my-[72px] min-h-[calc(100dvh-144px)] px-[56px]">
      <div className="flex justify-between">
        <Typography variant="h2" weight="bold">
          Customer Data
        </Typography>
        <CustomerSearchFilter />
      </div>
    </div>
  );
}
