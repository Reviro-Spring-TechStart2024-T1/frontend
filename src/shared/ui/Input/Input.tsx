import { FC, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { Typography } from '../Typography';

import { InputProps } from './types/Input.types';

export const Input: FC<InputProps> = forwardRef((props, ref) => {
  const { title, className, ...rest } = props;

  return (
    <div className="space-y-2">
      {title ? <Typography variant="caption">{title}:</Typography> : null}

      <input
        {...rest}
        ref={ref}
        className={twMerge(
          'w-full rounded-md border border-theme-grey-200 px-4 py-2 text-sm text-theme-black outline-none transition-all placeholder:text-sm focus-within:border-theme-grey-400 disabled:bg-theme-grey-300 disabled:placeholder:text-theme-grey-400',
          className,
        )}
      />
    </div>
  );
});
