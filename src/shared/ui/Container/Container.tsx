import { twMerge } from 'tailwind-merge';

import { Typography } from '../Typography';

import { ContainerProps } from './types/Container.types';

export const Container = (props: ContainerProps) => {
  const { children, title, className, ...rest } = props;
  return (
    <div {...rest} className={twMerge('h-full pb-14 pt-6', className)}>
      <div className="mx-auto flex h-full max-w-7xl flex-col gap-8 px-8 sm:max-w-none sm:px-4">
        <Typography variant="h3" weight="bold">
          {title}
        </Typography>

        <div className="space-y-8 rounded-md bg-theme-white p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
