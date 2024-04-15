'use client'

import { Beverage, TBeverage } from '@/entities/beverage'
import { useBeverages } from '@/shared'

export const Menu = () => {
    const { data: beverages } = useBeverages<TBeverage[]>()

    return (
        <div className='menu'>
            <div className='flex justify-end mb-5'>
                <button className='bg-white px-20 py-2 rounded-lg text-4xl'>
                    +
                </button>
            </div>
            <ul className='flex gap-3 flex-wrap'>
                {beverages &&
                    beverages?.map(beverage => (
                        <Beverage
                            key={beverage.id}
                            {...beverage}
                        />
                    ))}
            </ul>
        </div>
    )
}
