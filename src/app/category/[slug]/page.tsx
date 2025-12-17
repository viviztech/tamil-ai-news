import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { CategoryNav } from "@/components/category-nav";
import { NewsCard } from "@/components/news-card";

import { getArticlesByCategory } from "@/lib/data";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ta } from "date-fns/locale";

// Helper to format date
const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
        return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: ta });
    } catch {
        return "";
    }
};

interface PageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    return {
        title: `${params.slug} செய்திகள் | Tamil AI News`,
        description: `Latest news in ${params.slug}`,
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const categorySlug = params.slug;
    const articles = await getArticlesByCategory(categorySlug);

    // Optional: Fetch category name specifically if needed, 
    // but we can infer it from the first article or just use slug for now to save a query.
    // Or fetch category details separately.
    const categoryName = articles[0]?.categories?.name_ta || categorySlug;

    // Transform for UI
    const news = articles.map((item: any) => ({
        ...item,
        category: item.categories?.name_ta || "General",
        imageUrl: item.image_url || "/placeholder.jpg",
        date: formatDate(item.published_at) // Reuse helper or inline
    }));

    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />
            <CategoryNav />

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 font-noto-sans-tamil flex items-center gap-3">
                    <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                    {categoryName || categorySlug}
                </h1>

                {news.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {news.map((item) => (
                            <NewsCard key={item.slug} {...item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-lg">இந்த பிரிவில் செய்திகள் இல்லை.</p>
                        <p className="text-sm">(No news found in this category)</p>
                    </div>
                )}
            </main>
        </div>
    );
}
