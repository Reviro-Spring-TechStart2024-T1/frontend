'use client';

import { FC } from 'react';
import { useFormState } from 'react-dom';
import clsx from 'clsx';

import { SubmitButton } from '@/features';
import { CREATE_BEVERAGE_FORM, useCloseForm, useCreateModal } from '@/shared';
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

  // useEffect(() => {
  //   if (formState.message === 'success') {
  //     closeModal();
  //   }
  // }, [formState, closeModal]);

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
      <div className="flex w-[80dvw] flex-col justify-between rounded-lg bg-white p-5 shadow-[0px_0px_30px_10000px_rgba(0,0,0,0.7)] sm:gap-10 md:w-[50dvw]">
        <h2 className="mb-3 text-base font-medium lg:text-xl">
          Add new beverage
        </h2>
        <form action={formAction} className="flex flex-col gap-2">
          <input
            type="text"
            name="name"
            className="rounded-md border border-gray-300 px-2 py-1 placeholder:text-gray-400 xl:h-[50px]"
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="category"
            className="rounded-md border border-gray-300 px-2 py-1 placeholder:text-gray-400 xl:h-[50px]"
            placeholder="Category"
            required
          />
          <input
            type="number"
            name="price"
            className="appearance-[textfield] rounded-md border border-gray-300 px-2 py-1 placeholder:text-gray-400 xl:h-[50px]"
            placeholder="Price"
            required
          />
          <input
            type="text"
            name="desc"
            className="rounded-md border border-gray-300 px-2 py-1 placeholder:text-gray-400 xl:h-[50px]"
            placeholder="Description"
            required
          />
          <label className="relative inline-block">
            <input
              type="file"
              name="image"
              className="absolute -z-10 block h-0 w-0 opacity-0"
              placeholder="Choose image"
            />
            <button
              type="button"
              className="relative inline-block rounded-md border border-gray-300 px-3 py-1 text-xs transition-colors duration-200 hover:bg-[#292b74] hover:text-slate-200  xl:h-[50px]"
            >
              Choose image
            </button>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isAvailable"
              className="h-4 w-4 border-l-2 border-red-600 p-10 xl:h-[50px]"
            />
            <span>isAvailable</span>
          </label>
          <div className="flex">
            <button
              type="reset"
              onClick={() => setModalState(false)}
              className="w-2/4 rounded-lg border border-gray-400 px-4 py-1"
            >
              Close
            </button>
            <SubmitButton type="create" />
          </div>
        </form>
      </div>
    </div>
  );
};
