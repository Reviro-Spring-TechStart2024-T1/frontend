'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';

import { Button } from '@/shared/ui';

import styles from './QR.module.css';

export const QR = () => {
  const [isQRClicked, setIsQRClicked] = useState(false);

  return (
    <div className="absolute -right-20 top-2/4 z-[10000] flex h-full w-full -translate-y-2/4 items-center">
      <div className={styles.arrow} />
      <div
        style={{
          height: 'auto',
          margin: '0 auto',
          maxWidth: 300,
          width: '100%',
        }}
        className=" rounded-md bg-white"
      >
        <QRCode
          size={256}
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
          value={'qwerty'}
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
