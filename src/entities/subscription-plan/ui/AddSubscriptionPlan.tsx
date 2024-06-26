'use client';

import toast from 'react-hot-toast';
import { RiAddLine } from '@remixicon/react';

import { Button, Typography, useModal } from '@/shared';

export const AddSubscriptionPlan = ({
  isExceeded,
}: {
  isExceeded?: boolean;
}) => {
  const { onOpen } = useModal();

  const handleOpenModal = () => {
    if (isExceeded) {
      return toast.error(
        'The max amount of plan is exceeded. Please archive or delete the active plan',
      );
    }

    return onOpen('createPlan');
  };

  return (
    <div className="flex h-80 flex-col items-center justify-center space-y-6 rounded-md border px-4 pb-4 pt-6 text-center shadow-lg">
      <div className="inline-block rounded-full border border-dashed p-4 text-center">
        <RiAddLine />
      </div>

      <div className="space-y-1">
        <Typography variant="paragraph" weight="medium">
          Add new paid plan
        </Typography>

        <Typography variant="caption" color="grey">
          You’re ready to take your establishment experience to the next level
        </Typography>
      </div>

      <Button type="submit" size="xl" radius="full" onClick={handleOpenModal}>
        Create plan
      </Button>
    </div>
  );
};
