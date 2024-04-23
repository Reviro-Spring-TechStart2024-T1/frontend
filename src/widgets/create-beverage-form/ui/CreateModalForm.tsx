'use client';

import { FC } from 'react';
import { useFormState } from 'react-dom';
import clsx from 'clsx';

import { SubmitButton } from '@/features';
import { CREATE_BEVERAGE_FORM, useCloseForm, useCreateModal } from '@/shared';
import { Button, Typography } from '@/shared/ui';
import { Input } from '@/shared/ui/Input/Input';
import { createBeverage } from '@/widgets/create-beverage-form';

export const CreateModalForm: FC = () => {
  const { isActive, setModalState } = useCreateModal();

  const initialState = {
    message: '',
    errors: '',
    fieldValues: {
      name: '',
      category: '',
      price: null,
      desc: '',
      image: undefined,
      isAvailable: false,
    },
  };

  const [formState, formAction] = useFormState(createBeverage, initialState);

  useCloseForm(CREATE_BEVERAGE_FORM, setModalState);

  return (
    <div
      id="create-beverage-form"
      className={clsx(
        'fixed left-2/4 top-2/4 flex -translate-x-2/4 -translate-y-2/4 flex-col items-center justify-center gap-1 transition-all duration-300',
        {
          'invisible opacity-0': !isActive,
          'visible opacity-100': isActive,
        },
      )}
    >
      <div className="w-[320px] rounded-lg bg-white p-[24px] shadow-[0px_0px_30px_3000px_rgba(0,0,0,0.7)] sm:w-[560px]">
        <Typography variant="paragraph" weight="medium">
          Add new beverage
        </Typography>
        <form action={formAction} className="mt-[16px] flex flex-col gap-3">
          <Input type="text" name="name" placeholder="Name" required />
          <Input type="text" name="category" placeholder="Category" required />
          <Input type="number" name="price" placeholder="Price" required />
          <Input
            type="text"
            className="pb-[50px]"
            name="desc"
            placeholder="Description"
            required
          />

          <label className="relative inline-block">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-[109px] bg-theme-grey-200"
            >
              <Input
                type="file"
                name="image"
                className="absolute left-0 top-0 z-10 block h-full w-full opacity-0"
                placeholder="Choose image"
              />
              Choose image
            </Button>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isAvailable"
              className="h-4 w-4 border-l-2 border-red-600 p-10 xl:h-[50px]"
            />
            <Typography variant="caption">isAvailable</Typography>
          </label>
          <div className="flex gap-2.5">
            <Button
              type="button"
              variant="outline"
              width="full"
              onClick={() => setModalState(false)}
            >
              Close
            </Button>

            <SubmitButton type="create" />
          </div>
        </form>
      </div>
    </div>
  );
};
