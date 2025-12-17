"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { createClient } from "@/lib/supabase/client";

export function SiteHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            const supabase = createClient();
            const { data } = await supabase.from('categories').select('*').order('name_en');
            if (data) setCategories(data);
        };
        fetchCategories();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
        }
    };

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

                {/* Logo or Search Input */}
                {isSearchOpen ? (
                    <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4 relative animate-in fade-in zoom-in-95">
                        <input
                            type="text"
                            placeholder="செய்திகளைத் தேடுங்கள்... (Search news)"
                            className="w-full h-10 pl-4 pr-10 rounded-full border bg-muted focus:bg-background focus:outline-none focus:ring-2 focus:ring-red-600 transition-all font-noto-sans-tamil"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                        <button
                            type="button"
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute right-2 top-2 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full"
                        >
                            <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                    </form>
                ) : (
                    <>
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
                            {categories.slice(0, 6).map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/category/${category.slug}`}
                                    className="hover:text-red-600 transition-colors"
                                >
                                    {category.name_ta || category.name_en}
                                </Link>
                            ))}
                        </nav>
                    </>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    {!isSearchOpen && (
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 hover:bg-accent rounded-full transition-colors"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    )}
                    <Link
                        href="/admin/login"
                        className="text-xs font-semibold px-3 py-1.5 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                    >
                        Login
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && !isSearchOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="text-sm font-medium p-2 hover:bg-accent rounded flex justify-between"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span>{category.name_ta}</span>
                            <span className="text-xs text-muted-foreground uppercase">{category.name_en}</span>
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
