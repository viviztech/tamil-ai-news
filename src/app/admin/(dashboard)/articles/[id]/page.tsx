"use client";

import { useState, useEffect } from "react";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AIEditorTools } from "@/components/admin/ai-tools";
import { useParams } from "next/navigation";

// Mock Data for specific ID (simulating DB fetch)
const MOCK_ARTICLE = {
    title: "செயற்கை நுண்ணறிவு புரட்சி: தமிழகத்தில் புதிய தொழில்நுட்ப பூங்கா",
    slug: "tamilnadu-ai-park-announcement",
    summary: "சென்னை அருகே அமையவுள்ள பிரம்மாண்டமான AI பூங்கா, ஆயிரக்கணக்கான வேலைவாய்ப்புகளை உருவாக்கும் என எதிர்பார்க்கப்படுகிறது.",
    content: "செயற்கை நுண்ணறிவுத் துறையில் தமிழகம் ஒரு புதிய மைல்கல்லை எட்டியுள்ளது. முதல்வர் இன்று வெளியிட்ட அறிவிப்பின்படி...",
    category: "technology",
    seoTags: "AI, Tamil Nadu, Tech Park, Chennai",
    status: "published"
};

export default function EditArticlePage() {
    const params = useParams();
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        summary: "",
        content: "",
        category: "politics",
        seoTags: "",
        status: "draft"
    });

    // Simulate Fetching Data
    useEffect(() => {
        if (params.id) {
            // In real app: fetchArticle(params.id)
            setFormData(MOCK_ARTICLE);
        }
    }, [params.id]);

    const handleAIUpdate = (data: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

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
                    <span className="text-sm text-slate-500">Last saved: Just now</span>
                    <button className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-full font-medium transition-colors">
                        <Save className="w-4 h-4" />
                        Update
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
                                <option value="politics">Politics (அரசியல்)</option>
                                <option value="cinema">Cinema (சினிமா)</option>
                                <option value="technology">Technology (தொழில்நுட்பம்)</option>
                                <option value="world">World (உலகம்)</option>
                            </select>
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
