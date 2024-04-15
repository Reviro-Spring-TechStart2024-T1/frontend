import useSWR from 'swr'
import { fetcher } from '@/shared'

export const useUsers = <T>() =>
    useSWR<T>(`${process.env.NEXT_PUBLIC_API_URL}/users`, fetcher)
