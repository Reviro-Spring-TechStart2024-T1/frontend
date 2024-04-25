import { RiProfileLine } from '@remixicon/react';

import { Typography } from '@/shared/ui';

export const Header = () => {
  return (
    <header className="ml-[138px] h-[76px] bg-theme-white">
      <div className="container flex h-full items-center justify-between">
        <div className="flex">
          <Typography variant="paragraph" color="grey" format="capitalize">
            establishment
          </Typography>
        </div>

        <div className="flex gap-2">
          <Typography variant="paragraph" color="grey" format="capitalize">
            bublik
          </Typography>

          <RiProfileLine />
        </div>
      </div>
    </header>
  );
};
