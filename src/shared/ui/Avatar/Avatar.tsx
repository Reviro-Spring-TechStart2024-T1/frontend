import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { Logo } from '@/shared/assets/icons';
import { getFirstLetter } from '@/shared/lib';

import { AvatarProps } from './types/Avatar.types';

export const Avatar = (props: AvatarProps) => {
  const { avatar, alt, name, className, isAdmin } = props;

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
      ) : isAdmin ? (
        <div
          className={twMerge(
            'relative flex h-8 w-8 items-center justify-center rounded-full bg-theme-primary-300',
            className,
          )}
        >
          <div className="absolute top-1.5">
            <Logo width={45} height={45} />
          </div>
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
