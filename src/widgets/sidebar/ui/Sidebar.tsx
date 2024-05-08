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

      <div className="fixed flex h-full w-[138px] flex-col items-center justify-between gap-10 bg-[#111828] text-theme-white">
        <div className="pt-9">
          <Logo />
        </div>

        <Navbar />

        <div className="w-full pb-9">
          <Link href="/partner/logout">
            <Button variant="link" width="full" className="flex flex-col">
              <RiLogoutBoxRLine size={30} />
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
