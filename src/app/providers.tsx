'use client';

import { ReactNode } from 'react';

import {
  CreateModalContextProvider,
  DeleteModalProvider,
  EditModalContextProvider,
} from '@/shared';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CreateModalContextProvider>
      <EditModalContextProvider>
        <DeleteModalProvider>{children}</DeleteModalProvider>
      </EditModalContextProvider>
    </CreateModalContextProvider>
  );
}
