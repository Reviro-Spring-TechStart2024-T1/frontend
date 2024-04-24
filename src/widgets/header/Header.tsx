import { RiProfileLine } from '@remixicon/react';

import { Typography } from '@/shared/ui';

export default function Header() {
  return (
    <header className="relative h-[64px]">
      <div className="w-header fixed ml-[138px] bg-theme-white">
        <div className="container flex justify-between py-5">
          <Typography variant="paragraph" color="grey" format="capitalize">
            establishment / customer data
          </Typography>

          <div className="flex gap-2">
            <Typography variant="paragraph" color="grey" format="capitalize">
              bublik
            </Typography>

            <RiProfileLine />
          </div>
        </div>
      </div>
    </header>
  );
}
