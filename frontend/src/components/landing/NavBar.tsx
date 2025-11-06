'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import ModeToggle from '../mode-toggle';
import { IconMenu, IconX } from '@tabler/icons-react';

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full sm:w-7xl flex justify-between items-center border-b backdrop-blur-sm rounded-xl px-4 py-4 mt-2 mx-auto">
            {/* Left section */}
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-medium">
                    <Link href="/#hero">ChatAi</Link>
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden sm:flex gap-4 text-neutral-400 text-sm">
                    <li><Link href="/#features" className="hover:text-neutral-700">Features</Link></li>
                    <li><Link href="/#pricing" className="hover:text-neutral-700">Pricing</Link></li>
                    <li><Link href="/#testimonials" className="hover:text-neutral-700">Testimonials</Link></li>
                </ul>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2">
                <div className="hidden sm:block">
                    <Button variants="simple" className="text-neutral-700">
                        <Link href="/signin">Try For Free</Link>
                    </Button>
                </div>
                <div className='hidden sm:block'>

                    <ModeToggle />
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="block sm:hidden p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <IconX size={20} /> : <IconMenu size={20} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white dark:bg-neutral-900 border-b sm:hidden z-50">
                    <ul className="flex flex-col gap-4 px-6 py-4 text-neutral-700 dark:text-neutral-200">
                        <li><Link href="/#features" onClick={() => setMenuOpen(false)}>Features</Link></li>
                        <li><Link href="/#pricing" onClick={() => setMenuOpen(false)}>Pricing</Link></li>
                        <li><Link href="/#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</Link></li>
                        <li>
                            <Button
                                variants="simple"
                                className="w-full text-neutral-700"
                                onClick={() => setMenuOpen(false)}
                            >
                                <Link href="/signin">Try For Free</Link>
                            </Button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
