import { cn } from '@sglara/cn';
import React from 'react'

export type VariantsType = 'simple' | 'large' | 'glow'

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variants: VariantsType;
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset';
}

const buttonVariants: Record<VariantsType, string> = {
  'glow': 'bg-white text-black rounded-2xl px-2 py-1 text-shadow-blue-300  font-md tracking-wide text-xl shadow-lg shadow-blue-500/50',
  'simple': 'bg-white text-black rounded-2xl px-2 py-1 text-shadow-blue-300 shadow-sm text-md mr-10',
  'large': 'ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 self-stretch px-5 py-2 rounded-[40px] flex justify-center items-center bg-zinc-300 shadow-[0px_1px_1px_-0.5px_rgba(16,24,40,0.20)] outline-0.5 outline-[#1e29391f] outline-offset-[-0.5px] text-gray-800 text-shadow-[0px_1px_1px_rgba(16,24,40,0.08)] hover:bg-zinc-400'
}


export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variants,
  onClick,
  type = 'button'
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(buttonVariants[variants], className)}
    >{children}</button>
  )
}
