"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, PlusCircle, Settings, LogOut, Sparkles, Tags } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/articles", label: "Articles", icon: FileText },
    { href: "/admin/categories", label: "Categories", icon: Tags },
    { href: "/admin/articles/new", label: "New Article", icon: PlusCircle },
    { href: "/admin/analysis", label: "Source Analysis", icon: Sparkles },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-900 text-slate-100 min-h-screen flex flex-col fixed left-0 top-0 overflow-y-auto">
            <div className="p-6 border-b border-slate-700">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-sm">TA</span>
                    Admin Panel
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            pathname === item.href
                                ? "bg-red-600 text-white"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-700">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
