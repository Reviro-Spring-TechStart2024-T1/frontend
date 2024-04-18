import { ComponentProps, ReactNode } from 'react';
import { VariantProps } from 'cva';

import { buttonVariants } from '../Button';

type ButtonWidth = 'full';

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  width?: ButtonWidth;
}
