'use client';

import { FC } from 'react';
import clsx from 'clsx';

import { Form } from '@/features/edit-category';
import { EDIT_CATEGORY, TFormProps, useCloseForm } from '@/shared';
import { Typography } from '@/shared/ui';

export const EditCategory: FC<TFormProps> = ({ isActive, setModalState }) => {
  useCloseForm(EDIT_CATEGORY, setModalState);

  return (
    <div
      id="edit-category"
      className={clsx(
        'fixed left-2/4 top-2/4 z-50 flex w-[400px] -translate-x-2/4 -translate-y-2/4 flex-col items-center justify-center gap-1 transition-all duration-300',
        {
          'invisible opacity-0': !isActive,
          'visible opacity-100': isActive,
        },
      )}
    >
      <div className="w-full rounded-lg bg-white p-[24px] shadow-[0px_0px_30px_3000px_rgba(0,0,0,0.7)]">
        <Typography variant="paragraph" weight="medium">
          Edit Category
        </Typography>
        <Form setModalState={setModalState} />
      </div>
    </div>
  );
};
