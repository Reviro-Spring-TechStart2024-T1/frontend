import { twMerge } from 'tailwind-merge';

import { Typography } from '../Typography';

import { ContainerProps } from './types/Container.types';

export const Container = (props: ContainerProps) => {
  const { children, title, className, ...rest } = props;
  return (
    <section {...rest} className={twMerge('pb-14 pt-6', className)}>
      <div className="container flex flex-col gap-8">
        <Typography variant="h2" weight="bold">
          {title}
        </Typography>

        <div className="flex flex-col gap-6 rounded-md bg-theme-white p-6">
          {children}
        </div>
      </div>
    </section>
  );
};
