'use client';

import { ReactNode } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {
  CreateModalContextProvider,
  DeleteModalProvider,
  EditModalContextProvider,
} from '@/shared';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CreateModalContextProvider>
      <EditModalContextProvider>
        <DeleteModalProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
          </LocalizationProvider>
        </DeleteModalProvider>
      </EditModalContextProvider>
    </CreateModalContextProvider>
  );
}
