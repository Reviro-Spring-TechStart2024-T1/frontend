import { FilterUsers } from '@/features/filter-users';
import { SearchUsers } from '@/features/search-users';

export const CustomerSearchFilter = () => {
  return (
    <div className="flex justify-end gap-4">
      <SearchUsers />
      <FilterUsers />
    </div>
  );
};
