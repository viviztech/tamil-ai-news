import Link from "next/link";
import { FileText, Users, Eye, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Articles" value="1,248" icon={FileText} color="blue" />
                <StatCard title="Total Views" value="84.3k" icon={Eye} color="green" />
                <StatCard title="Active Users" value="2,401" icon={Users} color="purple" />
                <StatCard title="AI Generations" value="452" icon={TrendingUp} color="orange" />
            </div>

            {/* Recent Activity / Drafts */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-slate-900">Recent Articles</h2>
                    <Link href="/admin/articles/new" className="text-sm font-medium text-red-600 hover:text-red-700">
                        + Create New
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 uppercase">
                            <tr>
                                <th className="px-4 py-3 font-medium">Title</th>
                                <th className="px-4 py-3 font-medium">Category</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr className="hover:bg-slate-50">
                                <td className="px-4 py-3 font-medium text-slate-900">
                                    செயற்கை நுண்ணறிவு புரட்சி
                                </td>
                                <td className="px-4 py-3 text-slate-600">Technology</td>
                                <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Published</span></td>
                                <td className="px-4 py-3 text-slate-500">Dec 16, 2025</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="px-4 py-3 font-medium text-slate-900">
                                    Budget 2026 Analysis
                                </td>
                                <td className="px-4 py-3 text-slate-600">Politics</td>
                                <td className="px-4 py-3"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Draft</span></td>
                                <td className="px-4 py-3 text-slate-500">Dec 15, 2025</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// @ts-ignore
function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
    const colorClasses: Record<string, string> = {
        blue: "bg-blue-100 text-blue-600",
        green: "bg-emerald-100 text-emerald-600",
        purple: "bg-purple-100 text-purple-600",
        orange: "bg-orange-100 text-orange-600",
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center gap-4">
            <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-slate-500 font-medium">{title}</p>
                <p className="text-2xl font-bold text-slate-900">{value}</p>
            </div>
        </div>
    );
}
