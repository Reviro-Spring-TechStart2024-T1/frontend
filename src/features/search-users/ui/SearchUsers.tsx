'use client';

import { useState } from 'react';
import { RiSearchLine } from '@remixicon/react';

import { useDebounce } from '@/features/search-users';
import { Input } from '@/shared/ui/Input/Input';

export const SearchUsers = () => {
  const [value, setValue] = useState('');

  const debouncedValue = useDebounce(value, 400); //NOTE - For request

  return (
    <div className="relative flex w-full items-center text-sm">
      <Input
        placeholder="Search by name or email"
        className="w-full pl-12"
        value={value}
        onChange={e => setValue(e.target.value)}
      />

      <RiSearchLine
        className="absolute left-4 cursor-pointer text-theme-grey-400"
        size={20}
      />
    </div>
  );
};
