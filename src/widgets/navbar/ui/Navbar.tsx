'use client';

import {
  RiFileListLine,
  RiPieChart2Line,
  RiQrCodeLine,
  RiQuestionAnswerLine,
  RiShoppingCartLine,
  RiTeamLine,
  RiUserSmileLine,
} from '@remixicon/react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import useLocalStorage from '@/shared/helper/hooks/useLocalStorage';
import { Button } from '@/shared/ui';

interface User {
  refresh: string;
  access: string;
  role: 'admin' | 'partner';
}

export const Navbar = () => {
  const [user] = useLocalStorage<User | null>('current_user', null);

  const pathname = usePathname();

  const Links =
    user?.role === 'partner'
      ? [
          {
            label: 'Dashboard',
            icon: <RiPieChart2Line />,
            path: '/partner/dashboard',
          },
          {
            label: 'Menu',
            icon: <RiFileListLine />,
            path: '/partner/menu',
          },
          {
            label: 'Customers',
            icon: <RiUserSmileLine />,
            path: '/partner/customer',
          },
          {
            label: 'Orders',
            icon: <RiShoppingCartLine />,
            path: '/partner/orders',
          },
          {
            label: 'QR',
            icon: <RiQrCodeLine />,
            path: '',
          },
        ]
      : [
          {
            label: 'Users',
            icon: <RiUserSmileLine />,
            path: '/admin/users',
          },
          {
            label: 'Partners',
            icon: <RiTeamLine />,
            path: '/admin/partners',
          },
          {
            label: 'Menu',
            icon: <RiFileListLine />,
            path: '/admin/menu',
          },
          {
            label: 'Support',
            icon: <RiQuestionAnswerLine />,
            path: '/admin/support',
          },
        ];

  return (
    <nav className="no-scrollbar mt-9 w-full flex-1 overflow-auto overflow-x-hidden px-4 pb-6 pt-6 md:mt-0 md:block md:border-t md:border-theme-grey-300 md:border-opacity-20">
      <ul className="space-y-3">
        {Links.map((link, index) => {
          return (
            /* FIX_ME: Use reusable Link component */
            <li key={index}>
              <Link href={link.path}>
                <Button
                  variant="link"
                  width="full"
                  size="sm"
                  className={clsx(
                    'flex flex-col text-theme-grey-400 md:flex-row md:justify-start md:p-3',
                    {
                      ['bg-theme-blue-400 text-theme-white']:
                        link.path.length && pathname.includes(link.path),
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
