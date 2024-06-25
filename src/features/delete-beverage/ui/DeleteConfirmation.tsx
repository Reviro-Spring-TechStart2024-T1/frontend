'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { useSWRConfig } from 'swr';

import {
  useChosenEstablishmentContext,
  useDeleteModal,
} from '@/app/_providers';
import { deleteBeverage } from '@/features/delete-beverage';
import { SubmitButton } from '@/features/submit-form';
import { IUserJwtPayload, useLocalStorage } from '@/shared';
import { DELETE_BEVERAGE, useCloseForm } from '@/shared';
import { Button, Typography } from '@/shared/ui';

export const DeleteConfirmation = () => {
  const { setModalState } = useDeleteModal();

  const [id, setId] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const { mutate } = useSWRConfig();

  const handleDeleteModalOnClose = () => {
    setModalState(false);
  };

  const { chosenEstablishment } = useChosenEstablishmentContext();
  const [user] = useLocalStorage<IUserJwtPayload | null>('current_user', null);

  const deleteBeverateWithId = deleteBeverage.bind(null, +id!, user!);
  const [formState, formAction] = useFormState(deleteBeverateWithId, {
    message: '',
    errorMessage: '',
  });

  useEffect(() => {
    if (formState.message === 'success') {
      toast.success('The beverage has been deleted!');
      mutate(`/menus/${chosenEstablishment?.menu_id}/`);
      setModalState(false);
    }
  }, [formState, setModalState]);

  useEffect(() => {
    setId(searchParams.get('id'));
  }, [searchParams]);

  useCloseForm({ elementId: DELETE_BEVERAGE, setter: setModalState });

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
        <SubmitButton>Delete</SubmitButton>
      </form>
    </>
  );
};
