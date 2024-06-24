'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BannerForm } from '@/features';
import { PartnerInfoForm } from '@/features/partner-info-form/ui';
import { ESTABLISHMENT_EDIT_PATH, ESTABLISHMENT_PATH } from '@/shared';
import { Typography } from '@/shared/ui';

export const EstablishmentForms = () => {
  const pathname = usePathname();
  return (
    <div className="profile min-h-[calc(100dvh-144px)] p-10 lg:mx-[56px] lg:my-[72px] lg:p-0 sm:mx-[24px]">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <Typography variant="h2">Establishment details</Typography>

          <Typography variant="h5" className="text-theme-grey-500">
            {pathname === ESTABLISHMENT_PATH && 'Create establishment'}
            {pathname === ESTABLISHMENT_EDIT_PATH && 'Edit establishment'}
          </Typography>
        </div>
        <Link
          className="rounded-md bg-theme-white px-4 py-4 transition-colors duration-200 hover:bg-theme-grey-200 active:bg-theme-grey-300"
          href={`${pathname === ESTABLISHMENT_PATH ? ESTABLISHMENT_EDIT_PATH : ESTABLISHMENT_PATH}`}
        >
          {pathname === ESTABLISHMENT_PATH
            ? 'Edit establishments'
            : 'Create an establishment'}
        </Link>
      </div>

      <div className="flex flex-col gap-5">
        <PartnerInfoForm />
        <BannerForm />
      </div>
    </div>
  );
};
