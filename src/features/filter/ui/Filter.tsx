'use client';

import { useState } from 'react';

import { Typography } from '@/shared/ui';
import { Select } from '@/shared/ui/Select';

import { FilterValues } from '../model/types';

const options = [
  { id: 1, label: 'Any' },
  { id: 2, label: 'Coca-Cola' },
  { id: 3, label: 'Fanta' },
];

export const Filter = () => {
  const [filterValues, setFilterValues] = useState<FilterValues>({
    beverage: options[0],
    price: options[0],
    amount: options[0],
  });

  return (
    <div className="flex flex-wrap gap-4 rounded-md bg-theme-grey-150 p-4 lg:flex-col">
      <div className="flex-1 space-y-1">
        <Typography variant="caption">Beverage</Typography>
        <Select
          value={filterValues.beverage}
          options={options}
          onChange={option =>
            setFilterValues({ ...filterValues, beverage: option })
          }
        />
      </div>
      <div className="flex-1 space-y-1">
        <Typography variant="caption">Price</Typography>
        <Select
          value={filterValues.price}
          options={options}
          onChange={option =>
            setFilterValues({ ...filterValues, price: option })
          }
        />
      </div>
      <div className="flex-1 space-y-1">
        <Typography variant="caption">Amount</Typography>
        <Select
          value={filterValues.amount}
          options={options}
          onChange={option =>
            setFilterValues({ ...filterValues, amount: option })
          }
        />
      </div>
    </div>
  );
};
