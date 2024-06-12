import { RiArchiveLine, RiDeleteBinLine, RiEditLine } from '@remixicon/react';

import { Button, Typography } from '@/shared';

export const SubscriptionPlan = () => {
  return (
    <div className="rounded-md border px-4 pb-4 pt-6 shadow-lg">
      <div className="space-y-6">
        <Typography variant="paragraph" weight="medium">
          MONTHLY PLAN
        </Typography>

        <div className="inline-flex gap-10">
          <div>
            <Typography variant="h3" weight="medium">
              $199
            </Typography>
            <Typography variant="caption" color="grey">
              per daily
            </Typography>
          </div>
          <div>
            <Typography variant="h3" weight="medium">
              $199
            </Typography>
            <Typography variant="caption" color="grey">
              per month
            </Typography>
          </div>
        </div>

        <Typography variant="caption" color="grey">
          You’ll get access to all NCAAB Inner Circle Picks, as well as
          exclusive intel into my top two bets for both march.
        </Typography>
      </div>

      <hr className="my-6" />

      <div className="flex justify-between">
        <Button className="gap-1" variant="outline" size="md" radius="full">
          <RiEditLine size={16} />
          Edit
        </Button>
        <Button className="gap-1" variant="outline" size="md" radius="full">
          <RiArchiveLine size={16} />
          Archieve
        </Button>
        <Button className="gap-1" variant="outline" size="md" radius="full">
          <RiDeleteBinLine size={16} />
          Delete
        </Button>
      </div>
    </div>
  );
};
