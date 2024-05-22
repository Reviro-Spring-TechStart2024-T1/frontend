import { ReactNode, useState } from 'react';
import { RiFilter3Line } from '@remixicon/react';
import clsx from 'clsx';

import { Search } from '@/features/search';
import { Button, Typography } from '@/shared/ui';

export interface SearchFilterProps {
  searchPlaceholder?: string;
  onSearch: (value: string) => void;
  children: ReactNode;
}

export const SearchFilter = ({
  searchPlaceholder,
  onSearch,
  children,
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

      <div
        className={clsx(
          'hidden flex-wrap gap-4 rounded-md bg-theme-grey-150 p-4 lg:flex-col',
          { ['!flex']: isOpen },
        )}
      >
        {children}
      </div>
    </div>
  );
};
