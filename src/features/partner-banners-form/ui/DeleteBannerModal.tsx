'use client';

import { FC, memo, useRef } from 'react';
import clsx from 'clsx';

import { SubmitButton } from '@/features/submit-form';
import { Button, Typography } from '@/shared';

type TProps = {
  isActive: boolean;
  close: () => void;
};

export const DeleteBannerModal: FC<TProps> = memo(function DeleteBannerModal({
  //TODO - Think of a way, make time, not to repeat modals over and over (refactor)
  isActive,
  close,
}) {
  // const searchParams = useSearchParams();
  // const bannerId = searchParams.get('bannerId');

  // const { deleteBanner, bannerDeletionError, isBannerDeleting } =
  //   useDeleteBanner(bannerId);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      close();
    }
  };

  return (
    <div
      className={clsx(
        'fixed inset-0 z-20 flex flex-col items-center justify-center bg-black/80 shadow-2xl transition-opacity duration-200',
        {
          'invisible opacity-0': !isActive,
          'visible opacity-100': isActive,
        },
      )}
      onMouseDown={e => {
        handleClickOutside(e as any);
      }}
    >
      <div ref={modalRef} className="w-1/2 rounded-md bg-theme-grey-300 p-10">
        <Typography variant="h5" weight="medium" className="text-center">
          Do you want to delete the banner?
        </Typography>
        <Typography
          variant="paragraph"
          weight="regular"
          className="my-5 text-center"
        >
          Irreversible action.
        </Typography>
        {/* {bannerDeletionError && <Error>{bannerDeletionError}</Error>} */}
        <div className="flex gap-2">
          <Button variant="outline" className="w-full" onClick={() => close()}>
            Close
          </Button>
          <SubmitButton
          // onClick={() => deleteBanner()}
          // isMutating={isBannerDeleting}
          >
            Delete
          </SubmitButton>
        </div>
      </div>
    </div>
  );
});
