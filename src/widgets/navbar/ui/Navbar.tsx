'use client';

import { useState } from 'react';
import {
  RiExchangeFundsLine,
  RiFileListLine,
  RiPieChart2Line,
  RiQrCodeLine,
  RiQuestionAnswerLine,
  RiShoppingCartLine,
  RiTeamLine,
  RiUser2Line,
  RiUserSmileLine,
} from '@remixicon/react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { QR } from '@/entities/qr';
import {
  CATEGORIES_PATH,
  CUSTOMERS_PATH,
  DASHBOARD_PATH,
  MENU_PATH,
  ORDERS_PATH,
  PARTNERS_PATH,
  PROFILE_PATH,
  SUBSCRIPTION_ACTIVE_PATH,
  SUPPORT_PATH,
  useLocalStorage,
  USERS_PATH,
} from '@/shared';
import { Button } from '@/shared/ui';

interface User {
  refresh: string;
  access: string;
  role: 'admin' | 'partner';
}

export const Navbar = () => {
  const [user] = useLocalStorage<User | null>('current_user', null);

  const pathname = usePathname();

  const matchPathname = (link: string) => {
    const modifiedPathname = pathname.split('/').slice(1, 2).join('/');
    const modifiedLink = link.split('/').slice(1, 2).join('/');

    return modifiedPathname === modifiedLink;
  };

  const Links =
    user?.role === 'partner'
      ? [
          {
            label: 'Profile',
            icon: <RiUser2Line />,
            path: PROFILE_PATH,
          },
          {
            label: 'Dashboard',
            icon: <RiPieChart2Line />,
            path: DASHBOARD_PATH,
          },
          {
            label: 'Menu',
            icon: <RiFileListLine />,
            path: MENU_PATH,
          },
          {
            label: 'Customers',
            icon: <RiUserSmileLine />,
            path: CUSTOMERS_PATH,
          },
          {
            label: 'Orders',
            icon: <RiShoppingCartLine />,
            path: ORDERS_PATH,
          },
          {
            label: 'QR',
            icon: <RiQrCodeLine />,
            path: '',
          },
          {
            label: 'Support',
            icon: <RiQuestionAnswerLine />,
            path: SUPPORT_PATH,
          },
        ]
      : [
          {
            label: 'Users',
            icon: <RiUserSmileLine />,
            path: USERS_PATH,
          },
          {
            label: 'Partners',
            icon: <RiTeamLine />,
            path: PARTNERS_PATH,
          },
          {
            label: 'Categories',
            icon: <RiFileListLine />,
            path: CATEGORIES_PATH,
          },
          {
            label: 'Subscription',
            icon: <RiExchangeFundsLine />,
            path: SUBSCRIPTION_ACTIVE_PATH,
          },
          {
            label: 'Support',
            icon: <RiQuestionAnswerLine />,
            path: SUPPORT_PATH,
          },
        ];

  const [isQRClicked, setIsQRClicked] = useState(false); //TODO - show QR on click

  const handleQRState = () => {
    setIsQRClicked(true);
  };

  return (
    <>
      <QR
        isModalActive={isQRClicked}
        closeModal={() => setIsQRClicked(false)}
      />
      <nav className="no-scrollbar mt-9 w-full flex-1 overflow-auto overflow-x-hidden px-4 pb-6 pt-6 md:mt-0 md:block md:border-t md:border-theme-grey-300 md:border-opacity-20">
        <ul className="space-y-3">
          {Links.map((link, index) => {
            return (
              /* FIX_ME: Use reusable Link component */
              <li
                key={index}
                onClick={() => {
                  if (link.label === 'QR') {
                    handleQRState();
                  }
                }}
              >
                <Link href={link.path}>
                  <Button
                    variant="link"
                    width="full"
                    size="sm"
                    className={clsx(
                      'flex flex-col text-theme-grey-400 md:flex-row md:justify-start md:p-3',
                      {
                        ['bg-theme-blue-400 text-theme-white']: matchPathname(
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
    </>
  );
};
