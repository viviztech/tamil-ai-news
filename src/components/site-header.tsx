"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 -ml-2 hover:bg-accent rounded-md"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">தி</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight hidden sm:inline-block">
                        Tamil AI News
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/category/politics" className="hover:text-red-600 transition-colors">
                        அரசியல்
                    </Link>
                    <Link href="/category/cinema" className="hover:text-red-600 transition-colors">
                        சினிமா
                    </Link>
                    <Link href="/category/technology" className="hover:text-red-600 transition-colors">
                        தொழில்நுட்பம்
                    </Link>
                    <Link href="/category/world" className="hover:text-red-600 transition-colors">
                        உலகம்
                    </Link>
                    <Link href="/category/sports" className="hover:text-red-600 transition-colors">
                        விளையாட்டு
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button className="p-2 hover:bg-accent rounded-full transition-colors">
                        <Search className="h-5 w-5" />
                    </button>
                    <Link
                        href="/admin/login"
                        className="text-xs font-semibold px-3 py-1.5 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                    >
                        Login
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
                    <Link href="/category/politics" className="text-sm font-medium p-2 hover:bg-accent rounded">
                        அரசியல் (Politics)
                    </Link>
                    <Link href="/category/cinema" className="text-sm font-medium p-2 hover:bg-accent rounded">
                        சினிமா (Cinema)
                    </Link>
                    <Link href="/category/technology" className="text-sm font-medium p-2 hover:bg-accent rounded">
                        தொழில்நுட்பம் (Tech)
                    </Link>
                    <Link href="/category/world" className="text-sm font-medium p-2 hover:bg-accent rounded">
                        உலகம் (World)
                    </Link>
                    <Link href="/category/sports" className="text-sm font-medium p-2 hover:bg-accent rounded">
                        விளையாட்டு (Sports)
                    </Link>
                </div>
            )}
        </header>
    );
}
