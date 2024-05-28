'use client';

import { FC, useState } from 'react';
import { RiFilter3Line } from '@remixicon/react';
import clsx from 'clsx';

import { Button, Typography } from '@/shared/ui';

export const Filter: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
        <Typography variant="caption">Filters</Typography>
        <RiFilter3Line size={20} />
      </Button>

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
