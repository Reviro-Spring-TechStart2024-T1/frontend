'use client';

import { ComponentPropsWithoutRef, FC } from 'react';
import { useFormStatus } from 'react-dom';
import clsx from 'clsx';

import { Button, Typography } from '@/shared/ui';

type TSubmitButton = ComponentPropsWithoutRef<'button'> & {
  isMutating?: boolean;
};

export const SubmitButton: FC<TSubmitButton> = ({
  className,
  children,
  isMutating,
  ...rest
}) => {
  const { pending } = useFormStatus();
  const isLoading = pending || isMutating;

  return (
    <Button
      type="submit"
      width="full"
      {...rest}
      className={clsx(className, {
        'cursor-not-allowed opacity-50': isLoading,
      })}
      disabled={isLoading}
    >
      {isLoading ? (
        <Typography variant="paragraph">Loading...</Typography>
      ) : (
        children
      )}
    </Button>
  );
};
