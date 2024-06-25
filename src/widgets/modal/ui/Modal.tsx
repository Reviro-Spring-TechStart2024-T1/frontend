'use client';

import clsx from 'clsx';

import { useCreateModal, useDeleteModal, useEditModal } from '@/app/_providers';
import { AddBeverageForm, EditBeverageForm } from '@/features';
import { DeleteConfirmation } from '@/features/delete-beverage';
import { Typography } from '@/shared/ui';

export const Modal = () => {
  const { isActive: isCreateFormActive } = useCreateModal();
  const { isActive: isEditFormActive } = useEditModal();
  const { isActive: isDeleteModalActive } = useDeleteModal();

  return (
    <>
      {
        //TODO - searchParams /edit - /add to render different forms
        <div
          id="create-beverage-form"
          className={clsx(
            'fixed left-2/4 top-2/4 z-50 flex -translate-x-2/4 -translate-y-2/4 flex-col items-center justify-center gap-1 space-x-0 space-y-0 transition-all duration-300',
            {
              'invisible opacity-0': !isCreateFormActive,
              'visible opacity-100': isCreateFormActive,
            },
          )}
        >
          <div className="w-[560px] rounded-lg bg-white p-[24px] shadow-[0px_0px_30px_3000px_rgba(0,0,0,0.7)] sm:w-[320px]">
            <Typography variant="paragraph" weight="medium">
              Add new beverage
            </Typography>
            <AddBeverageForm />
          </div>
        </div>
      }

      {
        <div
          id="edit-beverage-form"
          className={clsx(
            'fixed left-2/4 top-2/4 z-50 flex -translate-x-2/4 -translate-y-2/4 flex-col items-center justify-center gap-1 transition-all duration-300',
            {
              'invisible opacity-0': !isEditFormActive,
              'visible opacity-100': isEditFormActive,
            },
          )}
        >
          <div className="w-[560px] rounded-lg bg-white p-[24px] shadow-[0px_0px_30px_3000px_rgba(0,0,0,0.7)] sm:w-[320px]">
            <Typography variant="paragraph" weight="medium">
              Edit beverage
            </Typography>
            <EditBeverageForm />
          </div>
        </div>
      }

      {
        <div
          id="delete-beverage"
          className={clsx(
            'fixed left-2/4 top-2/4 z-50 flex -translate-x-2/4 -translate-y-2/4 flex-col items-center justify-center gap-1 transition-all duration-300',
            {
              'invisible opacity-0': !isDeleteModalActive,
              'visible opacity-100': isDeleteModalActive,
            },
          )}
        >
          <div className="w-[560px] rounded-lg bg-white p-[24px] shadow-[0px_0px_30px_3000px_rgba(0,0,0,0.7)] sm:w-[320px]">
            <Typography variant="h5" weight="medium" className="text-center">
              Do you want to delete the beverage?
            </Typography>
            <Typography
              variant="paragraph"
              weight="regular"
              className="my-5 text-center"
            >
              The data will not be restored again.
            </Typography>
            <DeleteConfirmation />
          </div>
        </div>
      }
    </>
  );
};
