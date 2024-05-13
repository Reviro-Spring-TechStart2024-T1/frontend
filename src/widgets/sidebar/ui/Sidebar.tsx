import { RiLogoutBoxRLine } from '@remixicon/react';

import { QR } from '@/entities/qr';
import { Logo } from '@/shared/icons/Logo';
import { Button } from '@/shared/ui';
import { Navbar } from '@/widgets/navbar';

export const Sidebar = () => {
  return (
    <div className="relative bottom-[76px] md:hidden">
      <QR />

      <div className="fixed flex h-full w-32 flex-col items-center bg-[#111828] py-6 text-theme-white">
        <Logo />

        <Navbar />

        <div className="w-full p-4">
          <Button
            variant="link"
            width="full"
            size="sm"
            className="flex flex-col text-theme-grey-400 md:flex-row md:justify-start md:p-3"
          >
            <RiLogoutBoxRLine />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
