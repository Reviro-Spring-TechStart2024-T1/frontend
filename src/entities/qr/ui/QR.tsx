'use client';

import { FC, MouseEvent, useRef } from 'react';
import QRCode from 'react-qr-code';
import { RiDownloadLine, RiPrinterLine, RiShareLine } from '@remixicon/react';
import clsx from 'clsx';
import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';

import useLocalStorage from '@/shared/helper/hooks/useLocalStorage';
import { Button } from '@/shared/ui';

import styles from './QR.module.css';

export const QR: FC<{ isModalActive: boolean; closeModal: () => void }> = ({
  isModalActive,
  closeModal,
}) => {
  const [menuId] = useLocalStorage('menu_id', null);

  const qrRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = () => {
    qrRef.current &&
      toPng(qrRef.current)
        .then(dataUrl => {
          saveAs(dataUrl, 'qr-code.png');
        })
        .catch(err => {
          console.error('oops, something went wrong!', err);
        });
  };

  const handlePrint = () => {
    const qrSvg = qrRef.current?.querySelector('svg');
    if (!qrSvg) {
      console.error('QR code SVG not found');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(
        '<html><head><title>DrinkJoy</title></head><body>',
      );
      printWindow.document.write(qrSvg.outerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleShare = async () => {
    if (navigator.share && qrRef.current) {
      const dataUrl = await toPng(qrRef.current);
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'qr-code.png', { type: blob.type });

      try {
        await navigator.share({
          title: 'QR Code',
          files: [file],
        });
      } catch (error) {
        console.error('Sharing failed', error);
      }
    } else {
      alert('Sharing not supported');
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  return (
    <div
      className={clsx(styles.QRModal, {
        [styles.QRModalOpen]: isModalActive,
      })}
      onMouseDown={e => handleClickOutside(e as MouseEvent)}
    >
      <div
        ref={modalRef}
        style={{
          height: 'auto',
          margin: '0 auto',
          maxWidth: 300,
          width: '100%',
        }}
        className={clsx('flex flex-col rounded-md bg-white', {
          [styles.QRModalOpen]: 'shadow-[0px_0px_30px_3000px_rgba(0,0,0,0.7)]',
        })}
      >
        {menuId && (
          <div ref={qrRef}>
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={menuId}
              viewBox={`0 0 256 256`}
              className="p-4"
            />
          </div>
        )}

        <div className="flex flex-col gap-2 rounded-md border-t-[0.5px] border-gray-300 p-4">
          <Button
            type="button"
            onClick={handlePrint}
            variant="primary"
            width="full"
          >
            <RiPrinterLine />
          </Button>
          <Button
            type="button"
            onClick={handleDownload}
            variant="primary"
            width="full"
          >
            <RiDownloadLine />
          </Button>
          <Button
            type="button"
            onClick={handleShare}
            variant="primary"
            width="full"
          >
            <RiShareLine />
          </Button>
        </div>
      </div>
    </div>
  );
};
