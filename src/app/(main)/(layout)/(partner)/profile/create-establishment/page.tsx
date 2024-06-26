import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared';
import { EstablishmentForms } from '@/widgets/establishment-forms';

export const metadata: Metadata = {
  title: 'Create Establishment',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return <EstablishmentForms />;
}
