import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { CategoryNav } from "@/components/category-nav";
import { NewsCard } from "@/components/news-card";

// Mock Data (In reality, fetch from Supabase by category_id)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CATEGORY_NEWS: Record<string, any[]> = {
    "politics": [
        {
            title: "உலக முதலீட்டாளர்கள் மாநாடு 2025: முக்கிய ஒப்பந்தங்கள்",
            category: "அரசியல்",
            summary: "தமிழக அரசுடன் 50 பன்னாட்டு நிறுவனங்கள் ஒப்பந்தம் செய்துள்ளன.",
            imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800",
            date: "30 நிமிடங்களுக்கு முன்",
            slug: "investors-meet-2025"
        }
    ],
    "technology": [
        {
            title: "செயற்கை நுண்ணறிவு புரட்சி: தமிழகத்தில் தொழில்நுட்ப பூங்கா",
            category: "தொழில்நுட்பம்",
            imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
            date: "2 மணி நேரத்திற்கு முன்",
            slug: "tamilnadu-ai-park-announcement"
        },
        {
            title: "கூகுளின் புதிய AI அப்டேட்",
            category: "தொழில்நுட்பம்",
            imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800",
            date: "3 மணி நேரத்திற்கு முன்",
            slug: "google-gemini-update"
        }
    ]
};

// Helper for category names
const CATEGORY_NAMES: Record<string, string> = {
    politics: "அரசியல்",
    cinema: "சினிமா",
    technology: "தொழில்நுட்பம்",
    world: "உலகம்",
    sports: "விளையாட்டு",
    business: "வர்த்தகம்"
};

interface PageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const name = CATEGORY_NAMES[params.slug];
    if (!name) return { title: "Category Not Found" };

    return {
        title: `${name} செய்திகள் | Tamil AI News`,
        description: `Latest news in ${params.slug}`,
    };
}

export default function CategoryPage({ params }: PageProps) {
    const categorySlug = params.slug;
    const categoryName = CATEGORY_NAMES[categorySlug];

    if (!categoryName) {
        // In real app: notFound();
        // For demo show generic
    }

    const news = CATEGORY_NEWS[categorySlug] || []; // Default to empty or fallback

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
