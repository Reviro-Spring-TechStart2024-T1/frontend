'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';

import { Button } from '@/shared/ui';

import styles from './QR.module.css';

export const QR = () => {
  const [isQRClicked, setIsQRClicked] = useState(false); //TODO - show QR on click

  const menuId = localStorage.getItem('menu_id');

  return (
    <div className="absolute -bottom-9 -right-36 z-[10000] flex w-full -translate-y-2/4 items-center">
      <div className={styles.arrow} />
      <div
        style={{
          height: 'auto',
          margin: '0 auto',
          maxWidth: 300,
          width: '100%',
        }}
        className="rounded-md bg-white"
      >
        <QRCode
          size={256}
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
          value={menuId!}
          viewBox={`0 0 256 256`}
          className="p-4"
        />

        <div className="rounded-md border-t-[0.5px] border-gray-300 p-4">
          <Button type="button" variant="primary" width="full">
            Print
          </Button>
        </div>
      </div>
    </div>
  );
};
