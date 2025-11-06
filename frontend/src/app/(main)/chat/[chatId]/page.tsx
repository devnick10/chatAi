'use client'
import { IconDots, IconShare2 } from '@tabler/icons-react'
import { useParams } from 'next/navigation';
import React from 'react'

export default function Page() {
  const params = useParams();
  const chatId = params.chatId as string;
  return (
    <div className='w-full min-h-screen bg-neutral-800'>
      <ChatTopBar />
      <ChatContainer id={chatId} />
    </div>
  )
}

function ChatTopBar() {
  return (<>
    <div className='p-4 flex justify-between min-w-full'>
      <div>
        <h2 className='text-xl font-medium '>ChatAI</h2>
      </div>
      <div className='flex gap-4 items-center'>
        <button className='flex gap-1 items-center justify-center'><IconShare2 />Share</button>
        <button><IconDots /></button>
      </div>
    </div>
  </>)
}

function ChatContainer({ id }: { id: string }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      {/* Mock messages to demonstrate scrolling */}
      {Array.from({ length: 50 }).map((_, i) => (
        <p key={i} className="text-white bg-neutral-700 rounded-md p-2">
          Message #{i + 1} in chat {id}
        </p>
      ))}
    </div>
  )
}