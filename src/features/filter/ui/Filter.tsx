'use client';

import { Typography } from '@/shared/ui';
import { Select } from '@/shared/ui/Select';

import { FilterOption, FilterProps } from '../model';

export const Filter = ({ filterItems, setFilterItems }: FilterProps) => {
  const handleFilter = (option: FilterOption, index: number) => {
    const newFilterItems = [...filterItems];
    newFilterItems[index].value = option;
    setFilterItems(newFilterItems);
  };

  return (
    <div className="flex flex-wrap gap-4 rounded-md bg-theme-grey-150 p-4 lg:flex-col">
      {filterItems.map((item, index) => {
        return (
          <div className="flex-1 space-y-1" key={index}>
            <Typography variant="caption">{item.label}</Typography>

            <Select
              value={item.value}
              options={item.options}
              onChange={option => handleFilter(option, index)}
            />
          </div>
        );
      })}
    </div>
  );
};
