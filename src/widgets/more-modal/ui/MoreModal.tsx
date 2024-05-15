import { RiDeleteBinLine, RiEditLine, RiMoreLine } from '@remixicon/react';
import clsx from 'clsx';

import { Button } from '@/shared/ui';

interface MoreModalProps {
  id: number;
  show: number;
  onShow: (value: number) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const MoreModal = ({
  id,
  show,
  onShow,
  onEdit,
  onDelete,
}: MoreModalProps) => {
  return (
    <>
      {/* FIX_ME: if the modal is opened next to the end of the tabel it got broken */}
      <Button
        variant="ghost"
        size="sm"
        className="font-semibold"
        onClick={() => onShow(id)}
      >
        <RiMoreLine size={24} className="text-theme-grey-500" />
      </Button>

      <div
        className={clsx(
          'absolute -left-16 z-10 mt-1 hidden w-32 rounded-md border border-theme-grey-200 bg-theme-white p-2 shadow-lg',
          { ['!block']: show === id },
        )}
      >
        <Button
          variant="ghost"
          size="sm"
          width="full"
          className="justify-start font-medium text-theme-grey-500"
          onClick={onEdit}
        >
          <RiEditLine size={16} />
          Edit
        </Button>

        <Button
          variant="ghost"
          size="sm"
          width="full"
          className="justify-start font-medium text-theme-grey-500"
          onClick={onDelete}
        >
          <RiDeleteBinLine size={16} />
          Delete
        </Button>
      </div>
    </>
  );
};
