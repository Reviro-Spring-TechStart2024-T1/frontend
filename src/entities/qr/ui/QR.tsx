'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { getQRCode, TQRCode } from '@/entities/qr';
import { Button } from '@/shared/ui';

import styles from './QR.module.css';

export const QR = () => {
  const [isQRClicked, setIsQRClicked] = useState(false); //TODO - show QR on click
  const [QR, setQR] = useState<TQRCode | undefined>();

  const qrResponse = async () => {
    const response = await getQRCode(3); //TODO - what ID?

    setQR(response);
  };

  useEffect(() => {
    qrResponse();
  }, []);

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
        {QR && (
          <Image src={QR.qr_code_image} alt="qr" width={143} height={143} />
        )}

        <div className="rounded-md border-t-[0.5px] border-gray-300 p-4">
          <Button type="button" variant="primary" width="full">
            Print
          </Button>
        </div>
      </div>
    </div>
  );
};
