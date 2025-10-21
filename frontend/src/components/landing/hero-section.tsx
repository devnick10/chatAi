import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export default function HeroSection() {
    return (
        <section id='hero' className='w-screen h-screen flex justify-center items-center -mt-12 '>
            <div className='flex flex-col items-center gap-6 w-4xl text-center'>
                <h1 className='text-7xl tracking-tight font-bold  mask-b-from-70% bg-blue-400/5 rounded-full '>Your AI Assistant for Everything</h1>
                <p className='text-xl w-xl font-thin'>Experience the power of advanced AI conversation. Get instant answers, creative help, and intelligent assistance for any task.</p>
                <Button variants='glow' className='text-black'>
                    <Link href={"/signin"}  >Signup For Free</Link>
                </Button>
            </div>
        </section>
    )
}
