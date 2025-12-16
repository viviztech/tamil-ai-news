import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsCardProps {
    title: string;
    category: string;
    imageUrl: string;
    date: string;
    summary?: string;
    slug: string;
    size?: "small" | "medium" | "large";
}

export function NewsCard({
    title,
    category,
    imageUrl,
    date,
    summary,
    slug,
    size = "medium",
}: NewsCardProps) {
    return (
        <Link
            href={`/news/${slug}`}
            className={cn(
                "group block h-full overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
                size === "large" ? "col-span-1 md:col-span-2 row-span-2" : ""
            )}
        >
            <div className={cn("relative overflow-hidden", size === "large" ? "aspect-video" : "aspect-[16/9]")}>
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                    {category}
                </span>
            </div>

            <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Clock className="w-3 h-3" />
                    <span>{date}</span>
                </div>

                <h3 className={cn(
                    "font-bold leading-tight group-hover:text-red-600 transition-colors font-noto-sans-tamil",
                    size === "large" ? "text-2xl mb-3" : "text-lg mb-2"
                )}>
                    {title}
                </h3>

                {summary && (
                    <p className="text-sm text-muted-foreground line-clamp-2 font-noto-sans-tamil">
                        {summary}
                    </p>
                )}
            </div>
        </Link>
    );
}
