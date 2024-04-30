import { ComponentProps } from 'react';

import { Typography } from '../Typography';

export interface TitleProps extends ComponentProps<'html'> {
  title: string;
}

export const Title = (props: TitleProps) => {
  const { title } = props;
  return (
    <div className="flex items-center justify-between py-5">
      <Typography variant="h5" weight="semibold">
        {title}
      </Typography>
    </div>
  );
};
