'use client';

import { FC, useEffect } from 'react';
import { useFormState } from 'react-dom';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSWRConfig } from 'swr';

import { TBeverage } from '@/entities/beverage';
import { SubmitButton } from '@/features';
import { editBeverage } from '@/features/edit-beverage-form';
import {
  EDIT_BEVERAGE_FORM,
  useBeverages,
  useCloseForm,
  useEditModal,
} from '@/shared';
import { Button, Typography } from '@/shared/ui';
import { Input } from '@/shared/ui/Input/Input';

export const Form: FC = () => {
  const { isActive, setModalState } = useEditModal();

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const menuId = localStorage.getItem('menu_id');

  const router = useRouter();

  const initialState = {
    message: '',
    errors: undefined,
    errorMessage: '',
    fieldValues: {
      name: '',
      category: '',
      price: '',
      description: '',
      in_stock: '',
      // image: {},
    },
  };

  const editBeverageWithId = editBeverage.bind(null, +id!, +menuId!);
  const [formState, formAction] = useFormState(
    editBeverageWithId,
    initialState,
  );

  const { mutate } = useSWRConfig();

  const { data: beverage, isLoading } = useBeverages<TBeverage>(+id!);

  const handleEditModalOnClose = () => {
    setModalState(false);
    router.push('/partner/menu');
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!isActive) {
      timeoutId = setTimeout(() => {
        formState.errors = undefined;
      }, 200);
    }

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  useEffect(() => {
    if (formState.message === 'success') {
      mutate(`/menus/${menuId}`);
      setModalState(false);
    }
    console.log(formState, 'edit');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useCloseForm(EDIT_BEVERAGE_FORM, setModalState);

  return (
    <>
      {isLoading && (
        <div className="flex  min-h-[631px] items-center justify-center">
          Loading
        </div>
      )}

      {beverage && (
        <form action={formAction} className="mt-[16px] flex flex-col gap-3">
          {formState.errorMessage && (
            <Typography variant="paragraph" className="text-red-400">
              {formState.errorMessage}
            </Typography>
          )}
          <>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              className={clsx({
                'border-red-400': formState.errors?.name,
              })}
              defaultValue={beverage.name}
            />
            <Typography variant="paragraph" className="text-red-400">
              {formState.errors?.name}
            </Typography>

            <Input
              type="text"
              name="category"
              placeholder="Category"
              className={clsx({
                'border-red-400': formState.errors?.category,
              })}
              defaultValue={beverage.category}
            />
            <Typography variant="paragraph" className="text-red-400">
              {formState.errors?.category}
            </Typography>

            <Input
              type="text"
              name="price"
              placeholder="Price"
              className={clsx({
                'border-red-400': formState.errors?.price,
              })}
              defaultValue={beverage.price}
            />
            <Typography variant="paragraph" className="text-red-400">
              {formState.errors?.price}
            </Typography>

            <Input
              type="text"
              name="description"
              placeholder="Description"
              className={clsx('pb-[50px]', {
                'border-red-400': formState.errors?.description,
              })}
              defaultValue={beverage.description}
            />
            <Typography variant="paragraph" className="text-red-400">
              {formState.errors?.description}
            </Typography>

            <label className="relative inline-block">
              <Input
                type="file"
                name="image"
                className={clsx('absolute -z-10 block h-0 w-0 opacity-0', {
                  // 'border-red-400': formState.errors?.image,
                })}
                placeholder="Choose image"
              />

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="bg-theme-grey-200"
              >
                Choose image
              </Button>
            </label>
            {/* <Typography variant="paragraph" className="text-red-400">
            {formState.errors?.image}
          </Typography> */}

            <Input
              type="text"
              name="in_stock"
              placeholder="Quantity"
              className={clsx({
                'border-red-400': formState.errors?.in_stock,
              })}
              defaultValue={beverage.in_stock}
            />
            <Typography variant="paragraph" className="text-red-400">
              {formState.errors?.in_stock}
            </Typography>

            <div className="flex gap-2.5">
              <Button
                type="button"
                variant="outline"
                width="full"
                onClick={handleEditModalOnClose}
              >
                Close
              </Button>
              <SubmitButton type="edit" />
            </div>
          </>
        </form>
      )}
    </>
  );
};
