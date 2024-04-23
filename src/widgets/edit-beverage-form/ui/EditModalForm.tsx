'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

import { TBeverage } from '@/entities/beverage';
import { SubmitButton } from '@/features';
import {
  EDIT_BEVERAGE_FORM,
  useBeverages,
  useCloseForm,
  useEditModal,
} from '@/shared';
import { Button, Typography } from '@/shared/ui';
import { Input } from '@/shared/ui/Input/Input';
import { editBeverage } from '@/widgets/edit-beverage-form';

export const EditModalForm: FC = () => {
  const { isActive, setModalState } = useEditModal();

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const router = useRouter();

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

  const editBeverageWithId = editBeverage.bind(null, +id!);
  const [formState, formAction] = useFormState(
    editBeverageWithId,
    initialState,
  );

  const { data: beverages } = useBeverages<TBeverage[]>();
  const [beverageInfo, setBeverageInfo] = useState<Partial<TBeverage>>();

  const handleBeverageInfoOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof TBeverage,
  ) => {
    setBeverageInfo(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleEditModalOnClose = () => {
    setModalState(false);
    router.push('/partner/menu');
  };

  useEffect(() => {
    beverages && setBeverageInfo(beverages[+id! - 1]);
  }, [beverages, id]);

  useCloseForm(EDIT_BEVERAGE_FORM, setModalState);

  return (
    <div
      id="edit-beverage-form"
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
          Edit beverage
        </Typography>
        {beverageInfo && (
          <form action={formAction} className="mt-[16px] flex flex-col gap-3">
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={beverageInfo.name || ''}
              onChange={e => handleBeverageInfoOnChange(e, 'name')}
            />
            <Input
              type="text"
              name="category"
              placeholder="Category"
              value={beverageInfo.category || ''}
              onChange={e => handleBeverageInfoOnChange(e, 'category')}
            />
            <Input
              type="number"
              name="price"
              placeholder="Price"
              value={beverageInfo.price || ''}
              onChange={e => handleBeverageInfoOnChange(e, 'price')}
            />
            <Input
              type="text"
              name="description"
              placeholder="Description"
              className="rounded-md border border-gray-300 px-2 py-1 pb-[50px] placeholder:text-gray-400"
              value={beverageInfo.desc || ''}
              onChange={e => handleBeverageInfoOnChange(e, 'desc')}
            />

            <label className="relative inline-block">
              <Input
                type="file"
                name="image"
                className="absolute -z-10 block h-0 w-0 opacity-0"
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
            <Input
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={beverageInfo.quantity || ''}
              onChange={e => handleBeverageInfoOnChange(e, 'quantity')}
            />
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
          </form>
        )}
      </div>
    </div>
  );
};
