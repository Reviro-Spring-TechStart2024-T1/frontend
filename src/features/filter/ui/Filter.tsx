'use client';

import { useState } from 'react';
import { RiFilter3Line } from '@remixicon/react';
import clsx from 'clsx';

import { Button, Typography } from '@/shared/ui';

export const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Filters = [{ label: 'Name' }, { label: 'Email' }];

  return (
    <div className="relative">
      <Button
        variant="outline"
        width="full"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
      >
        <Typography variant="caption">Filter</Typography>
        <RiFilter3Line size={20} />
      </Button>

      <div
        className={clsx(
          'absolute right-0 z-20 mt-2 hidden w-48 rounded-md border border-theme-grey-200 bg-theme-white p-2 shadow-lg',
          { ['!block']: isOpen },
        )}
      >
        {Filters.map((filter, index) => {
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              width="full"
              className="justify-start"
            >
              {filter.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
