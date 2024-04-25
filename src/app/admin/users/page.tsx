import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'

import { UsersList } from '@/entities/user'

export const metadata: Metadata = {
    title: 'Users',
    ...NO_INDEX_PAGE
}

export default async function Page() {
    return <UsersList />
}
