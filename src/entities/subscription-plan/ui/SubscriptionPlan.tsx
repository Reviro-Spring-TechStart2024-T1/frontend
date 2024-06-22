'use client';

import {
  RiAddLine,
  RiArchiveLine,
  RiDeleteBinLine,
  RiEditLine,
} from '@remixicon/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button, Typography } from '@/shared';

import { PlanProps } from '../types';

export const SubscriptionPlan = ({ type, plan }: PlanProps) => {
  const { name, description, price, period } = plan;

  const pathname = usePathname();

  return (
    <>
      {type === 1 ? (
        <div className="flex flex-col justify-between rounded-md border px-4 pb-4 pt-6 shadow-lg">
          <div className="space-y-6">
            <Typography
              variant="paragraph"
              weight="medium"
              format="uppercase"
              className="line-clamp-1"
            >
              {name}
            </Typography>

            <div>
              <Typography variant="h3" weight="medium">
                ${price}
              </Typography>
              <Typography variant="caption" color="grey" format="lowercase">
                per {period}
              </Typography>
            </div>

            <Typography variant="caption" color="grey" className="line-clamp-3">
              {description} Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Ipsa nemo assumenda nihil eos vitae error.
            </Typography>
          </div>

          <div>
            <hr className="my-6" />

            <div className="flex justify-between">
              <Button
                className="gap-1"
                variant="outline"
                size="md"
                radius="full"
              >
                <RiEditLine size={16} />
                Edit
              </Button>
              <Button
                className="gap-1"
                variant="outline"
                size="md"
                radius="full"
              >
                <RiArchiveLine size={16} />
                Archieve
              </Button>
              <Button
                className="gap-1"
                variant="outline"
                size="md"
                radius="full"
              >
                <RiDeleteBinLine size={16} />
                Delete
              </Button>
            </div>
          </div>
        </div>
      ) : type === 2 ? (
        <div className="flex flex-col items-center justify-center space-y-6 rounded-md border px-4 pb-4 pt-6 text-center shadow-lg">
          <div className="inline-block rounded-full border border-dashed p-4 text-center">
            <RiAddLine />
          </div>

          <div className="space-y-1">
            <Typography variant="paragraph" weight="medium">
              Add new paid plan
            </Typography>

            <Typography variant="caption" color="grey">
              You’re ready to take your establishment experience to the next
              level
            </Typography>
          </div>

          <Link href={`${pathname}?dialog=true`} scroll={false}>
            <Button type="submit" size="xl" radius="full">
              Create plan
            </Button>
          </Link>
        </div>
      ) : null}
    </>
  );
};
