'use client';

import {
  RiFileListLine,
  RiGroupLine,
  RiPieChart2Line,
  RiQrCodeLine,
  RiShoppingCartLine,
} from '@remixicon/react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/shared/ui';

export const Navbar = () => {
  const pathname = usePathname();

  const Links = [
    {
      label: 'Dashboard',
      icon: <RiPieChart2Line size={30} />,
      path: '/partner/dashboard',
    },
    {
      label: 'Menu',
      icon: <RiFileListLine size={30} />,
      path: '/partner/menu',
    },
    {
      label: 'Customers',
      icon: <RiGroupLine size={30} />,
      path: '/partner/customer',
    },
    {
      label: 'Orders',
      icon: <RiShoppingCartLine size={30} />,
      path: '/partner/orders',
    },
    {
      label: 'QR',
      icon: <RiQrCodeLine size={30} />,
      path: '#',
    },
  ];

  return (
    <nav className="flex flex-col items-center overflow-auto overflow-x-hidden sm:block sm:border-t sm:border-theme-grey-300 sm:border-opacity-20">
      <ul className="flex flex-col space-y-3 p-4">
        {Links.map((link, index) => {
          return (
            /* FIX_ME: Use reusable Link component */
            <li key={index}>
              <Link href={link.path}>
                <Button
                  variant="link"
                  width="full"
                  className={clsx(
                    'flex flex-col text-theme-grey-400 sm:flex-row sm:justify-start sm:p-3',
                    {
                      ['bg-theme-blue-400 text-theme-white']: pathname.includes(
                        link.path,
                      ),
                    },
                  )}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Button>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
