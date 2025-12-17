"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

export function CategoryNav() {
    const pathname = usePathname();
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const supabase = createClient();
            const { data } = await supabase.from('categories').select('*').order('name_en');
            if (data) setCategories(data);
        };
        fetchCategories();
    }, []);

    const allCategories = [
        { id: "all", name: "அனைத்தும்", slug: "" },
        ...categories
    ];

    return (
        <div className="w-full overflow-x-auto border-b bg-background pb-0 pt-2 sticky top-16 z-40 supports-[backdrop-filter]:bg-background/80 backdrop-blur">
            <div className="container mx-auto px-4">
                <div className="flex gap-6 pb-2 min-w-max">
                    {allCategories.map((category) => {
                        const href = category.slug ? `/category/${category.slug}` : "/";
                        return (
                            <Link
                                key={category.id}
                                href={href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-red-600 pb-1 border-b-2 border-transparent",
                                    (pathname === href || (href !== "/" && pathname?.startsWith(href)))
                                        ? "border-red-600 text-red-600"
                                        : "text-muted-foreground"
                                )}
                            >
                                {category.name_ta || category.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
