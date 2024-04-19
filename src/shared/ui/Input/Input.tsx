import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { InputProps } from './types/Input.types';

export const Input: FC<InputProps> = props => {
  const { className, ...rest } = props;
  return (
    <input
      {...rest}
      className={twMerge(
        'rounded-md border border-theme-grey-300 px-4 py-2.5 text-theme-black outline-none transition-all hover:bg-theme-grey-200 focus:bg-theme-grey-200 disabled:bg-theme-grey-300 disabled:placeholder:text-theme-grey-400',
        className,
      )}
    />
  );
};
