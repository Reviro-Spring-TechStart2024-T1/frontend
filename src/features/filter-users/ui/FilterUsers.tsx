'use client';

import { useState } from 'react';
import { RiFilter3Line } from '@remixicon/react';

import { UsersFiltersList } from '@/entities/user';
import { handleFilterDropdown, TFilters } from '@/features/filter-users';
import { Button, Typography } from '@/shared/ui';

export const FilterUsers = () => {
  const [isFilterDropdownActive, setIsFilterDropdownActive] = useState(false);
  const [filter, setFilter] = useState<TFilters>('ID');

  const handleFilterOnChosen = (filter: TFilters) => {
    setFilter(filter);
  };

  return (
    <Button
      variant="outline"
      onClick={handleFilterDropdown(
        isFilterDropdownActive,
        setIsFilterDropdownActive,
      )}
    >
      <Typography variant="caption">Filter</Typography>

      <RiFilter3Line size={20} />
      <UsersFiltersList
        isActive={isFilterDropdownActive}
        setFilter={handleFilterOnChosen}
      />
    </Button>
  );
};
