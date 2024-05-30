import { ComponentProps } from 'react';
import { cva } from 'cva';
import { twMerge } from 'tailwind-merge';

interface TagProps extends ComponentProps<'span'> {
  variant: 'success' | 'danger';
}

export const Tag = (props: TagProps) => {
  const { variant, children, className } = props;

  const tagVariants = cva(['py-0.5 px-1 text-xs rounded-sm font-medium'], {
    variants: {
      variant: {
        success: ['bg-theme-blue-100 text-theme-primary-200'],
        danger: ['bg-theme-red-300 text-theme-red-500'],
      },
    },
  });

  const classNameGenerated = twMerge(tagVariants({ variant }), className);

  return <span className={classNameGenerated}>{children}</span>;
};
