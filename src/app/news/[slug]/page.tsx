import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Share2, PlayCircle, FileText, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

import { getArticleBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ta } from "date-fns/locale";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);
    if (!article) return { title: "Article Not Found" };

    return {
        title: article.title,
        description: article.ai_summary_ta || article.summary,
        openGraph: {
            title: article.title,
            description: article.ai_summary_ta || article.summary,
            images: [article.image_url],
            type: "article",
        },
    };
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    // Map DB fields to UI
    const data = {
        ...article,
        category: article.categories?.name_ta || "General",
        author: article.authors?.full_name || "செய்திப் பிரிவு",
        imageUrl: article.image_url || "/placeholder.jpg",
        date: article.published_at ? formatDistanceToNow(new Date(article.published_at), { addSuffix: true, locale: ta }) : "",
        // DB stores ai_summary_ta as string, but UI expects array?
        // Check schema -> ai_summary_ta is text.
        // UI code map(point => ...) implies array.
        // Let's assume it's just text for now, or split by newline if we want bullet points.
        ai_summary: article.ai_summary_ta ? article.ai_summary_ta.split('\n') : []
    };

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
