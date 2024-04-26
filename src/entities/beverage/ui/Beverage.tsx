'use client';

import { FC, useCallback } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { TBeverage } from '@/entities/beverage';
import {
  beverage,
  delete_,
  edit,
  useDeleteModal,
  useEditModal,
} from '@/shared';
import { Button, Typography } from '@/shared/ui';

export const Beverage: FC<TBeverage> = ({
  id,
  name,
  price,
  desc,
  quantity,
}) => {
  const { setModalState: setEditModalState } = useEditModal();
  const { setModalState: setDeleteModalState } = useDeleteModal();

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleIconOnClick = useCallback(
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
          <div className="absolute bottom-[6px] right-[6px] rounded-md bg-[#00b3ff78] p-2">
            <Typography variant="caption" className="   text-white ">
              quantity: {quantity}
            </Typography>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-1 p-2">
          <div className="flex flex-col justify-between gap-1">
            <Typography variant="h5" className="break-words">
              {name}
            </Typography>

            <Typography variant="h5" weight="bold">
              {price} ⃀
            </Typography>
          </div>
          <Typography
            variant="caption"
            className="line-clamp-4 flex-1 text-[#3C3C3C]"
          >
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
              router.push(`?${handleIconOnClick('id', String(id))}`);
              setEditModalState(true);
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
            onClick={() => {
              router.push(`?${handleIconOnClick('id', String(id))}`);
              setDeleteModalState(true);
            }}
          >
            <Image
              src={delete_}
              alt="delete"
              style={{ width: '20px', height: '20px' }}
              className="mx-auto"
            />
          </Button>
        </div>
      </li>
    </>
  );
};
