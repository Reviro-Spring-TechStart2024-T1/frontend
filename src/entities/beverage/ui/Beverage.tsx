'use client';

import { FC } from 'react';
import { RiCheckboxLine } from '@remixicon/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useDeleteModal, useEditModal } from '@/app/_providers';
import { TBeverage } from '@/entities/beverage';
import {
  delete_,
  edit,
  PARTNER_MENU_PATH,
  PARTNER_ORDER_FOR_CLIENT_PATH,
  setId,
} from '@/shared';
import { Button, Typography } from '@/shared/ui';

export const Beverage: FC<TBeverage> = ({
  id,
  name,
  price,
  description,
  in_stock,
}) => {
  const { setModalState: setEditModalState } = useEditModal();
  const { setModalState: setDeleteModalState } = useDeleteModal();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSetId = (id: number) =>
    router.push(`?${setId(String(id), searchParams)}`, { scroll: false });

  const handleOnEdit = () => {
    handleSetId(id);
    setEditModalState(true);
  };

  const handleOnDelete = () => {
    handleSetId(id);
    setDeleteModalState(true);
  };

  const handleOnBeverageChosenForOrder = (id: number) => {
    //TODO - Single query param helper
    const params = new URLSearchParams(searchParams);
    params.set('bev_id', String(id));

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <li className="flex flex-col justify-between overflow-hidden rounded-lg border border-gray-300 bg-white">
        <div className="relative shrink-0">
          <div className="absolute bottom-[6px] right-[6px] rounded-md bg-[#00b3ff78] p-2">
            <Typography variant="caption" className="   text-white ">
              quantity: {in_stock}
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
            {description}
          </Typography>
        </div>
        {pathname === PARTNER_MENU_PATH && (
          <div className="flex divide-x divide-theme-grey-300 border-t">
            <Button
              variant="ghost"
              btnType="icon"
              width="full"
              className="rounded-none"
              onClick={handleOnEdit}
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
              onClick={handleOnDelete}
            >
              <Image
                src={delete_}
                alt="delete"
                style={{ width: '20px', height: '20px' }}
                className="mx-auto"
              />
            </Button>
          </div>
        )}
        {pathname === PARTNER_ORDER_FOR_CLIENT_PATH && (
          <div className="flex divide-x divide-theme-grey-300 border-t">
            <Button
              variant="ghost"
              btnType="icon"
              width="full"
              className="rounded-none"
              onClick={() => handleOnBeverageChosenForOrder(id)}
            >
              <RiCheckboxLine />
            </Button>
          </div>
        )}
      </li>
    </>
  );
};
