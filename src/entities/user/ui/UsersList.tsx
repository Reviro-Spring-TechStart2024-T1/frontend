'use client';

import { TUser, User } from '@/entities/user';
import { useUsers } from '@/shared';

export default function UsersList() {
  const { data: usersData } = useUsers<TUser[]>();

  return (
    <ul className="divide-y">
      {usersData && usersData.map(user => <User key={user.id} {...user} />)}
    </ul>
  );
}
