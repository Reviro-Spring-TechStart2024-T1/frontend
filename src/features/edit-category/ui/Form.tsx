'use client';

import { FC, FormEvent, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSWRConfig } from 'swr';

import { TFormProps, useEditCategory } from '@/shared';
import { Button, Input, Typography } from '@/shared/ui';

export const Form: FC<TFormProps> = ({ setModalState }) => {
  const searchParams = useSearchParams();

  const categoryId = searchParams.get('id');

  const { trigger, isMutating, data } = useEditCategory(categoryId!);

  const { mutate } = useSWRConfig();

  const handleOnClose = () => {
    setModalState(false);
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');

    trigger({ name: name });
  };

  useEffect(() => {
    if (data) {
      setModalState(false);

      mutate(`/categories/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <form onSubmit={handleOnSubmit} className="mt-[16px] flex flex-col gap-3">
      <Input type="text" name="name" placeholder="Name" />

      <div className="flex gap-2.5">
        <Button
          type="button"
          variant="outline"
          onClick={handleOnClose}
          className="w-2/4"
        >
          Close
        </Button>

        <Button className="w-2/4">
          <Typography variant="paragraph">
            {isMutating ? 'Editing...' : 'Edit'}
          </Typography>
        </Button>
      </div>
    </form>
  );
};
