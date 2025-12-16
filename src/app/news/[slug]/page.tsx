import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Share2, PlayCircle, FileText, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

// Mock Data Store (In a real app, this comes from Supabase)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ARTICLES: Record<string, any> = {
    "tamilnadu-ai-park-announcement": {
        title: "செயற்கை நுண்ணறிவு புரட்சி: தமிழகத்தில் புதிய தொழில்நுட்ப பூங்கா",
        category: "தொழில்நுட்பம்",
        date: "Dec 16, 2025",
        author: "செய்திப் பிரிவு",
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200",
        ai_summary: [
            "சென்னை அருகே 500 ஏக்கரில் புதிய AI தொழில்நுட்ப பூங்கா அமையவுள்ளது.",
            "முதலமைச்சர் மு.க.ஸ்டாலின் அடிக்கல் நாட்டினார்.",
            "50,000 பேருக்கு நேரடி வேலைவாய்ப்பு கிடைக்கும் என எதிர்பார்ப்பு."
        ],
        content: `
      <p>சென்னை: தமிழகத்தை இந்தியாவின் தொழில்நுட்பத் தலைநகராக மாற்றும் நோக்கத்தில், சென்னை அருகே பிரம்மாண்டமான செயற்கை நுண்ணறிவு (AI) தொழில்நுட்பப் பூங்கா அமைப்பதற்கான பணிகள் தொடங்கப்பட்டுள்ளன.</p>
      
      <h2>முதலீடுகள் மற்றும் வேலைவாய்ப்பு</h2>
      <p>சுமார் 2000 கோடி ரூபாய் மதிப்பீட்டில் அமையவுள்ள இந்த பூங்காவில், உலகின் முன்னணி தொழில்நுட்ப நிறுவனங்கள் தங்கள் ஆராய்ச்சி மையங்களை அமைக்க ஆர்வம் காட்டியுள்ளன. இதன் மூலம் அடுத்த 5 ஆண்டுகளில் 50,000 இளைஞர்களுக்கு உயர்தர வேலைவாய்ப்புகள் உருவாக்கப்படும் என்று எதிர்பார்க்கப்படுகிறது.</p>
      
      <h2>AI கவுன்சில் அமைப்பு</h2>
      <p>இதற்கிடையில், மாநில அரசு 'தமிழ்நாடு AI கவுன்சில்' என்ற புதிய அமைப்பை உருவாக்கியுள்ளது. இதில் உலகின் சிறந்த AI வல்லுநர்கள் இடம்பெறுவார்கள் என்று அறிவிக்கப்பட்டுள்ளது. எலைட் செமிகண்டக்டர் மற்றும் ரோபோட்டிக்ஸ் நிறுவனங்கள் இங்கு முதலீடு செய்ய அழைப்பு விடுக்கப்பட்டுள்ளது.</p>
      
      <blockquote>"இது வெறும் கட்டடம் அல்ல, தமிழக இளைஞர்களின் எதிர்காலம்" - தொழில்துறை அமைச்சர்.</blockquote>
      
      <p>இந்த பூங்கா 2027-ம் ஆண்டு முழு பயன்பாட்டிற்கு வரும் என்று தெரிவிக்கப்பட்டுள்ளது.</p>
    `
    }
};

interface PageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const article = ARTICLES[params.slug];
    if (!article) return { title: "Article Not Found" };

    return {
        title: article.title,
        description: article.ai_summary[0],
        openGraph: {
            title: article.title,
            description: article.ai_summary[0],
            images: [article.imageUrl],
            type: "article",
        },
    };
}

export default function ArticlePage({ params }: PageProps) {
    const article = ARTICLES[params.slug];

    if (!article) {
        // For demo purposes, if slug not found, just show the mock article
        // In real app: return notFound();
    }

    // Fallback for demo if generic slug
    const data = article || ARTICLES["tamilnadu-ai-park-announcement"];

    return (
        <div className="min-h-screen bg-background pb-20">
            <SiteHeader />

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Breadcrumb / Back */}
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-red-600">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        முகப்பு
                    </Link>
                </div>

                {/* Article Header */}
                <header className="mb-8">
                    <div className="flex gap-2 mb-4">
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                            {data.category}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 font-noto-sans-tamil text-gray-900 dark:text-gray-50">
                        {data.title}
                    </h1>

                    <div className="flex items-center justify-between border-y py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                            <span className="font-semibold text-gray-900">{data.author}</span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {data.date}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                4 நிமிடம் வாசிக்க
                            </span>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* AI Features Block */}
                <section className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                            <FileText className="w-5 h-5" />
                            <h3 className="font-bold text-lg">AI சுருக்கம் (TL;DR)</h3>
                        </div>
                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                            <PlayCircle className="w-4 h-4" />
                            கேட்க (Audio)
                        </button>
                    </div>
                    <ul className="space-y-2">
                        {data.ai_summary.map((point: string, i: number) => (
                            <li key={i} className="flex gap-2 text-gray-700 dark:text-gray-300 font-medium font-noto-sans-tamil">
                                <span className="text-blue-500">•</span>
                                {point}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Featured Image */}
                <div className="relative aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
                    <Image
                        src={data.imageUrl}
                        alt={data.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Article Content */}
                <article
                    className="prose prose-lg md:prose-xl max-w-none dark:prose-invert font-noto-sans-tamil prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-red-600"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            </main>
        </div>
    );
}
