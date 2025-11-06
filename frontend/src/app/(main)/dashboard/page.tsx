'use client'
import Searchbar from '@/app/_components/searchbar';
import { cn } from '@sglara/cn';
import { useEffect, useState } from 'react';

export const chatGreetings = [
  { title: "What would you like to talk about today?" },
  { title: "Need help with something specific right now?" },
  { title: "What are you working on today?" },
  { title: "Got any questions on your mind?" },
  { title: "How can I make your day easier?" },
  { title: "Looking to learn something new today?" },
  { title: "What’s your goal for today?" },
  { title: "Want to brainstorm an idea together?" },
  { title: "Is there something you’d like to explore or create?" },
  { title: "Tell me what you’re curious about right now." },
];


export default function Page() {
  const [title, setTitle] = useState(chatGreetings[0].title);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * chatGreetings.length);
    setTitle(chatGreetings[randomIndex].title);
  }, []);
  
  return (
    <div className={cn(
      'h-screen w-full overflow-y-hidden'
    )}>
      <DashboardTopBar />
      <div className='w-7xl flex flex-col mt-40 items-center mx-auto'>
        <div className='flex w-3xl flex-col gap-10 items-center'>
          <h3 className='text-3xl font-thin'>{title}</h3>
          <Searchbar />
        </div>
      </div>
    </div>
  );
}

function DashboardTopBar() {
  return (<>
    <div className='p-4 flex justify-between w-full'>
      <div>
        <h2 className='text-xl font-medium '>ChatAI</h2>
      </div>
      {/* <div className='flex gap-4 items-center'>
            <button className='flex gap-1 items-center justify-center'><IconShare2 />Share</button>
            <button><IconDots /></button>
          </div> */}
    </div>
  </>)
}