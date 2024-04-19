'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { TBeverage } from '@/entities/beverage';
import { beverage, delete_, edit } from '@/shared';

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
      <li className="flex flex-col justify-between rounded-lg border border-gray-300 bg-white">
        <div className="relative shrink-0">
          <Image
            src={beverage}
            alt="Beverage"
            className="rounded-l-lg rounded-bl-lg object-cover"
            style={{ width: '100%', height: '300px' }}
          />
          <span className="absolute bottom-3 right-3 text-blue-500">
            {isAvailable ? 'Available' : 'Unavailable'}
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-between p-2">
          <div className="flex flex-col justify-between gap-5 md:flex-row">
            <h2 className="break-words font-semibold md:w-2/4">{name}</h2>
            <span className="font-semibold">{price} ⃀</span>
          </div>
          <div className="flex justify-between">{/* <p>#{category}</p> */}</div>
          <h3 className="line-clamp-4 flex-1">{desc}</h3>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              router.push(`?${handleEditOnClick('id', String(id))}`);
              showEditModal();
            }}
            className="min-h-12 w-2/4 border-r border-t border-gray-300 pb-0"
          >
            <Image
              src={edit}
              alt="edit"
              style={{ width: '20px', height: '20px' }}
              className="mx-auto"
            />
          </button>
          <button className="min-h-12 w-2/4 border-t transition-colors duration-300 hover:bg-red-200">
            <Image
              src={delete_}
              alt="edit"
              style={{ width: '20px', height: '20px' }}
              className="mx-auto"
            />
          </button>
        </div>
      </li>
    </>
  );
};
