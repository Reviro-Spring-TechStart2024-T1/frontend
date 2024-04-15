import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Menu } from '@/entities/beverage'

export const metadata: Metadata = {
    title: 'Menu'
}

export default function Page() {
    return (
        <div className='menu-page p-5 bg-[#DEE2E6]'>
            <Suspense fallback={<div>Loading...</div>}>
                <Menu />
            </Suspense>
        </div>
    )
}
