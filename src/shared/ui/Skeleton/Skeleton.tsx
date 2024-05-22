import { ComponentProps } from 'react';
import { cva } from 'cva';
import { twMerge } from 'tailwind-merge';

interface SkeletonProps extends ComponentProps<'div'> {
  variant: 'rectangle';
}

export const Skeleton = (props: SkeletonProps) => {
  const { variant, className } = props;

  const skeletonVariants = cva(['animate-pulse rounded-lg bg-theme-grey-300'], {
    variants: {
      variant: { rectangle: ['h-4 w-1/3'] },
    },
    defaultVariants: {
      variant: 'rectangle',
    },
  });

  const classNameGenerated = twMerge(skeletonVariants({ variant }), className);

  return <div className={classNameGenerated}></div>;
};
