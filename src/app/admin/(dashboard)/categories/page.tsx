"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name_en');

        if (data) setCategories(data);
        setLoading(false);
    };

    const deleteCategory = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        const supabase = createClient();
        const { error } = await supabase.from('categories').delete().eq('id', id);

        if (!error) {
            fetchCategories(); // Refresh list
        } else {
            alert("Error deleting category");
        }
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                    Category Management
                </h1>
                <Link
                    href="/admin/categories/new"
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Category
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Name (English)</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Name (Tamil)</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">Slug</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                        Loading categories...
                                    </td>
                                </tr>
                            ) : categories.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                        No categories found. Create one above.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category) => (
                                    <tr key={category.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium">{category.name_en}</td>
                                        <td className="px-6 py-4 font-noto-sans-tamil">{category.name_ta}</td>
                                        <td className="px-6 py-4 font-mono text-xs text-slate-500">{category.slug}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/categories/${category.id}`}
                                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => deleteCategory(category.id)}
                                                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-600 dark:text-slate-400 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
