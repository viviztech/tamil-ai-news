import { SiteHeader } from "@/components/site-header";
import { CategoryNav } from "@/components/category-nav";
import { NewsCard } from "@/components/news-card";

// Mock Data
const MOCK_RESULTS = [
    {
        title: "செயற்கை நுண்ணறிவு புரட்சி: தமிழகத்தில் புதிய தொழில்நுட்ப பூங்கா",
        category: "தொழில்நுட்பம்",
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
        date: "Dec 16, 2025",
        slug: "tamilnadu-ai-park-announcement"
    },
    {
        title: "கூகுளின் புதிய AI அப்டேட்",
        category: "தொழில்நுட்பம்",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800",
        date: "Dec 16, 2025",
        slug: "google-gemini-update"
    }
];

interface PageProps {
    searchParams: { q?: string };
}

export default function SearchPage({ searchParams }: PageProps) {
    const query = searchParams.q || "";

    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />
            <CategoryNav />

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6 font-noto-sans-tamil">
                    தேடல் முடிவுகள்: <span className="text-red-600">&quot;{query}&quot;</span>
                </h1>

                {query ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {MOCK_RESULTS.map((item) => (
                            <NewsCard key={item.slug} {...item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground">தயவுசெய்துதயவுசெய்து எதையாவது தேடவும்...</p>
                    </div>
                )}
            </main>
        </div>
    );
}
