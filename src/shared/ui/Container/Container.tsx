import { twMerge } from 'tailwind-merge';

import { Typography } from '../Typography';

import { ContainerProps } from './types/Container.types';

export const Container = (props: ContainerProps) => {
  const { children, title, className, ...rest } = props;
  return (
    <div {...rest} className={twMerge('h-full pb-14 pt-6', className)}>
      <div className="mx-auto flex h-full max-w-7xl flex-col gap-8 px-8 sm:max-w-none sm:px-4">
        <div className="sm:space-y-2">
          <Typography
            variant="caption"
            color="grey"
            className="hidden sm:block"
          >
            Establishment
          </Typography>

          <Typography variant="h3" weight="bold">
            {title}
          </Typography>
        </div>

        <div className="h-full space-y-8 overflow-hidden rounded-md bg-theme-white p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
