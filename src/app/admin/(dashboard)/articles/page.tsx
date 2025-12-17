import Link from "next/link";
import { Plus, Search, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { format } from "date-fns";

export default async function ArticlesPage() {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return cookieStore.getAll() }
            }
        }
    );

    const { data: articles, error } = await supabase
        .from('articles')
        .select(`
            id,
            title,
            slug,
            is_published,
            created_at,
            categories (
                name_ta,
                name_en
            )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching articles:", error);
    }

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

            {/* Filter Bar - Placeholder for now as Search requires Client Component state */}
            <div className="flex gap-4 p-4 bg-white rounded-lg border shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        disabled
                        className="w-full pl-10 pr-4 py-2 border rounded-md bg-slate-50 cursor-not-allowed"
                    />
                </div>
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
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {articles?.map((article: any) => (
                            <tr key={article.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900 font-noto-sans-tamil line-clamp-1">{article.title}</div>
                                    <div className="text-xs text-slate-500 line-clamp-1">{article.slug}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 font-medium">
                                        {article.categories?.name_en || 'Uncategorized'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${article.is_published
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {article.is_published ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    {format(new Date(article.created_at), 'PPP')}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/news/${article.slug}`} target="_blank" className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-blue-600 transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </Link>
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
                {(!articles || articles.length === 0) && (
                    <div className="p-8 text-center text-slate-500">
                        No articles found. Create one!
                    </div>
                )}
            </div>
        </div>
    );
}
