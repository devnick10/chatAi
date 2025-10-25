'use client'
import Searchbar from '@/app/_components/searchbar';
import { chatGreetings } from '@/constant/data';
import { cn } from '@sglara/cn';
import { useMemo } from 'react';

export default function Page() {
  const randomGreet = useMemo(() => {
    return Math.ceil(Math.random() * 10);
  }, [])
  return (
    <div className={cn(
      'w-7xl mx-auto h-screen overflow-y-hidden flex flex-col mt-40 items-center '
    )}>
      <div className='flex w-3xl flex-col gap-10 items-center'>
        <h3 className='text-3xl font-thin'>{chatGreetings[randomGreet].title}</h3>
        <Searchbar />
      </div>
    </div>
  );
}
