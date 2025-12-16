"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const categories = [
    { id: "all", name: "அனைத்தும்", href: "/" },
    { id: "genai", name: "ஜெனரேட்டிவ் AI", href: "/category/generative-ai" },
    { id: "ml", name: "இயந்திர கற்றல்", href: "/category/machine-learning" },
    { id: "robotics", name: "ரோபோட்டிக்ஸ்", href: "/category/robotics" },
    { id: "llms", name: "LLMs", href: "/category/llms" },
    { id: "ethics", name: "AI நெறிமுறைகள்", href: "/category/ai-ethics" },
    { id: "startups", name: "நிறுவனங்கள்", href: "/category/startups" },
];

export function CategoryNav() {
    const pathname = usePathname();

    return (
        <div className="w-full overflow-x-auto border-b bg-background pb-0 pt-2 sticky top-16 z-40 supports-[backdrop-filter]:bg-background/80 backdrop-blur">
            <div className="container mx-auto px-4">
                <div className="flex gap-6 pb-2 min-w-max">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={category.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-red-600 pb-1 border-b-2 border-transparent",
                                pathname === category.href
                                    ? "border-red-600 text-red-600"
                                    : "text-muted-foreground"
                            )}
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
