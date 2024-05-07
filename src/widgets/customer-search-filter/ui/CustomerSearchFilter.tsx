import { FilterUsers } from '@/features/filter-users';
import { SearchUsers } from '@/features/search-users';

export const CustomerSearchFilter = () => {
  return (
    <div className="flex justify-end gap-4 lg:flex-col">
      <SearchUsers />
      <FilterUsers />
    </div>
  );
};
