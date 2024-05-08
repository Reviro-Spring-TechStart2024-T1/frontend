import { RiLogoutBoxRLine } from '@remixicon/react';
import Link from 'next/link';

import { QR } from '@/entities/qr';
import { Logo } from '@/shared/icons/Logo';
import { Button } from '@/shared/ui';
import { Navbar } from '@/widgets/navbar';

export const Sidebar = () => {
  return (
    <div className="relative bottom-[76px] sm:hidden">
      <QR />

      <div className="fixed flex h-full w-[138px] flex-col items-center bg-[#111828] py-9 text-theme-white">
        <Logo />

        <Navbar />

        <div className="w-full p-4">
          <Link href="/logout">
            <Button
              variant="link"
              width="full"
              className="flex flex-col text-theme-grey-400 sm:flex-row sm:justify-start sm:p-3"
            >
              <RiLogoutBoxRLine size={30} />
              <span>Logout</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
