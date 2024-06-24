'use client';

import { RiArchiveLine, RiDeleteBinLine, RiEditLine } from '@remixicon/react';

import {
  ADMIN_SUBSCRIPTION_ACTIVE_PATH,
  Button,
  Plan,
  Typography,
  useComparePath,
  useModal,
} from '@/shared';

export const SubscriptionPlan = (props: Plan) => {
  const { onOpen } = useModal();
  const { plan_id, name, description, price, period } = props;

  const isActivePlan = useComparePath(ADMIN_SUBSCRIPTION_ACTIVE_PATH);

  return (
    <div className="flex h-80 flex-col justify-between rounded-md border px-4 pb-4 pt-6 shadow-lg">
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

        <Typography
          variant="caption"
          color="grey"
          className="line-clamp-3 break-all"
        >
          {description}
        </Typography>
      </div>

      <div>
        <hr className="my-6" />

        <div className="flex justify-between">
          <Button className="gap-1" variant="outline" size="md" radius="full">
            <RiEditLine size={16} />
            Edit
          </Button>
          <Button
            className="gap-1"
            variant="outline"
            size="md"
            radius="full"
            onClick={() =>
              onOpen(isActivePlan ? 'archivePlan' : 'unarchivePlan', {
                plan_id: plan_id,
              })
            }
          >
            <RiArchiveLine size={16} />
            {isActivePlan ? 'Archive' : 'Unarchive'}
          </Button>
          <Button className="gap-1" variant="outline" size="md" radius="full">
            <RiDeleteBinLine size={16} />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
