import { SiteHeader } from "@/components/site-header";
import { CategoryNav } from "@/components/category-nav";
import { NewsCard } from "@/components/news-card";
import { createClient } from "@/lib/supabase/client";
import { Search } from "lucide-react";

interface PageProps {
    searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: PageProps) {
    const query = searchParams.q || "";
    let articles: any[] = [];

    if (query) {
        const supabase = createClient();
        const { data } = await supabase
            .from('articles')
            .select('*, categories(name_ta)')
            .ilike('title', `%${query}%`)
            .eq('is_published', true)
            .order('published_at', { ascending: false });
        articles = data || [];
    }

    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />
            <CategoryNav />

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto mb-8">
                    <form action="/search" method="GET" className="relative">
                        <input
                            type="text"
                            name="q"
                            defaultValue={query}
                            placeholder="செய்திகளைத் தேடுங்கள்..."
                            className="w-full h-12 pl-4 pr-12 rounded-lg border bg-background focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                        <button type="submit" className="absolute right-2 top-2 p-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                            <Search className="h-4 w-4" />
                        </button>
                    </form>
                </div>

                <h1 className="text-2xl font-bold mb-6 font-noto-sans-tamil">
                    {query ? (
                        <>தேடல் முடிவுகள்: <span className="text-red-600">&quot;{query}&quot;</span></>
                    ) : "செய்திகளைத் தேடுக"}
                </h1>

                {query ? (
                    articles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {articles.map((item) => (
                                <NewsCard
                                    key={item.slug}
                                    title={item.title}
                                    category={item.categories?.name_ta || "பொது"}
                                    imageUrl={item.image_url}
                                    summary={item.summary}
                                    slug={item.slug}
                                    date={new Date(item.published_at).toLocaleDateString()}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-xl">
                            <p className="text-muted-foreground">முடிவுகள் எதுவும் இல்லை (No results found)</p>
                        </div>
                    )
                ) : (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground">மேலே உள்ள பெட்டியில் தேடவும்...</p>
                    </div>
                )}
            </main>
        </div>
    );
}
