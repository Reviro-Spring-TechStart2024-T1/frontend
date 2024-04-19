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
    if (field === 'isAvailable') {
      setBeverageInfo(prev => ({ ...prev, [field]: e.target.checked }));
    }

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
      <div className="rounded-lg bg-white p-3 shadow-[0px_0px_30px_10000px_rgba(0,0,0,0.7)]">
        <div>
          <Typography variant="paragraph">Edit beverage</Typography>
          {beverageInfo && (
            <form action={formAction} className="flex flex-col gap-2">
              <input
                type="text"
                name="name"
                className="rounded-md border border-gray-300 px-2 py-1 placeholder:text-gray-400"
                value={beverageInfo.name || ''}
                onChange={e => handleBeverageInfoOnChange(e, 'name')}
              />
              <input
                type="text"
                name="category"
                className="rounded-md border border-gray-300 px-2 py-1 placeholder:text-gray-400"
                value={beverageInfo.category || ''}
                onChange={e => handleBeverageInfoOnChange(e, 'category')}
              />
              <input
                type="text"
                name="price"
                className="rounded-md border border-gray-300 px-2 py-1 placeholder:text-gray-400"
                value={beverageInfo.price || ''}
                onChange={e => handleBeverageInfoOnChange(e, 'price')}
              />
              <input
                type="text"
                name="description"
                className="rounded-md border border-gray-300 px-2 py-1 placeholder:text-gray-400"
                value={beverageInfo.desc || ''}
                onChange={e => handleBeverageInfoOnChange(e, 'desc')}
              />
              <input type="file" name="image" className="" />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isAvailable"
                  className="h-4 w-4 border-l-2 border-red-600 p-10"
                  value={beverageInfo.isAvailable ? 'on' : undefined}
                  onChange={e => handleBeverageInfoOnChange(e, 'isAvailable')}
                />
                <Typography variant="caption">isAvailable</Typography>
              </label>
              <div className="flex gap-2.5">
                <Button
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
    </div>
  );
};
