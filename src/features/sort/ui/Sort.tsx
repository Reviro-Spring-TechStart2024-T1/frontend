'use client';

import { FC, useState } from 'react';
import { RiFilter3Line } from '@remixicon/react';
import clsx from 'clsx';

import { TOrdersSortBy, TSort } from '@/shared';
import { Button, Typography } from '@/shared/ui';

type TSortProps = {
  sortBy: TSort[];
  setSortBy: (sortBy: TOrdersSortBy) => void;
};

export const Sort: FC<TSortProps> = ({ sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnSortChosen = (sort: TSort) => () => {
    setSortBy({ time: sort });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        width="full"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
      >
        <Typography variant="caption">Sort by</Typography>
        <RiFilter3Line size={20} />
      </Button>

      <div
        className={clsx(
          'absolute right-0 z-20 mt-2 hidden w-48 rounded-md border border-theme-grey-200 bg-theme-white p-2 shadow-lg',
          { ['!block']: isOpen },
        )}
      >
        {sortBy.map((sort, index) => {
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              width="full"
              className="justify-start"
              onMouseDown={handleOnSortChosen(sort)}
            >
              {sort}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
