import { useState } from 'react';
import { RiArrowDownSLine } from '@remixicon/react';
import clsx from 'clsx';

import { Typography } from '../Typography';

import { SelectOption, SelectProps } from './types/Select.types';

export const Select = ({ value, options, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = (option: SelectOption) => {
    if (option.id !== value?.id) onChange(option);
  };

  return (
    <div
      className="relative select-none"
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
      tabIndex={0}
    >
      <div className="flex cursor-pointer items-center justify-between rounded-md border border-theme-grey-300 bg-theme-white p-2">
        <Typography variant="caption">{value?.label}</Typography>
        <RiArrowDownSLine
          size={20}
          className={clsx('text-theme-grey-500', { ['rotate-180']: isOpen })}
        />
      </div>

      <div
        className={clsx(
          'absolute left-0 z-10 mt-2 hidden w-full overflow-hidden rounded-md border border-theme-grey-300 bg-theme-white py-2 shadow-lg',
          { ['!block']: isOpen },
        )}
      >
        <ul>
          {options.map((option, index) => {
            return (
              <li
                key={index}
                className={clsx('cursor-pointer p-2 hover:bg-theme-grey-200', {
                  ['bg-theme-grey-300']: option.id === value?.id,
                })}
                onClick={() => handleSelectOption(option)}
              >
                <Typography variant="caption">{option.label}</Typography>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
