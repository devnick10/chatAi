import { IconSoundWave } from '@/components/ui/icons'
import { cn } from '@sglara/cn'
import { IconMicrophone, IconPlus } from '@tabler/icons-react'
import { toast } from 'sonner'

export default function Searchbar() {
  return (
    <div className='w-full bg-neutral-700 shadow-sm shadow-neutral-900 rounded-3xl flex items-center justify-between py-2 px-3'>
      <button className='p-2 hover:bg-neutral-600 rounded-full'><IconPlus /></button>
      <input className={cn(
        'w-full  outline-none'
      )}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toast.success("Enter key pressed");
          }
        }}
        placeholder='Ask anything'
        type="text" />
      <div className='flex gap-2'>
        <button className='p-2 hover:bg-neutral-600 rounded-full'><IconMicrophone /></button>
        <button className='p-2 w-10 h-10  flex items-center justify-center bg-neutral-600 rounded-full'><IconSoundWave size='4' classNames='text-white' /></button>
      </div>
    </div>
  )
}
