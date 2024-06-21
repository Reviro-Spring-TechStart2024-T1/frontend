'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSWRConfig } from 'swr';

import {
  Button,
  ESTABLISHMENT_EDIT_PATH,
  ESTABLISHMENT_PATH,
  Modal,
  Typography,
  useChosenEstablishmentContext,
  useDeleteEstablishment,
} from '@/shared';

export const PartnerProfile = () => {
  const { chosenEstablishment, isChosenEstablishmentLoading } =
    useChosenEstablishmentContext();
  const { data, trigger, error, isMutating } = useDeleteEstablishment(
    chosenEstablishment?.id,
  );
  const { mutate } = useSWRConfig();
  const pathname = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const establishmentId = 'establishmentId';

  const onEstablishmentDelete = () => {
    trigger();
  };
  const onModalOpen = () => {
    params.set(establishmentId, String(chosenEstablishment?.id));
    push(`${pathname}?${params.toString()}`);
  };
  const onModalClose = () => {
    params.delete(establishmentId, '');
    push(pathname);
  };

  useEffect(() => {
    if (data) {
      toast.success(
        `${chosenEstablishment?.name} has been successfully deleted!`,
      );

      params.delete(establishmentId, '');
      push(pathname);

      mutate('/establishments/partner/');
      localStorage.removeItem('establishment_id');
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error);

      params.delete(establishmentId, '');
      push(pathname);
    }
  }, [error]);

  if (isChosenEstablishmentLoading) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center">
        <Typography variant="h2">Loading...</Typography>
      </div>
    );
  }

  if (!isChosenEstablishmentLoading && !chosenEstablishment) {
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
    <div className="flex min-h-full flex-col gap-4">
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
        <Button variant="delete" onClick={onModalOpen}>
          Delete establishment
        </Button>
        <Modal
          query={establishmentId}
          isSubmitting={isMutating}
          onModalSubmit={onEstablishmentDelete}
          close={onModalClose}
        >
          Delete establishment
        </Modal>
      </div>
    </div>
  );
};
