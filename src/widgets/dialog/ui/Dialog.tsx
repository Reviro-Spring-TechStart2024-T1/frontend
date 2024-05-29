'use client';

import { ComponentProps, ReactNode } from 'react';
import { RiCloseFill } from '@remixicon/react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button, Typography } from '@/shared/ui';

interface DialogProps extends ComponentProps<'dialog'> {
  title: string;
  required?: ReactNode;
  onSubmit?: () => void;
  onClose?: () => void;
}

export const Dialog = (props: DialogProps) => {
  const { title, required = true, onSubmit, onClose, children } = props;

  const router = useRouter();
  const searchParams = useSearchParams();
  const showDialog = searchParams.get('dialog');

  const handleCloseDialog = () => {
    router.back();
    onClose && onClose();
  };

  const handleSubmit = () => {
    if (required) {
      onSubmit && onSubmit();
      handleCloseDialog();
    }
  };

  const dialog: JSX.Element | null =
    showDialog === 'true' ? (
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center">
        <div
          className="absolute top-0 z-50 flex h-screen w-screen items-center justify-center bg-theme-black/50"
          onClick={handleCloseDialog}
        ></div>

        <div className="z-50 w-full max-w-lg overflow-hidden rounded-md bg-theme-white">
          <div className="flex px-9 pt-6">
            <Typography variant="h4" className="flex-1">
              {title}
            </Typography>
            <Button
              btnType="icon"
              variant="outline"
              size="sm"
              onClick={handleCloseDialog}
            >
              <RiCloseFill />
            </Button>
          </div>

          <div className="space-y-6 px-9 py-8">{children}</div>

          <div className="flex justify-end gap-2 border border-t bg-theme-grey-100 px-9 py-4">
            <Button
              variant="outline"
              onClick={handleCloseDialog}
              size="md"
              className="font-medium"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} size="md" className="font-medium">
              Create
            </Button>
          </div>
        </div>
      </div>
    ) : null;

  return dialog;
};
