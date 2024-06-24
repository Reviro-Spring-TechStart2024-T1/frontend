import { FC, forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Typography } from '../Typography';

import { InputProps } from './types/Input.types';

export const Input: FC<InputProps> = forwardRef((props, ref) => {
  const { title, name, className, errors, ...rest } = props;

  return (
    <div className="flex-1 space-y-2">
      {title ? <Typography variant="caption">{title}</Typography> : null}

      <input
        name={name}
        {...rest}
        ref={ref}
        className={twMerge(
          clsx(
            'w-full rounded-md border border-theme-grey-200 px-4 py-2 text-sm text-theme-black outline-none transition-all placeholder:text-sm focus-within:border-theme-grey-400 disabled:bg-theme-grey-300 disabled:placeholder:text-theme-grey-400',
            { ['border-theme-red-500']: name && errors?.[name] },
            className,
          ),
        )}
      />
    </div>
  );
});
