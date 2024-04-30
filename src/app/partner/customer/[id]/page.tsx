import { RiCalendar2Line } from '@remixicon/react';
import { Metadata } from 'next';
import Image from 'next/image';

import { Section, Typography } from '@/shared/ui';
import { Container } from '@/shared/ui/Container/Container';
import { BeverageTable } from '@/widgets/beverage-table';

export const metadata: Metadata = {
  title: 'Customer Profile',
};

interface CustomerProfileProps {
  params: {
    id: string;
  };
}

export default function CustomerProfile({
  params: { id },
}: CustomerProfileProps) {
  return (
    <Container title="Customer Profile">
      <Section>
        <div className="flex flex-col justify-between rounded-md border border-gray-300 bg-theme-white">
          <div className="m-8 flex">
            <Image src="/user.png" width={100} height={100} alt="user" />
            <div className="py-4 pl-5">
              <Typography variant="h3">Aktan</Typography>
              <Typography
                variant="paragraph"
                className="text-[#3c3c3c] opacity-80"
              >
                aktan@gmail.com
              </Typography>
            </div>
          </div>
          <div className="flex h-[54px] divide-x border-t border-gray-300">
            <div className="flex h-full w-2/4 items-center justify-center border-r border-gray-300">
              <RiCalendar2Line />
              <div className="ml-2.5 flex gap-1">
                <Typography variant="paragraph" weight="medium">
                  Joined:
                </Typography>
                <Typography variant="paragraph" className="text-[#3c3c3c]">
                  01.01.2004
                </Typography>
              </div>
            </div>
            <div className="flex w-2/4 items-center justify-center">
              <RiCalendar2Line />
              <div className="ml-2.5 flex gap-1">
                <Typography variant="paragraph" weight="medium">
                  Age:
                </Typography>
                <Typography variant="paragraph" className="text-[#3c3c3c]">
                  50
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <BeverageTable />
    </Container>
  );
}
