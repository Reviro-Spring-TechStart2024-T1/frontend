'use client';

import { useState } from 'react';
import { RiSearchLine } from '@remixicon/react';

import { Input } from '@/shared/ui/Input/Input';

export interface SearchProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export const Search = ({ onSearch, placeholder }: SearchProps) => {
  const [searchValue, setSearchValue] = useState('');

  // const debouncedValue = useDebounce(searchValue, 400); //NOTE - For request

  const handleSearch: React.FormEventHandler = e => {
    e.preventDefault();

    onSearch(searchValue);
  };

  return (
    <form className="w-full" onSubmit={handleSearch}>
      <div className="relative flex items-center text-sm">
        <Input
          placeholder={placeholder}
          className="w-full pl-12"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />

        <div
          className="absolute left-4 cursor-pointer text-theme-grey-400"
          onClick={handleSearch}
        >
          <RiSearchLine size={20} />
        </div>
      </div>
    </form>
  );
};
