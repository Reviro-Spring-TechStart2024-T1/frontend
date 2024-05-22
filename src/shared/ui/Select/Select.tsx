import { useState } from 'react';
import { RiArrowDownSLine } from '@remixicon/react';
import clsx from 'clsx';

import { Typography } from '../Typography';

import { SelectOption, SelectProps } from './types/Select.types';

export const Select = ({
  value,
  options,
  title,
  any,
  onChange,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const label = value?.label || any;

  const handleSelectOption = (option: SelectOption) => {
    if (option.id !== value?.id) onChange(option);
  };

  return (
    <div className="flex-1 space-y-1">
      {title ? <Typography variant="caption">{title}</Typography> : null}

      <div
        className="relative select-none"
        onBlur={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <div className="flex cursor-pointer items-center justify-between rounded-md border border-theme-grey-300 bg-theme-white p-2">
          <Typography variant="caption">{label}</Typography>
          <RiArrowDownSLine
            size={20}
            className={clsx('text-theme-grey-500', { ['rotate-180']: isOpen })}
          />
        </div>

        <div
          className={clsx(
            'absolute left-0 z-10 mt-2 hidden max-h-52 w-full overflow-auto rounded-md border border-theme-grey-300 bg-theme-white py-2 shadow-lg',
            { ['!block']: isOpen },
          )}
        >
          <ul>
            <li
              className={clsx(
                'hidden cursor-pointer p-2 hover:bg-theme-grey-200',
                { ['!block']: any, ['bg-theme-grey-300']: !value },
              )}
              onClick={() => onChange(null)}
            >
              <Typography variant="caption">{any}</Typography>
            </li>

            {options.map((option, index) => {
              return (
                <li
                  key={index}
                  className={clsx(
                    'cursor-pointer p-2 hover:bg-theme-grey-200',
                    {
                      ['bg-theme-grey-300']: option.id === value?.id,
                    },
                  )}
                  onClick={() => handleSelectOption(option)}
                >
                  <Typography variant="caption">{option.label}</Typography>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
