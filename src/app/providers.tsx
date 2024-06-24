'use client';

import { ReactNode } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {
  CreateModalContextProvider,
  CreatePartnerModalContextProvider,
  DeleteModalProvider,
  EditModalContextProvider,
} from './_providers';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CreateModalContextProvider>
      <EditModalContextProvider>
        <DeleteModalProvider>
          <CreatePartnerModalContextProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {children}
            </LocalizationProvider>
          </CreatePartnerModalContextProvider>
        </DeleteModalProvider>
      </EditModalContextProvider>
    </CreateModalContextProvider>
  );
}
