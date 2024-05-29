import { FC } from 'react';

import { Typography } from '@/shared/ui';

export const CardTitle: FC<{ children: React.ReactNode }> = ({ children }) => {
  //NOTE - Consider making exquisite component <Card.Title> (Card context, assign Title: CardTitle)
  return (
    <Typography
      variant="paragraph"
      className="rounded-md border border-white bg-[#ffffff3d] p-2 text-center text-white"
    >
      {children}
    </Typography>
  );
};
