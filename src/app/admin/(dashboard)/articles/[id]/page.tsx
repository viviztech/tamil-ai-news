"use client";

import { useState, useEffect } from "react";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { AIEditorTools } from "@/components/admin/ai-tools";
import { useParams, useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function EditArticlePage() {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        summary: "",
        content: "",
        category: "generative-ai",
        seoTags: "",
        status: "draft",
        image_url: ""
    });

    useEffect(() => {
        const fetchArticle = async () => {
            if (!params.id) return;

            const supabase = createBrowserClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

            const { data, error } = await supabase
                .from('articles')
                .select('*, categories(slug)')
                .eq('id', params.id)
                .single();

            if (error) {
                console.error("Error fetching article:", error);
                alert("Error loading article");
                return;
            }

            if (data) {
                setFormData({
                    title: data.title,
                    slug: data.slug,
                    summary: data.summary || data.ai_summary_ta || "",
                    content: data.content,
                    category: data.categories?.slug || "generative-ai",
                    seoTags: data.tags ? data.tags.join(", ") : "",
                    status: data.is_published ? "published" : "draft",
                    image_url: data.image_url || ""
                });
            }
            setLoading(false);
        };

        fetchArticle();
    }, [params.id]);

    const handleUpdate = async () => {
        setSaving(true);
        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Fetch Category ID first (if needed to update)
        // ... assuming existing logic on server or we keep existing category_id if not changed?
        // Actually, we should probably update the server helper or do it here.
        // Let's do a simple update for now, strictly updating fields.

        // We need category_id from slug
        const { data: catData } = await supabase.from('categories').select('id').eq('slug', formData.category).single();

        const { error } = await supabase
            .from('articles')
            .update({
                title: formData.title,
                content: formData.content,
                summary: formData.summary,
                image_url: formData.image_url,
                is_published: formData.status === 'published',
                category_id: catData?.id,
                tags: formData.seoTags.split(',').map(s => s.trim()),
                updated_at: new Date().toISOString()
            })
            .eq('id', params.id);

        setSaving(false);

        if (error) {
            alert("Failed to update: " + error.message);
        } else {
            alert("Article updated!");
            router.refresh();
        }
    };

    const handleAIUpdate = (data: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    if (loading) return <div className="p-20 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/articles" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-500" />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">Edit Article</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleUpdate}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-full font-medium transition-colors disabled:opacity-70"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? "Updating..." : "Update"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Editor */}
                <div className="lg:col-span-2 space-y-6">

                    <AIEditorTools content={formData.content} onUpdate={handleAIUpdate} />

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Article Title (Tamil)</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 text-lg font-bold border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none font-noto-sans-tamil"
                            placeholder="Enter title here..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Article Content</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full h-[500px] px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none font-noto-sans-tamil text-slate-700 leading-relaxed resize-none"
                            placeholder="Paste content source or write here..."
                        />
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-white p-5 rounded-xl border shadow-sm space-y-4">
                        <h3 className="font-semibold text-slate-900">Publishing Details</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md text-sm"
                            >
                                <option value="generative-ai">Generative AI</option>
                                <option value="machine-learning">Machine Learning</option>
                                <option value="robotics">Robotics</option>
                                <option value="llms">LLMs</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Featured Image URL</label>
                            <input
                                type="text"
                                value={formData.image_url}
                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md text-sm"
                                placeholder="https://..."
                            />
                            {formData.image_url && (
                                <div className="mt-2 relative h-32 w-full rounded-md overflow-hidden bg-slate-100 border">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={formData.image_url}
                                        alt="Preview"
                                        className="object-cover w-full h-full"
                                        onError={(e) => (e.currentTarget.style.display = 'none')}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Generated Summary</label>
                            <textarea
                                value={formData.summary}
                                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                className="w-full h-32 px-3 py-2 border rounded-md text-sm font-noto-sans-tamil"
                                placeholder="AI will generate this..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">SEO Tags</label>
                            <input
                                type="text"
                                value={formData.seoTags}
                                onChange={(e) => setFormData({ ...formData, seoTags: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md text-sm"
                                placeholder="news, tamil, breaking..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
