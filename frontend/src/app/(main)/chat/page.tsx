import React from 'react'

export default function Page() {
  return (
    <div className='w-full h-screen bg-'>
      <div className="flex-1 bg-neutral-800">
        {/* Nav */}
        <div className='p-4 flex justify-between'>
          <div>
            <h2 className='text-xl font-medium '>ChatAI</h2>
          </div>
          {/* <div className='flex gap-4 items-center'>
                  <button className='flex gap-1 items-center justify-center'><IconShare2 />Share</button>
                  <button><IconDots /></button>
                </div> */}
        </div>
      </div>
    </div>
  )
}
