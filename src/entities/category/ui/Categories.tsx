'use client';

import { FC, memo } from 'react';
import clsx from 'clsx';

import { TCategories } from '@/entities/category';
import { Typography } from '@/shared/ui';

export const Categories: FC<TCategories> = memo(function Categories({
  categories,
  isListActive,
  onCategoryChosen,
}) {
  return (
    <div
      className={clsx(
        'absolute left-0 top-14 z-20 flex flex-col gap-2 rounded-md bg-theme-blue-100 p-2 transition-all duration-300',
        {
          'invisible opacity-0': !isListActive,
          'visible opacity-100 ': isListActive,
        },
      )}
    >
      <Typography variant="h4" weight="medium">
        Choose a beverage category:
      </Typography>
      <ul className="flex flex-wrap gap-2">
        {categories?.map(category => {
          return (
            <li
              key={category.id}
              className="cursor-pointer rounded-xl border border-gray-300 p-2 hover:opacity-80"
              onClick={() => {
                onCategoryChosen!(category);
                console.log('onCategoryChosen', category);
              }}
            >
              {category.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
});
