import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { getFirstLetter } from '@/shared/helper';

import { AvatarProps } from './types/Avatar.types';

export const Avatar = (props: AvatarProps) => {
  const { avatar, alt, name, className } = props;

  return (
    <div>
      {avatar ? (
        <div
          className={twMerge(
            'relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full',
            className,
          )}
        >
          <Image src={avatar} alt={alt} fill />
        </div>
      ) : (
        <div
          className={twMerge(
            'flex h-8 w-8 items-center justify-center rounded-full bg-theme-grey-300',
            className,
          )}
        >
          {getFirstLetter(name)}
        </div>
      )}
    </div>
  );
};
