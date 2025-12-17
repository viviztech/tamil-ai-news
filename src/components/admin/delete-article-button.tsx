"use client";

import { createBrowserClient } from "@supabase/ssr";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteArticleButton({ id }: { id: number }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this article?")) return;
        setLoading(true);

        const supabase = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { error } = await supabase
            .from('articles')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Delete error:", error);
            // Fallback: If RLS fails, we might need a Server Action with Service Role, 
            // but normally Admins should have delete permissions via RLS. 
            // If this fails, I'll switch to a Server Action.
            alert("Failed to delete. Check console.");
        } else {
            router.refresh();
        }
        setLoading(false);
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-red-600 transition-colors disabled:opacity-50"
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
    );
}
