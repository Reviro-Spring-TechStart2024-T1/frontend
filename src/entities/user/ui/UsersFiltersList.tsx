import { FC } from 'react';
import clsx from 'clsx';

import { TFiltersList, users_filters } from '@/entities/user';
import { TFilters } from '@/features/filter';

export const UsersFiltersList: FC<TFiltersList> = ({ isActive, setFilter }) => {
  return (
    <ul
      className={clsx(
        'absolute left-2/4 top-full w-full -translate-x-2/4 divide-y bg-white transition-all duration-300',
        {
          'invisible opacity-0': !isActive,
          'visible opacity-100': isActive,
        },
      )}
    >
      {users_filters.map(filter => (
        <li
          key={filter}
          className="p-2"
          onClick={() => setFilter(filter as TFilters)}
        >
          {filter}
        </li>
      ))}
    </ul>
  );
};
