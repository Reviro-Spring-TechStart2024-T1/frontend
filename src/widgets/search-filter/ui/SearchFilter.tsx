import { useState } from 'react';
import { RiFilter3Line } from '@remixicon/react';

import { Filter } from '@/features/filter';
import { Search } from '@/features/search';
import { Button, Typography } from '@/shared/ui';

export interface SearchFilterProps {
  onSearch: (value: string) => void;
  onFilter?: (value: string) => void;
  searchPlaceholder?: string;
}

export const SearchFilter = ({
  onSearch,
  // onFilter,
  searchPlaceholder,
}: SearchFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 md:flex-col">
        <Search onSearch={onSearch} placeholder={searchPlaceholder} />

        <div>
          <Button
            variant="outline"
            width="full"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Typography variant="caption">Filters</Typography>
            <RiFilter3Line size={20} />
          </Button>
        </div>
      </div>

      {isOpen ? <Filter /> : null}
    </div>
  );
};
