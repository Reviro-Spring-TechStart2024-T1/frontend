import {
  RiLogoutBoxRLine,
  RiMoneyDollarCircleLine,
  RiPieChart2Line,
  RiRestaurantLine,
  RiVipCrownLine,
} from '@remixicon/react';
import Link from 'next/link';

import { Logo } from '@/shared/icons/Logo';
import { Button } from '@/shared/ui';

export const Sidebar = () => {
  return (
    <div className="relative bottom-[76px]">
      <div className="fixed flex h-full w-[138px] flex-col items-center justify-between gap-10 bg-[#111828] px-4 text-theme-white">
        <div className="pt-9">
          <Logo />
        </div>

        <nav className="flex flex-col items-center overflow-auto overflow-x-hidden">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link href="/partner/dashboard">
                <Button variant="link" width="full" className="flex flex-col">
                  <RiPieChart2Line size={30} />
                  <span>Dashboard</span>
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/partner/menu">
                <Button variant="link" width="full" className="flex flex-col">
                  <RiRestaurantLine size={30} />
                  <span>Menu</span>
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/partner/customer">
                <Button variant="link" width="full" className="flex flex-col">
                  <RiVipCrownLine size={30} />
                  <span>Customer</span>
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/partner/orders">
                <Button variant="link" width="full" className="flex flex-col">
                  <RiMoneyDollarCircleLine size={30} />
                  Order
                </Button>
              </Link>
            </li>
          </ul>
        </nav>

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
