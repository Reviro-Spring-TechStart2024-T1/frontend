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
  ADMIN_MENU_PATH,
  ADMIN_PARTNERS_PATH,
  ADMIN_SUBSCRIPTION_ACTIVE_PATH,
  ADMIN_SUPPORT_PATH,
  ADMIN_USERS_PATH,
  PARTNER_CUSTOMERS_PATH,
  PARTNER_DASHBOARD_PATH,
  PARTNER_MENU_PATH,
  PARTNER_ORDERS_PATH,
  PARTNER_PROFILE_PATH,
  PARTNER_SUPPORT_PATH,
  useLocalStorage,
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
    const modifiedPathname = pathname.split('/').slice(0, 3).join('/');
    const modifiedLink = link.split('/').slice(0, 3).join('/');

    return modifiedPathname === modifiedLink;
  };

  const Links =
    user?.role === 'partner'
      ? [
          {
            label: 'Profile',
            icon: <RiUser2Line />,
            path: PARTNER_PROFILE_PATH,
          },
          {
            label: 'Dashboard',
            icon: <RiPieChart2Line />,
            path: PARTNER_DASHBOARD_PATH,
          },
          {
            label: 'Menu',
            icon: <RiFileListLine />,
            path: PARTNER_MENU_PATH,
          },
          {
            label: 'Customers',
            icon: <RiUserSmileLine />,
            path: PARTNER_CUSTOMERS_PATH,
          },
          {
            label: 'Orders',
            icon: <RiShoppingCartLine />,
            path: PARTNER_ORDERS_PATH,
          },
          {
            label: 'QR',
            icon: <RiQrCodeLine />,
            path: '',
          },
          {
            label: 'Support',
            icon: <RiQuestionAnswerLine />,
            path: PARTNER_SUPPORT_PATH,
          },
        ]
      : [
          {
            label: 'Users',
            icon: <RiUserSmileLine />,
            path: ADMIN_USERS_PATH,
          },
          {
            label: 'Partners',
            icon: <RiTeamLine />,
            path: ADMIN_PARTNERS_PATH,
          },
          {
            label: 'Menu',
            icon: <RiFileListLine />,
            path: ADMIN_MENU_PATH,
          },
          {
            label: 'Subscription',
            icon: <RiExchangeFundsLine />,
            path: ADMIN_SUBSCRIPTION_ACTIVE_PATH,
          },
          {
            label: 'Support',
            icon: <RiQuestionAnswerLine />,
            path: ADMIN_SUPPORT_PATH,
          },
        ];

  const [isQRClicked, setIsQRClicked] = useState(false);

  const handleQRState = () => {
    setIsQRClicked(true);
  };

  return (
    <>
      {pathname.includes('partner') && (
        <QR
          isModalActive={isQRClicked}
          closeModal={() => setIsQRClicked(false)}
        />
      )}
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
