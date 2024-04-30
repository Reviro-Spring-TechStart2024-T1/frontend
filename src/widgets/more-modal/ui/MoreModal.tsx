import { useState } from 'react';
import { RiDeleteBinLine, RiEditLine, RiMoreLine } from '@remixicon/react';
import clsx from 'clsx';

import { Button } from '@/shared/ui';

export const MoreModal = ({ id }: { id: number }) => {
  const [isMore, setIsMore] = useState(0);

  const handleMore = (id: number) => {
    if (id === isMore) return setIsMore(0);

    setIsMore(id);
  };

  return (
    <>
      {/* FIX_ME: if the modal is opened next to the end of the tabel it got broken */}
      <Button
        variant="ghost"
        size="sm"
        className="font-semibold"
        onBlur={() => handleMore(0)}
        onClick={() => handleMore(id)}
      >
        <RiMoreLine size={24} className="text-theme-grey-500" />
      </Button>

      <div
        className={clsx(
          'absolute -left-16 z-10 mt-1 hidden w-32 rounded-md border border-theme-grey-200 bg-theme-white p-2 shadow-lg',
          { ['!block']: isMore === id },
        )}
      >
        <Button
          variant="ghost"
          size="sm"
          width="full"
          className="justify-start font-medium text-theme-grey-500"
        >
          <RiEditLine size={16} />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          width="full"
          className="justify-start font-medium text-theme-grey-500"
        >
          <RiDeleteBinLine size={16} />
          Delete
        </Button>
      </div>
    </>
  );
};
