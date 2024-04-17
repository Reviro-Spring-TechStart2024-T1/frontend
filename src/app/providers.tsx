'use client';

import { ReactNode } from 'react';

import { CreateModalFormContext, EditModalFormContext } from '@/shared';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CreateModalFormContext>
      <EditModalFormContext>{children}</EditModalFormContext>
    </CreateModalFormContext>
  );
}
