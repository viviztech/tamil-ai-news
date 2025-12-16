"use client";

import { useState } from "react";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AIEditorTools } from "@/components/admin/ai-tools";
import { createBrowserClient } from "@supabase/ssr";
import { createArticle } from "@/app/actions/articles";

export default function NewArticlePage() {
    const router = useRouter();
    const [publishing, setPublishing] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        summary: "",
        content: "",
        category: "generative-ai",
        seoTags: "",
        status: "draft"
    });

    const handleAIUpdate = (data: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const handlePublish = async () => {
        setPublishing(true);

        try {
            const result = await createArticle(formData);

            if (!result.success) {
                alert("Failed: " + result.message);
                return;
            }

            router.push("/admin/articles");

        } catch (e) {
            console.error("Submission Error:", e);
            alert("An unexpected error occurred.");
        } finally {
            setPublishing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-500" />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">Create New Article</h1>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">Autosaved</span>
                    <button
                        onClick={handlePublish}
                        disabled={publishing}
                        className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-full font-medium transition-colors disabled:opacity-70"
                    >
                        {publishing ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {publishing ? "Publishing..." : "Publish"}
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
                                <option value="generative-ai">Generative AI (ஜெனரேட்டிவ் AI)</option>
                                <option value="machine-learning">Machine Learning (இயந்திர கற்றல்)</option>
                                <option value="robotics">Robotics (ரோபோட்டிக்ஸ்)</option>
                                <option value="llms">LLMs (மொழி மாதிரிகள்)</option>
                                <option value="ai-ethics">AI Ethics (AI நெறிமுறைகள்)</option>
                                <option value="startups">AI Startups (AI நிறுவனங்கள்)</option>
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
