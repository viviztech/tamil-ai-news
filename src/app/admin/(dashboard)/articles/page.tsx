"use client";

import Link from "next/link";
import { Plus, Search, MoreVertical, Edit, Trash2, Eye } from "lucide-react";

// Mock Data
const ARTICLES = [
    {
        id: 1,
        title: "செயற்கை நுண்ணறிவு புரட்சி: தமிழகத்தில் புதிய பூங்கா",
        slug: "tamilnadu-ai-park-announcement",
        status: "published",
        category: "Technology",
        date: "2024-03-20",
        views: 1240,
    },
    {
        id: 2,
        title: "இஸ்ரோவின் அடுத்த சாதனை பயணம்",
        slug: "isro-next-mission",
        status: "draft",
        category: "Science",
        date: "2024-03-19",
        views: 0,
    },
    {
        id: 3,
        title: "உலக முதலீட்டாளர்கள் மாநாடு 2025",
        slug: "investors-meet-2025",
        status: "published",
        category: "Politics",
        date: "2024-03-18",
        views: 4500,
    },
];

export default function ArticlesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Articles</h1>
                <Link
                    href="/admin/articles/new"
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Article
                </Link>
            </div>

            {/* Filter Bar */}
            <div className="flex gap-4 p-4 bg-white rounded-lg border shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 outline-none"
                    />
                </div>
                <select className="px-4 py-2 border rounded-md bg-white">
                    <option>All Categories</option>
                    <option>Politics</option>
                    <option>Cinema</option>
                    <option>Technology</option>
                </select>
                <select className="px-4 py-2 border rounded-md bg-white">
                    <option>All Status</option>
                    <option>Published</option>
                    <option>Draft</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Article</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Category</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Views</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {ARTICLES.map((article) => (
                            <tr key={article.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900 font-noto-sans-tamil">{article.title}</div>
                                    <div className="text-xs text-slate-500">{article.slug}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 font-medium">
                                        {article.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${article.status === 'published'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{article.date}</td>
                                <td className="px-6 py-4 text-slate-600">{article.views.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-blue-600 transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <Link
                                            href={`/admin/articles/${article.id}`}
                                            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-amber-600 transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-red-600 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
