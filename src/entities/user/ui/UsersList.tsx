'use client';

import useSWR from 'swr';

import { TUser } from '@/entities/user';

const fetcher = (url: string, init?: RequestInit) =>
  fetch(url, init).then(res => res.json());

export default function UsersList() {
  const { data: usersData } = useSWR<TUser[]>(
    'http://localhost:5000/users',
    fetcher,
  );

  return (
    <ul className="divide-y">
      {usersData &&
        usersData.map(user => (
          <li key={user.phone} className="flex gap-5 divide-x rounded-lg p-2">
            <h2>{user.name}</h2>
            <span>{user.email}</span>
            <span>{user.phone}</span>
          </li>
        ))}
    </ul>
  );
}
