import { FilterOption } from '@/features/filter';
import { TOrderTimePeriod } from '@/shared';

export const timeOptions: Array<FilterOption<TOrderTimePeriod>> = [
  { id: 1, key: 'week', label: 'Weekly' },
  { id: 2, key: 'month', label: 'Monthly' },
  { id: 3, key: 'quarter', label: 'Quarterly' },
  { id: 4, key: 'year', label: 'Yearly' },
];
