import React from 'react'

interface SectionHeadingProps {
    heading: string;
    description: string;
}

export default function SectionHeading({ heading, description }: SectionHeadingProps) {
    return (
        <div className='mb-2 flex flex-col mx-auto items-center sm:mt-20 w-full sm:w-4xl  text-center gap-2  '>
            <h1 className='text-4xl sm:text-7xl tracking-tight font-bold '>{heading}</h1>
            <p className='text-sm sm:text-xl w-xs sm:w-2xl font-light '>{description}</p>
        </div>
    )
}
