"use client";

import { useState } from "react";
import { Loader2, Wand2, Languages, Sparkles } from "lucide-react";
import { generateNewsMetadata, translateToTamil } from "@/app/actions/ai";

export function AIEditorTools({
    content,
    onUpdate
}: {
    content: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onUpdate: (data: any) => void
}) {
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<"metadata" | "translate" | null>(null);

    const handleGenerateMetadata = async () => {
        if (!content) return;
        setLoading(true);
        setMode("metadata");

        try {
            const result = await generateNewsMetadata(content);
            if (result.success && result.data) {
                onUpdate({
                    title: result.data.title_ta,
                    summary: result.data.summary_ta.join("\n"),
                    seoTags: result.data.seo_tags.join(", "),
                    category: result.data.category,
                });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
            setMode(null);
        }
    };

    const handleTranslate = async () => {
        if (!content) return;
        setLoading(true);
        setMode("translate");

        try {
            const result = await translateToTamil(content);
            if (result.success) {
                onUpdate({ content: result.data });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
            setMode(null);
        }
    };

    return (
        <div className="flex flex-col gap-2 p-4 bg-slate-50 border rounded-lg mb-4">
            <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                AI Assistant
            </h3>

            <div className="flex gap-3">
                <button
                    onClick={handleGenerateMetadata}
                    disabled={loading || !content}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-purple-300 hover:text-purple-700 rounded-md text-sm font-medium transition-all group disabled:opacity-50"
                >
                    {loading && mode === "metadata" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Wand2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    )}
                    Generate Metadata & Title
                </button>

                <button
                    onClick={handleTranslate}
                    disabled={loading || !content}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-700 rounded-md text-sm font-medium transition-all group disabled:opacity-50"
                >
                    {loading && mode === "translate" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Languages className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    )}
                    Translate to Tamil
                </button>
            </div>

            {!content && (
                <p className="text-xs text-slate-400 text-center">
                    Paste English content below to use AI tools
                </p>
            )}
        </div>
    );
}
