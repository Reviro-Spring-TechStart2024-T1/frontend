'use client';

import { FC, useEffect } from 'react';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useSWRConfig } from 'swr';

import {
  DELETE_CATEGORY,
  TFormProps,
  useCloseForm,
  useDeleteCategory,
} from '@/shared';
import { Button, Typography } from '@/shared/ui';

export const DeleteCategoryConfirmation: FC<TFormProps> = ({
  isActive,
  setModalState,
}) => {
  const searchParams = useSearchParams();

  const categoryId = searchParams.get('id');

  const { trigger, isMutating, data } = useDeleteCategory({ id: categoryId! });

  const { mutate } = useSWRConfig();

  const handleOnClose = () => {
    setModalState(false);
  };

  const handleOnDelete = () => {
    trigger();
  };

  useEffect(() => {
    if (data) {
      setModalState(false);

      mutate(`/categories/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useCloseForm({ elementId: DELETE_CATEGORY, setter: setModalState });

  return (
    <div
      id="delete-category"
      className={clsx(
        'fixed left-2/4 top-2/4 z-50 flex w-[400px] -translate-x-2/4 -translate-y-2/4 flex-col items-center justify-center gap-1 transition-all duration-300',
        {
          'invisible opacity-0': !isActive,
          'visible opacity-100': isActive,
        },
      )}
    >
      <div className="flex w-full flex-col gap-2.5 rounded-lg bg-white p-[24px] shadow-[0px_0px_30px_3000px_rgba(0,0,0,0.7)]">
        <Typography variant="h5" weight="medium" className="text-center">
          Do you want to delete the category?
        </Typography>
        <div className="flex gap-2.5">
          <Button variant="outline" onClick={handleOnClose} className="w-2/4">
            Close
          </Button>
          <Button onClick={handleOnDelete} className="w-2/4">
            <Typography variant="paragraph">
              {isMutating ? 'Deleting...' : 'Delete'}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};
