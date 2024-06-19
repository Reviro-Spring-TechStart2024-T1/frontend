import { RiArchiveLine, RiDeleteBinLine, RiEditLine } from '@remixicon/react';

import { Button, Plan, Typography } from '@/shared';

export const SubscriptionPlan = (props: Plan) => {
  const { name, description, price, period } = props;

  return (
    <div className="rounded-md border px-4 pb-4 pt-6 shadow-lg">
      <div className="space-y-6">
        <Typography variant="paragraph" weight="medium" format="uppercase">
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

        <Typography variant="caption" color="grey">
          {description}
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
