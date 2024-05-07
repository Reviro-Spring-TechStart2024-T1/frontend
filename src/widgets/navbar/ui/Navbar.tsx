import {
  RiFileListLine,
  RiGroupLine,
  RiPieChart2Line,
  RiQrCodeLine,
  RiShoppingCartLine,
} from '@remixicon/react';
import Link from 'next/link';

import { Button } from '@/shared/ui';

export const Navbar = () => {
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
      path: '',
    },
  ];

  return (
    <nav className="flex flex-col items-center overflow-auto overflow-x-hidden sm:block sm:border-t sm:border-theme-grey-300 sm:border-opacity-20">
      <ul className="flex flex-col space-y-2 p-4">
        {Links.map((link, index) => {
          return (
            /* FIX_ME: Use reusable Link component */
            <li key={index}>
              <Link href={link.path}>
                <Button
                  variant="link"
                  width="full"
                  className="flex flex-col sm:flex-row sm:justify-start sm:p-3"
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
