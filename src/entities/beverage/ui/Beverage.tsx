'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { TBeverage } from '@/entities/beverage';
import { beverage, delete_, edit } from '@/shared';
import { Button, Typography } from '@/shared/ui';

export const Beverage = ({
  id,
  name,
  category,
  price,
  desc,
  isAvailable,
  showEditModal,
}: TBeverage & { showEditModal: () => void }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleEditOnClick = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <>
      <li className="flex flex-col justify-between overflow-hidden rounded-lg border border-gray-300 bg-white">
        <div className="relative shrink-0">
          <Image
            src={beverage}
            alt="Beverage"
            className="rounded-l-lg rounded-bl-lg object-cover"
            style={{ width: '100%', height: '300px' }}
          />
          <Typography
            variant="caption"
            className="absolute bottom-3 right-3 text-blue-500"
          >
            {isAvailable ? 'Available' : 'Unavailable'}
          </Typography>
        </div>
        <div className="flex flex-1 flex-col justify-between p-2">
          <div className="flex flex-col justify-between gap-5 md:flex-row">
            <Typography variant="h5" className="break-words md:w-2/4">
              {name}
            </Typography>

            <Typography variant="h5" weight="bold">
              {price} ⃀
            </Typography>
          </div>
          <Typography variant="caption" className="line-clamp-4 flex-1">
            {desc}
          </Typography>
        </div>
        <div className="flex divide-x divide-theme-grey-300 border-t">
          <Button
            variant="ghost"
            btnType="icon"
            width="full"
            className="rounded-none"
            onClick={() => {
              router.push(`?${handleEditOnClick('id', String(id))}`);
              showEditModal();
            }}
          >
            <Image
              src={edit}
              alt="edit"
              style={{ width: '20px', height: '20px' }}
              className="mx-auto"
            />
          </Button>

          <Button
            variant="delete"
            btnType="icon"
            width="full"
            className="rounded-none"
          >
            <Image
              src={delete_}
              alt="edit"
              style={{ width: '20px', height: '20px' }}
              className="mx-auto"
            />
          </Button>
        </div>
      </li>
    </>
  );
};
