'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useSWRConfig } from 'swr';

import { useChosenEstablishmentContext } from '@/app/_providers';
import {
  Button,
  ESTABLISHMENT_EDIT_PATH,
  ESTABLISHMENT_PATH,
  Typography,
  useDeleteEstablishment,
} from '@/shared';

export const PartnerProfile = () => {
  const { chosenEstablishment } = useChosenEstablishmentContext();
  const { data, trigger, error } = useDeleteEstablishment({
    id: chosenEstablishment?.id,
  });
  const { mutate } = useSWRConfig();

  const onDelete = () => {
    trigger();
  };

  useEffect(() => {
    if (data) {
      toast.success(
        `${chosenEstablishment?.name} has been successfully deleted!`,
      );

      localStorage.removeItem('establishment_id');

      mutate('/establishments/partner/');
    }
  }, [data]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  if (!chosenEstablishment?.name) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-4">
        <Typography variant="h2">No Establishment!</Typography>
        <Link
          href={ESTABLISHMENT_PATH}
          className="rounded-md bg-theme-grey-150 px-4 py-4 transition-colors duration-200 hover:bg-theme-grey-200 active:bg-theme-grey-300"
        >
          <Typography variant="h4">Create Establishment</Typography>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex flex-1 flex-col gap-2">
        <Typography variant="paragraph">
          <strong>Establishment name:</strong> {chosenEstablishment?.name}
        </Typography>
        <Typography variant="paragraph">
          <strong>Description:</strong> {chosenEstablishment?.description}
        </Typography>
        <Typography variant="paragraph">
          <strong> Happy hours:</strong> {chosenEstablishment?.happy_hour_start}{' '}
          - {chosenEstablishment?.happy_hour_end}
        </Typography>
        <Typography variant="paragraph">
          <strong>Email:</strong> {chosenEstablishment?.email}
        </Typography>
      </div>
      <div className="flex justify-end gap-2">
        <Link
          href={ESTABLISHMENT_EDIT_PATH}
          className="rounded-md bg-theme-grey-150 px-4 py-4 transition-colors duration-200 hover:bg-theme-grey-200 active:bg-theme-grey-300"
        >
          Edit establishment
        </Link>
        <Button variant="delete" onClick={onDelete}>
          Delete establishment
        </Button>
      </div>
    </div>
  );
};
