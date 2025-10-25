import { cn } from "@sglara/cn"
import { IconMessageQuestion } from "@tabler/icons-react"

export function ConversationIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn('icon icon-tabler icons-tabler-outline icon-tabler-message-plus', className)}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 9h8" /><path d="M8 13h6" /><path d="M12.01 18.594l-4.01 2.406v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
}

export function LightningIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("icon icon-tabler icons-tabler-outline icon-tabler-bolt", className)}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" /></svg>
}

export function PrivacyIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("icon icon-tabler icons-tabler-outline icon-tabler-shield-plus", className)}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12.462 20.87c-.153 .047 -.307 .09 -.462 .13a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 .11 6.37" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
}

export function MultpleChatsIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("icon icon-tabler icons-tabler-outline icon-tabler-users", className)}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
}

export function ContextMemoryIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("icon icon-tabler icons-tabler-outline icon-tabler-container", className)}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20 4v.01" /><path d="M20 20v.01" /><path d="M20 16v.01" /><path d="M20 12v.01" /><path d="M20 8v.01" /><path d="M8 4m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" /><path d="M4 4v.01" /><path d="M4 20v.01" /><path d="M4 16v.01" /><path d="M4 12v.01" /><path d="M4 8v.01" /></svg>
}

export function RealtimeSyncIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("icon icon-tabler icons-tabler-outline icon-tabler-refresh", className)}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></svg>
}

export function LeftArrow({ size }: { size: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={cn("icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left", `size-${size}`)}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M5 12l4 4" /><path d="M5 12l4 -4" /></svg>
    )
}

export function LoaderIcon({ size, classNames }: { size: string, classNames: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("icon icon-tabler icons-tabler-outline icon-tabler-loader", `size-${size}`, classNames)}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 6l0 -3" /><path d="M16.25 7.75l2.15 -2.15" /><path d="M18 12l3 0" /><path d="M16.25 16.25l2.15 2.15" /><path d="M12 18l0 3" /><path d="M7.75 16.25l-2.15 2.15" /><path d="M6 12l-3 0" /><path d="M7.75 7.75l-2.15 -2.15" /></svg>
    )
}

export function ChatAiIcon({ classNames }: { classNames?: string }) {
    return <IconMessageQuestion className={cn("text-blue-500/80", classNames)} />

}

export function IconSoundWave({ classNames, size }: { size: string, classNames: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" className={cn(classNames, `size-${size}`)} viewBox="0 0 24 24" fill="white"><path d="M1 10v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-2 0zM6 6v12a1 1 0 0 0 2 0V6a1 1 0 0 0-2 0zM21 10v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-2 0zM16 6v12a1 1 0 0 0 2 0V6a1 1 0 0 0-2 0zM11 2v20a1 1 0 0 0 2 0V2a1 1 0 0 0-2 0z" /></svg>
}















