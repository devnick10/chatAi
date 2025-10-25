import { SpinnerCustom } from '@/components/ui/spinner'
import React from 'react'

export default function Loader() {
  return (
    <div className='w-full h-dvh flex justify-center items-center'>
      <div className='flex gap-2'><SpinnerCustom /><p className='text-xl font-medium'>Checking authentication...</p></div>
    </div>
  )
}
