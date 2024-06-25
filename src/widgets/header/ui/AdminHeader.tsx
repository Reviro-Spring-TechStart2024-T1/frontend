'use client';
import { useEffect, useState } from 'react';
import { RiMenuFill, RiProfileLine } from '@remixicon/react';
import { usePathname } from 'next/navigation';

import { Button, Typography } from '@/shared/ui';
import { Dropdown } from '@/widgets/dropdown';
import { Navbar } from '@/widgets/navbar';

export const AdminHeader = () => {
  const pathname = usePathname();
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    setShowDropDown(false);
  }, [pathname]);

  return (
    <header className="ml-[128px] w-header bg-theme-white shadow-md md:ml-0 md:w-full md:bg-[#111828] md:text-theme-white">
      <div className="mx-auto hidden h-[60px] max-w-none items-center px-4 md:flex">
        <div className="flex flex-1 gap-4">
          <Button variant="none" onClick={() => setShowDropDown(!showDropDown)}>
            <RiMenuFill />
          </Button>

          {/* FIX_ME: place img logo */}
        </div>

        <div className="flex flex-1 justify-end">
          <Button variant="none">
            <Typography variant="paragraph">Admin</Typography>

            <RiProfileLine />
          </Button>
        </div>
      </div>

      {showDropDown ? (
        <Dropdown>
          <Navbar />
        </Dropdown>
      ) : null}

      <div className="mx-auto flex h-[76px] max-w-7xl items-center px-8 md:hidden ">
        <div className="flex-1">
          <Typography variant="caption" color="grey">
            DrinkJoy
          </Typography>
        </div>

        <div className="flex flex-1 justify-end gap-2">
          <Typography variant="paragraph" color="grey">
            Admin
          </Typography>

          <RiProfileLine />
        </div>
      </div>
    </header>
  );
};
