import { FC } from 'react';
import { cva } from 'cva';
import { twMerge } from 'tailwind-merge';

import { Typography } from '@/shared/ui';
import { TCardProps } from '@/widgets/dashboard';

export const Card: FC<TCardProps> = props => {
  const { className, data, variant } = props;

  const cardVariants = cva(
    [
      'flex w-2/4 flex-col items-center justify-center gap-6 rounded-md px-[162px] py-[98px]',
    ],
    {
      variants: {
        variant: {
          quantity: 'bg-[#292B74]',
          sum: 'bg-[#137AF1]',
        },
      },
    },
  );

  const classNames = twMerge(cardVariants({ variant }), className);

  return (
    <div className={classNames}>
      <Typography variant="h1" className="text-7xl text-white" weight="bold">
        {data}
      </Typography>
      {variant === 'quantity' && (
        <Typography variant="paragraph" className="text-center text-white">
          Total number of orders
        </Typography>
      )}
      {variant === 'sum' && (
        <Typography variant="paragraph" className="text-center text-white">
          Total sum of beverages sold
        </Typography>
      )}
    </div>
  );
};
