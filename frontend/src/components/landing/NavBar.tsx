import React from 'react'
import ModeToggle from '../mode-toggle'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function NavBar() {
    return (
        <nav className='w-7xl flex justify-between items-center border-b backdrop-blur-sm rounded-xl px-4 py-4 mt-2 mx-auto'>
            <div className='flex gap-4 text-xl  list-none'>
                <h1 className='font-md'><Link href={'/#hero'}>ChatAi</Link></h1>
                <ul className='div flex gap-4 text-neutral-400'>
                    <Link href={'/#features'}>Features</Link>
                    <Link href={'/#pricing'}>Pricing</Link>
                    <Link href={'/#testimonials'}>Testimonials</Link>
                </ul>
            </div>
            <div className='flex items-center'>
                <div>
                    <Button variants={'simple'} className='text-neutral-700'>
                        <Link href={'/signin'}>Try For Free</Link>
                    </Button>
                </div>
                <ModeToggle />
            </div>
        </nav>
    )
}
