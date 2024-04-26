'use client';

import { useState } from 'react';
import { RiSearchLine } from '@remixicon/react';

import { useDebounce } from '@/features/search-users';
import { Input } from '@/shared/ui/Input/Input';

export const SearchUsers = () => {
  const [value, setValue] = useState('');

  const debouncedValue = useDebounce(value, 400); //NOTE - For request

  return (
    <div className="relative">
      <Input
        placeholder="Search"
        className="pl-14"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <RiSearchLine className="absolute left-6 top-2/4 -translate-y-2/4" />
    </div>
  );
};
