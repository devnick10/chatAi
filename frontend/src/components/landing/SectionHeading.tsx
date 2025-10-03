import React from 'react'

interface SectionHeadingProps {
    heading: string;
    description: string;
}

export default function SectionHeading({ heading, description }: SectionHeadingProps) {
    return (
        <div className='flex flex-col mx-auto items-center mt-20 w-4xl text-center gap-2  '>
            <h1 className='text-7xl tracking-tight font-bold '>{heading}</h1>
            <p className='text-xl w-2xl font-light '>{description}</p>
        </div>
    )
}
