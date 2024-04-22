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

export default function Sidebar() {
  return (
    <div className="relative">
      <div className="fixed flex h-full w-[138px] flex-col items-center justify-between gap-10 bg-[#111828] px-4 text-theme-white">
        <div className="pt-9">
          <Logo />
        </div>

        <nav className="flex flex-col items-center overflow-auto overflow-x-hidden">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link href="/partner/dashboard">
                <Button variant="link" width="full" className="flex flex-col">
                  <RiPieChart2Line />
                  <span>Dashboard</span>
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/partner/menu">
                <Button variant="link" width="full" className="flex flex-col">
                  <RiRestaurantLine />
                  <span>Menu</span>
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/partner/customer">
                <Button variant="link" width="full" className="flex flex-col">
                  <RiVipCrownLine />
                  <span>Customer Data</span>
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/partner/order">
                <Button variant="link" width="full" className="flex flex-col">
                  <RiMoneyDollarCircleLine />
                  Order
                </Button>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="pb-9">
          <Link href="/partner/logout">
            <Button variant="link" width="full" className="flex flex-col">
              <RiLogoutBoxRLine />
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
