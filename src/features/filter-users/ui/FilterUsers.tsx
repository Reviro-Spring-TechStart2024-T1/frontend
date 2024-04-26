'use client';

import { useState } from 'react';
import { RiFilter2Line } from '@remixicon/react';

import { UsersFiltersList } from '@/entities/user';
import { handleFilterDropdown, TFilters } from '@/features/filter-users';
import { Typography } from '@/shared/ui';

export const FilterUsers = () => {
  const [isFilterDropdownActive, setIsFilterDropdownActive] = useState(false);
  const [filter, setFilter] = useState<TFilters>('ID');

  const handleFilterOnChosen = (filter: TFilters) => {
    setFilter(filter);
  };
  console.log(filter);

  return (
    <>
      <div
        onClick={handleFilterDropdown(
          isFilterDropdownActive,
          setIsFilterDropdownActive,
        )}
        className="relative flex items-center gap-2.5 rounded-md border border-[#dee2e6] px-[24px] py-2.5"
      >
        <Typography variant="caption" className="">
          Filter
        </Typography>

        <RiFilter2Line size={20} />
        <UsersFiltersList
          isActive={isFilterDropdownActive}
          setFilter={handleFilterOnChosen}
        />
      </div>
    </>
  );
};
