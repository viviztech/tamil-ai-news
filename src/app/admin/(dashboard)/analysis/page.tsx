import { NotebookChat } from "@/components/admin/notebook-chat";

export default function SourceAnalysisPage() {
    return (
        <div className="h-full">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Source Analysis (NotebookLM)</h1>
                <p className="text-slate-500">
                    Upload raw sources and use AI to extract facts for your Tamil articles.
                </p>
            </div>

            <NotebookChat />
        </div>
    );
}
