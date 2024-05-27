import { RiCalendarEventLine, RiUser4Line } from '@remixicon/react';

import { getFirstLetter } from '@/shared';
import { Section, Typography } from '@/shared/ui';

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  sex: string;
  date_of_birth: string;
  orders: [];
}
interface CustomerProps {
  customer?: Customer;
}

export const CustomerInfo = ({ customer }: CustomerProps) => {
  return (
    <Section>
      <div className="divide-y rounded-md border border-theme-grey-200 bg-theme-white md:text-center">
        <div className="p-8">
          <div className="inline-flex items-center md:flex-col md:space-y-3">
            <div className="flex">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-theme-grey-300">
                <Typography variant="h3" weight="medium">
                  {getFirstLetter(customer?.first_name)}
                </Typography>
              </div>
            </div>

            <div className="ml-5 md:ml-0">
              <Typography variant="h3" weight="medium">
                {customer?.first_name} {customer?.last_name}
              </Typography>
              <Typography variant="paragraph" color="grey">
                {customer?.email}
              </Typography>
            </div>
          </div>
        </div>

        <div className="flex divide-x md:flex-col md:divide-y">
          <div className="flex flex-1 justify-center p-4">
            <div className="flex gap-3">
              <RiCalendarEventLine />

              <div className="flex gap-1">
                <Typography variant="paragraph" weight="medium">
                  Birth:
                </Typography>
                <Typography variant="paragraph" color="grey">
                  {customer?.date_of_birth}
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-1 justify-center p-4">
            <div className="flex gap-3">
              <RiUser4Line />

              <div className="flex gap-1">
                <Typography variant="paragraph" weight="medium">
                  Sex:
                </Typography>
                <Typography variant="paragraph" color="grey">
                  {customer?.sex}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
