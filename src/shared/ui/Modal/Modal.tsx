'use client';

import React, { ComponentPropsWithoutRef, FC, memo } from 'react';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';

import { SubmitButton } from '@/features';
import { useClickOutside } from '@/shared/helper';
import { Button, Typography } from '@/shared/ui';

type TProps = ComponentPropsWithoutRef<'div'> & {
  query: string;
  isSubmitting: boolean;
  onModalSubmit: () => void;
  close: () => void;
};

export const Modal: FC<TProps> = memo(function Modal({
  query,
  isSubmitting,
  onModalSubmit,
  close,
  children,
}) {
  const ref = useClickOutside(close);
  const searchParams = useSearchParams();
  const queryParam = searchParams.get(query);

  return (
    <div
      className={clsx(
        'fixed inset-0 z-20 flex flex-col items-center justify-center bg-black/80 shadow-2xl transition-opacity duration-200',
        {
          'invisible opacity-0': !queryParam,
          'visible opacity-100': queryParam,
        },
      )}
    >
      <div ref={ref} className="w-1/2 rounded-md bg-theme-grey-300 p-10">
        <Typography variant="h5" weight="medium" className="text-center">
          {children}
        </Typography>
        <Typography
          variant="paragraph"
          weight="regular"
          className="my-5 text-center"
        >
          Irreversible action.
        </Typography>

        <div className="flex gap-2">
          <Button variant="outline" className="w-full" onClick={close}>
            Close
          </Button>
          <SubmitButton
            className="bg-theme-primary-300
          text-theme-white
          hover:bg-theme-primary-200
          active:bg-theme-primary-400"
            onClick={onModalSubmit}
            isMutating={isSubmitting}
          >
            Delete
          </SubmitButton>
        </div>
      </div>
    </div>
  );
});
