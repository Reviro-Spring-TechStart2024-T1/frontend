'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useSearchParams } from 'next/navigation';

import { IUserJwtPayload } from '@/entities/user';
import { deleteBeverage } from '@/features/delete-beverage';
import { SubmitButton } from '@/features/submit-form';
import { DELETE_BEVERAGE, useCloseForm, useDeleteModal } from '@/shared';
import useLocalStorage from '@/shared/helper/hooks/useLocalStorage';
import { Button, Typography } from '@/shared/ui';

export const DeleteConfirmation = () => {
  const { setModalState } = useDeleteModal();

  const [id, setId] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const handleDeleteModalOnClose = () => {
    setModalState(false);
  };

  const [user] = useLocalStorage<IUserJwtPayload | null>('current_user', null);

  const deleteBeverateWithId = deleteBeverage.bind(null, +id!, user!);
  const [formState, formAction] = useFormState(deleteBeverateWithId, {
    message: '',
    errorMessage: '',
  });

  useEffect(() => {
    if (formState.message === 'success') {
      setModalState(false);
    }
  }, [formState, setModalState]);

  useEffect(() => {
    setId(searchParams.get('id'));
  }, [searchParams]);

  useCloseForm(DELETE_BEVERAGE, setModalState);

  return (
    <>
      {formState.errorMessage && (
        <Typography
          variant="paragraph"
          className="mb-4 rounded-md border border-red-300 py-2 text-center text-red-400"
        >
          {formState.errorMessage}
        </Typography>
      )}
      <form action={formAction} className="flex gap-2.5">
        <Button
          type="button"
          variant="outline"
          width="full"
          onClick={handleDeleteModalOnClose}
        >
          Close
        </Button>
        <SubmitButton type="delete" />
      </form>
    </>
  );
};
