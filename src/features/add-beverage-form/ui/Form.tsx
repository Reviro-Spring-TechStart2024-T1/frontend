'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import Image from 'next/image';
import { useSWRConfig } from 'swr';

import { IUserJwtPayload } from '@/entities/user';
import { SubmitButton } from '@/features';
import { createBeverage } from '@/features/add-beverage-form';
import {
  addImage,
  CREATE_BEVERAGE_FORM,
  delete_,
  TCategory,
  useCloseForm,
  useCreateModal,
} from '@/shared';
import useLocalStorage from '@/shared/helper/hooks/useLocalStorage';
import { Button, Typography } from '@/shared/ui';
import { Input } from '@/shared/ui/Input/Input';

export const Form: FC<{ categories: TCategory[] | undefined }> = ({
  categories,
}) => {
  const { isActive, setModalState } = useCreateModal();

  const [isCategoryListActive, setIsCategoryListActive] = useState(false);
  const [category, setCategory] = useState<Partial<TCategory>>({
    id: undefined,
    name: undefined,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
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

  const [menuId] = useLocalStorage('menu_id', null);
  const [user] = useLocalStorage<IUserJwtPayload | null>('current_user', null);

  const createBeverageWithId = createBeverage.bind(null, +menuId!, user!);
  const [formState, formAction] = useFormState(
    createBeverageWithId,
    initialState,
  );

  const { mutate } = useSWRConfig();

  const formRef = useRef<HTMLFormElement>(null);

  const handleCreateModalOnClose = () => {
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
      formRef.current?.reset();
      toast.success('New drink has been successfully added!');
    }
    console.log(formState, 'create');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useCloseForm(CREATE_BEVERAGE_FORM, setModalState);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mt-[16px] flex flex-col gap-2"
    >
      {formState.errorMessage && (
        <Typography variant="paragraph" className="text-sm text-red-400">
          {formState.errorMessage}
        </Typography>
      )}
      <Input
        type="text"
        name="name"
        placeholder="Name"
        className={clsx({
          'border-red-400': formState.errors?.name,
        })}
        defaultValue={formState.fieldValues?.name}
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
        <Input type="hidden" name="category" value={category.id} />
        <Input
          type="text"
          placeholder="Category"
          className={clsx('w-full', {
            'border-red-400': formState.errors?.category,
          })}
          value={category.name}
          defaultValue={formState.fieldValues?.category}
          onClick={handleOnCategoryClicked}
        />
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
        defaultValue={formState.fieldValues?.price}
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
        defaultValue={formState.fieldValues?.description}
      />
      <Typography variant="paragraph" className="text-sm text-red-400">
        {formState.errors?.description}
      </Typography>

      <div
        className={clsx(
          'relative flex items-center justify-between rounded-md border border-gray-300 p-3',
          {
            'border-red-400': formState.errors?.image,
          },
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
              <Image src={addImage} alt="add-image" width={40} height={40} />
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
      <Typography variant="paragraph" className="text-sm text-red-400">
        {formState.errors?.image}
      </Typography>

      <Input
        type="text"
        name="in_stock"
        placeholder="Quantity"
        className={clsx({
          'border-red-400': formState.errors?.in_stock,
        })}
        defaultValue={formState.fieldValues?.in_stock}
      />
      <Typography variant="paragraph" className="text-sm text-red-400">
        {formState.errors?.in_stock}
      </Typography>

      <div className="flex gap-2.5">
        <Button
          type="button"
          variant="outline"
          width="full"
          onClick={handleCreateModalOnClose}
        >
          Close
        </Button>

        <SubmitButton type="create" />
      </div>
    </form>
  );
};
