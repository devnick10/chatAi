'use client'
import React from 'react'
import { ChatAiIcon } from '@/components/ui/icons'
import { IconLayoutSidebarRight, IconMessage2, IconSearch, IconUser } from '@tabler/icons-react'
import { useAppDispatch } from '@/redux/hooks'
import { toggleSidebar } from '@/redux/features/sidebar/sidebarSlice'
import { cn } from '@sglara/cn'
import useSidebar from '@/hooks/useSidebar'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

const sidebarFeatures = [
    { title: "New chat", icon: IconMessage2, hrf: "/dashboard" },
    { title: "Search chats", icon: IconSearch },
]

export default function Sidebar() {
    const isOpen = useSidebar();
    const dispatch = useAppDispatch();
    const toggle = () => dispatch(toggleSidebar());
    const { user } = useAuth();
    const userName = user?.email.split("@")[0] || "Guest";
    const router = useRouter();

    return (
        <div className="flex flex-col h-full">
            {/* Top Section */}
            <div className={cn(
                "group flex items-center justify-between p-4 border-b border-neutral-800",
                !isOpen && "justify-center",
                "transition-all "
            )}>
                {isOpen && <ChatAiIcon />}
                {isOpen && (
                    <button onClick={toggle}>
                        <IconLayoutSidebarRight />
                    </button>
                )}
                {!isOpen && (
                    <button onClick={toggle}>
                        <ChatAiIcon className='shrink-0 group-hover:hidden transition-all text-blue-500 ' />
                        <IconLayoutSidebarRight className='hidden group-hover:inline  transition-all' />
                    </button>
                )}
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-2 mt-4">
                {sidebarFeatures.map((feat, i) => {
                    const Icon = feat.icon;
                    return (
                        <div
                            key={i}
                            className={cn(
                                "flex items-center gap-3 px-4 py-2 hover:bg-neutral-800 cursor-pointer transition-colors",
                                !isOpen && "justify-center"
                            )}
                            onClick={() => feat.hrf ? router.push(feat.hrf) : null}
                        >
                            <Icon
                                className="shrink-0"
                            />
                            {isOpen && <span className="text-sm font-medium">{feat.title}</span>}
                        </div>
                    );
                })}
            </div>

            {/* Chats */}
            {isOpen && <ChatsContainer />}
            <div className='h-full flex flex-col justify-end py-4'>
                <div className='relative flex justify-between px-4 items-center '>
                    <div className='flex gap-2 items-center'>
                        <div className='rounded-full bg-gray-600 w-8 h-8 flex justify-center items-center '>
                            {userName.at(0) || <IconUser className='size-4' />}
                        </div>
                        {isOpen &&
                            <div >
                                <h4 className='font-medium'>{userName}</h4>                                <p className='text-foreground/50 text-sm'>plan-free</p>
                            </div>
                        }
                    </div>
                    {isOpen && <button className='text-[13px] bg-nuetral-800 font-semibold text-foreground border border-neutral-300/80 rounded-2xl px-2 py-1'>Upgrade</button>}
                </div>
            </div>
        </div>
    )
}

function ChatsContainer() {
    return (
        <div className="p-4">
            <h1 className="border-b border-neutral-700 mb-2 font-semibold">Chats</h1>
            <p className="py-1 font-medium">Title</p>
        </div>
    )
}
