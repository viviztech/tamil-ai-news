import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            <AdminSidebar />
            <div className="ml-64 p-8">
                {children}
            </div>
        </div>
    );
}
