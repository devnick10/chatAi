'use client'
import { cn } from '@sglara/cn'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

export default function ModeToggle() {

    const { theme, setTheme } = useTheme()
    const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light")

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme:dark)");
        setSystemTheme(mediaQuery.matches ? "dark" : "light");

        const handleChange = (e: MediaQueryListEvent) => {
            setSystemTheme(mediaQuery.matches ? "dark" : "light");
        }

        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [])

    function switchTheme() {
        switch (theme) {
            case "light": {
                setTheme("dark")
                return;
            }
            case "dark": {
                setTheme("light")
                return;
            }
            case "system": {
                setTheme(systemTheme === "dark" ? "light" : "dark")
                return;
            }
        }
    }
    return (
        <button className=' absolute size-6 border border-neutral-200 dark:border-neutral-800 rounded-md flex items-center justify-center top-4 right-4 p-4 ' onClick={switchTheme}>
            <SunIcon className={"absolute inset-0 size-8 shrink-0 dark:scale-0 scale-100 dark:rotate-45"} />
            <MoonIcon className={"absolute inset-0 size-8 shrink-0 dark:text-neutral-500 dark:scale-100 scale-0 dark:rotate-0 rotate-45 "} />
        </button>
    )
}




function MoonIcon({ className }: { className: string }) {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" className={cn("icon icon-tabler icons-tabler-filled icon-tabler-moon", className)}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" /></svg>
        </>
    )
}

function SunIcon({ className }: { className: string }) {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("icon icon-tabler icons-tabler-outline icon-tabler-sun ", className)}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" /></svg>
        </>
    )
}

