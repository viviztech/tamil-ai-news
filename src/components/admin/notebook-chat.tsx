"use client";

import { useChat, type Message } from "@ai-sdk/react";
import { Send, Upload } from "lucide-react";
import { useState } from "react";

export function NotebookChat() {
    const [context, setContext] = useState("");
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        body: { context },
    });

    return (
        <div className="flex h-[calc(100vh-12rem)] border rounded-xl overflow-hidden bg-white shadow-sm">
            {/* Sidebar: Sources */}
            <div className="w-1/3 border-r bg-slate-50 p-4 overflow-y-auto">
                <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Sources
                </h3>

                <div className="space-y-4">
                    <textarea
                        className="w-full h-64 p-3 text-sm border rounded-lg focus:ring-2 focus:ring-red-500 outline-none resize-none font-mono"
                        placeholder="Paste source text, government orders, or press releases here..."
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                    />
                    <p className="text-xs text-slate-500">
                        Paste the raw English content here. The AI will answer questions based ONLY on this text.
                    </p>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="w-2/3 flex flex-col">
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <p>Ask questions about the source material...</p>
                        </div>
                    )}

                    {messages.map((m: Message) => (
                        <div
                            key={m.id}
                            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${m.role === "user"
                                    ? "bg-red-600 text-white"
                                    : "bg-slate-100 text-slate-800"
                                    }`}
                            >
                                {m.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-slate-100 rounded-lg px-4 py-2 text-sm text-slate-500 animate-pulse">
                                Analyzing...
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
                    <div className="relative">
                        <input
                            className="w-full pl-4 pr-12 py-3 border rounded-full focus:ring-2 focus:ring-red-500 outline-none"
                            placeholder="Ask a question (e.g., 'Summarize the key points in Tamil')..."
                            value={input}
                            onChange={handleInputChange}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input}
                            className="absolute right-2 top-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 disabled:opacity-50 transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
