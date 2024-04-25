'use client'

import { TUser } from '@/entities/user'
import useSWR from 'swr'

const fetcher = (url: string, init?: RequestInit) =>
    fetch(url, init).then(res => res.json())

export default function UsersList() {
    const { data: usersData } = useSWR<TUser[]>(
        `http://localhost:5000/users`,
        fetcher
    )

    return (
        <ul className='divide-y'>
            {usersData && usersData.map(user => (
                <li
                    key={user.phone}
                    className='flex gap-5 divide-x p-2 rounded-lg'
                >
                    <h2>{user.name}</h2>
                    <span>{user.email}</span>
                    <span>{user.phone}</span>
                </li>
            ))}
        </ul>
    )
}
