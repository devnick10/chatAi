import React from 'react'

export default function HeroSection() {
    return (
        <section id='hero' className='w-screen h-screen flex justify-center items-center -mt-12 '>
            <div className='flex flex-col items-center gap-6 w-4xl text-center'>
                <h1 className='text-7xl tracking-tight font-bold  mask-b-from-70% bg-blue-400/5 rounded-full '>Your AI Assistant for Everything</h1>
                <p className='text-xl w-xl font-thin'>Experience the power of advanced AI conversation. Get instant answers, creative help, and intelligent assistance for any task.</p>
                <button className=' bg-white text-black rounded-2xl px-2 py-1 text-shadow-blue-300  font-md tracking-wide text-xl shadow-lg shadow-blue-500/50 '>Signup For Free</button>
            </div>
        </section>
    )
}
