import { FC, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { InputProps } from './types/Input.types';

export const Input: FC<InputProps> = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      ref={ref}
      className={twMerge(
        'rounded-md border border-theme-grey-200 px-4 py-2.5 text-theme-black outline-none transition-all placeholder:text-sm disabled:bg-theme-grey-300 disabled:placeholder:text-theme-grey-400',
        className,
      )}
    />
  );
});
