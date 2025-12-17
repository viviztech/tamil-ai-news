"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Loader2, Save } from "lucide-react";

export default function NewCategoryPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name_en: "",
        name_ta: "",
        slug: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateSlug = () => {
        // Simple slugify from name_en
        const slug = formData.name_en
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
        setFormData(prev => ({ ...prev, slug }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const supabase = createClient();
        const { error } = await supabase
            .from('categories')
            .insert([formData]);

        if (error) {
            alert(`Error: ${error.message}`);
            setLoading(false);
        } else {
            router.push("/admin/categories");
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <div className="mb-8">
                <Link
                    href="/admin/categories"
                    className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Categories
                </Link>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                    Create New Category
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1">English Name</label>
                    <input
                        type="text"
                        name="name_en"
                        value={formData.name_en}
                        onChange={handleChange}
                        onBlur={!formData.slug ? generateSlug : undefined}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-red-600 focus:outline-none transition-all"
                        placeholder="e.g. Technology"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Tamil Name</label>
                    <input
                        type="text"
                        name="name_ta"
                        value={formData.name_ta}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-red-600 focus:outline-none transition-all font-noto-sans-tamil"
                        placeholder="e.g. தொழில்நுட்பம்"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Slug (URL)</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-red-600 focus:outline-none transition-all font-mono text-sm"
                        placeholder="e.g. technology"
                        required
                    />
                    <p className="text-xs text-slate-500 mt-1">Used in URL: /category/<b>slug</b></p>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Create Category
                    </button>
                </div>
            </form>
        </div>
    );
}
