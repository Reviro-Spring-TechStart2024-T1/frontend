'use client';

import { FC } from 'react';
import Image from 'next/image';

import { edit as add, useCreateModal } from '@/shared';

import { Button } from './Button';

export const AddBeverageButton: FC = () => {
  const { setModalState } = useCreateModal();

  return (
    <Button variant="outline" onClick={() => setModalState(true)}>
      <span className="text-base">Add Beverage</span>
      <Image src={add} alt="add" width={20} height={20} />
    </Button>
  );
};
