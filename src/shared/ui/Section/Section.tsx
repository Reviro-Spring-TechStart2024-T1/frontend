import clsx from 'clsx';

import { Typography } from '../Typography';

import { TitleProps } from './types/Section.types';

export const Section = (props: TitleProps) => {
  const { children, title, className } = props;
  return (
    <section className={clsx('w-full', className)}>
      {title ? (
        <div className="flex flex-1 items-center justify-between py-5">
          <Typography variant="h5" weight="semibold">
            {title}
          </Typography>
        </div>
      ) : null}

      <div className="space-y-6">{children}</div>
    </section>
  );
};
