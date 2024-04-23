import { RiCalendar2Line } from '@remixicon/react';
import Image from 'next/image';

import { TUser } from '@/entities/user';
import { NO_INDEX_PAGE } from '@/shared';
import { Typography } from '@/shared/ui';

export const generateMetadata = ({
  params,
}: {
  params: { userId: string };
}) => {
  return {
    title: 'UserID: ' + params.userId,
    ...NO_INDEX_PAGE,
  };
};

const getUserById = async (id: number) => {
  const res: TUser = await fetch(`${process.env.API_URL}/users/${id}`, {
    next: {
      revalidate: 5,
    },
  }).then(res => res.json());

  return res;
};

export default async function Page({ params }: { params: { userId: string } }) {
  const user = await getUserById(+params.userId);
  console.log(user);

  return (
    <div className="my-[72px] min-h-[calc(100dvh-144px)] px-[56px]">
      <Typography variant="h2" weight="bold">
        Customer Profile
      </Typography>
      <div className="mt-8 flex flex-col justify-between rounded-md border border-gray-300 bg-white">
        <div className="mx-8 mb-11 mt-8 flex">
          <Image src="/user.png" width={100} height={100} alt="user" />
          <div className="py-4 pl-5">
            <Typography variant="h3">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-[#3c3c3c] opacity-80"
            >
              {user.email}
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
                {user.joinedAt}
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
                {user.age}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
