import Image from 'next/image'
import { FC } from 'react'
import { TBeverage } from '@/entities/beverage'

export const Beverage: FC<TBeverage> = ({
    name,
    category,
    price,
    desc,
    isAvailable
}) => {
    return (
        <li className='flex rounded-lg bg-white basis-[500px]'>
            <div className='shrink-0'>
                <Image
                    src='https://images.unsplash.com/photo-1607687332053-ef831d0775ad?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='Beverage'
                    className='rounded-l-lg rounded-bl-lg'
                    width={186}
                    height={250}
                />
            </div>
            <div className='flex flex-col p-4 justify-between'>
                <div className='flex justify-between'>
                    <h2 className='font-semibold'>{name}</h2>
                    <span className='font-semibold'>{price} ⃀</span>
                </div>
                <div className='flex justify-between'>
                    <p>#{category}</p>
                    <span className='text-blue-500'>
                        {isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                </div>
                <h3 className='line-clamp-4'>{desc}</h3>
                <div className='flex justify-between gap-4'>
                    <button className='px-4 py-2 rounded-md w-2/4 border border-gray-300'>
                        <span className='font-medium'>Edit</span>
                    </button>
                    <button className='px-4 py-2 rounded-md w-2/4 bg-red-200'>
                        <span className='text-red-500 font-medium'>Delete</span>
                    </button>
                </div>
            </div>
        </li>
    )
}
