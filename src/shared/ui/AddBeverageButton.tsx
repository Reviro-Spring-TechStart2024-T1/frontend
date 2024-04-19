'use client';

import { FC } from 'react';
import Image from 'next/image';

import { edit as add, useCreateModal } from '@/shared';

export const AddBeverageButton: FC = () => {
  const { setModalState } = useCreateModal();

  return (
    <button
      onClick={() => setModalState(true)}
      className="flex items-center gap-2 rounded-lg bg-white px-10 py-2"
    >
      <span className="text-base">Add Beverage</span>
      <Image src={add} alt="add" width={20} height={20} />
    </button>
  );
};
