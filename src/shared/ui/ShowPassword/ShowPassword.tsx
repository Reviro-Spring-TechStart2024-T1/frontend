import { ComponentPropsWithoutRef, FC } from 'react';
import { RiEyeCloseLine, RiEyeLine } from '@remixicon/react';

import { Button } from '@/shared';

type TProps = ComponentPropsWithoutRef<'button'> & {
  state: boolean;
};

export const ShowPassword: FC<TProps> = ({ state, onClick, ...rest }) => {
  return (
    <Button
      variant="ghost"
      type="button"
      onClick={onClick}
      className="absolute bottom-0 right-0 flex items-center px-2"
      {...rest}
    >
      {state ? <RiEyeLine /> : <RiEyeCloseLine />}
    </Button>
  );
};
