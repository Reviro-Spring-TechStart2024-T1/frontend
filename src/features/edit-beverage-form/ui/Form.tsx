'use client';

import { FC, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import clsx from 'clsx';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useSWRConfig } from 'swr';

import { TBeverage } from '@/entities/beverage';
import { TCategory } from '@/entities/category';
import { SubmitButton } from '@/features';
import { editBeverage } from '@/features/edit-beverage-form';
import {
  IUserJwtPayload,
  useCategories,
  useChosenEstablishmentContext,
  useGetCategory,
} from '@/shared';
import {
  addImage,
  delete_,
  EDIT_BEVERAGE_FORM,
  useCloseForm,
  useEditModal,
  useGetBeverage,
} from '@/shared';
import useLocalStorage from '@/shared/helper/hooks/useLocalStorage';
import { Button, Typography } from '@/shared/ui';
import { Input } from '@/shared/ui/Input/Input';

export const Form: FC = () => {
  const { chosenEstablishment } = useChosenEstablishmentContext();
  const { isActive, setModalState } = useEditModal();

  const searchParams = useSearchParams();
  const beverageId = searchParams.get('id'); //NOTE - Beverage id

  const [currentPage, setCurrentPage] = useState(1);
  const { beverage, isBeverageLoading } = useGetBeverage<TBeverage>(beverageId);
  const { categories } = useCategories(currentPage, 10);
  const { categoryWithId, isCategoryLoading } = useGetCategory(
    +beverage?.category!,
  );

  const [isCategoryListActive, setIsCategoryListActive] = useState(false);
  const [category, setCategory] = useState<Partial<TCategory>>({
    id: undefined,
    name: undefined,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null); //NOTE - On edit form there will have to be the beverage's image (no images on backend for beverages)
  const [imageName, setImageName] = useState('Choose image');

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
      image: null,
    },
  };

  const [user] = useLocalStorage<IUserJwtPayload | null>('current_user', null);

  const editBeverageWithId = editBeverage.bind(
    null,
    +beverageId!,
    chosenEstablishment?.menu_id!,
    user!,
  );
  const [formState, formAction] = useFormState(
    editBeverageWithId,
    initialState,
  );

  const { mutate } = useSWRConfig();

  const handleEditModalOnClose = () => {
    setModalState(false);
  };

  const handleOnCategoryClicked = () => {
    setIsCategoryListActive(true);
  };

  const handleOnCategoryChosen =
    ({ id, name }: TCategory) =>
    () => {
      setCategory({ id, name });
      setIsCategoryListActive(false);
    };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImageName(file.name);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageName('Choose image');
  };

  useEffect(() => {
    categoryWithId &&
      setCategory({ name: categoryWithId.name, id: categoryWithId.id });
  }, [categoryWithId]);

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
      mutate(`/menus/${chosenEstablishment?.menu_id}/`);
      mutate(`/beverages/${beverageId}/`);
      setModalState(false);
    }
    console.log(formState, 'edit');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useCloseForm(EDIT_BEVERAGE_FORM, setModalState);

  return (
    <>
      {isBeverageLoading ? (
        <div className="flex min-h-[500px] items-center justify-center">
          Loading...
        </div>
      ) : (
        <form
          action={formAction}
          className={clsx('mt-[16px] flex flex-col gap-2', {
            'min-h-[500px]': isBeverageLoading,
          })}
        >
          {formState.errorMessage && (
            <Typography variant="paragraph" className="text-sm text-red-400">
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
              defaultValue={beverage?.name}
            />
            <Typography variant="paragraph" className="text-sm text-red-400">
              {formState.errors?.name}
            </Typography>

            <div
              className="relative"
              onBlur={() => {
                setIsCategoryListActive(false);
              }}
            >
              <>
                <Input
                  type="hidden"
                  name="category"
                  value={category.id}
                  defaultValue={categoryWithId?.id}
                />

                <Input
                  type="text"
                  placeholder="Category"
                  className={clsx('w-full', {
                    'border-red-400': formState.errors?.category,
                  })}
                  value={isCategoryLoading ? 'Loading... ' : category.name}
                  onClick={handleOnCategoryClicked}
                />
              </>

              <ul
                className={clsx(
                  'absolute -top-2 left-0 z-20 flex min-w-full flex-wrap gap-2 rounded-md bg-theme-blue-100 p-2 transition-all duration-300',
                  {
                    'invisible opacity-0': !isCategoryListActive,
                    'visible opacity-100 shadow-[0px_0px_30px_3000px_rgba(0,0,0,0.7)]':
                      isCategoryListActive,
                  },
                )}
              >
                {categories?.map(category => {
                  return (
                    <li
                      key={category.id}
                      className="cursor-pointer rounded-xl border border-gray-300 p-2 hover:opacity-80"
                      onClick={handleOnCategoryChosen(category)}
                    >
                      {category.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <Typography variant="paragraph" className="text-sm text-red-400">
              {formState.errors?.category}
            </Typography>

            <Input
              type="text"
              name="price"
              placeholder="Price"
              className={clsx({
                'border-red-400': formState.errors?.price,
              })}
              defaultValue={beverage?.price}
            />
            <Typography variant="paragraph" className="text-sm text-red-400">
              {formState.errors?.price}
            </Typography>

            <Input
              type="text"
              name="description"
              placeholder="Description"
              className={clsx('pb-[50px]', {
                'border-red-400': formState.errors?.description,
              })}
              defaultValue={beverage?.description}
            />
            <Typography variant="paragraph" className="text-sm text-red-400">
              {formState.errors?.description}
            </Typography>

            <div
              className={clsx(
                'relative mb-2 flex items-center justify-between rounded-md border border-gray-300 p-2',
                // {
                //   'border-red-400': formState.errors?.image, //TODO - As there is update on backend regarding Images of Beverages
                // },
              )}
            >
              <label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    name="image"
                    className="absolute left-0 top-0 z-10 w-1/4 opacity-0"
                    onChange={handleImageChange}
                  />
                  {selectedImage ? (
                    <Image
                      src={URL.createObjectURL(selectedImage)}
                      alt="selected"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <Image
                      src={addImage}
                      alt="add-image"
                      width={40}
                      height={40}
                    />
                  )}
                  <Typography variant="paragraph">{imageName}</Typography>
                </div>
              </label>
              {selectedImage && (
                <Button
                  variant="none"
                  size="sm"
                  btnType="icon"
                  onClick={handleRemoveImage}
                >
                  <Image src={delete_} alt="delete" className="fill-red-500" />
                </Button>
              )}
            </div>
            {/* <Typography variant="paragraph" className="text-sm text-red-400">
              {formState.errors?.image}
            </Typography> */}

            <Input
              type="text"
              name="in_stock"
              placeholder="Quantity"
              className={clsx({
                'border-red-400': formState.errors?.in_stock,
              })}
              defaultValue={beverage?.in_stock}
            />
            <Typography variant="paragraph" className="text-sm text-red-400">
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
              <SubmitButton>Edit</SubmitButton>
            </div>
          </>
        </form>
      )}
    </>
  );
};
