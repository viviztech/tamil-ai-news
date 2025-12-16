"use client";

import { Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <button className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-medium transition-colors">
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </div>

            <div className="space-y-8">

                {/* General Settings */}
                <section className="bg-white p-6 rounded-xl border shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b">General Settings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Site Name</label>
                            <input
                                type="text"
                                defaultValue="Tamil AI News"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Site Description</label>
                            <input
                                type="text"
                                defaultValue="Real-time AI-powered news aggregator"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* AI Configuration */}
                <section className="bg-white p-6 rounded-xl border shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b">AI Configuration</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <h3 className="font-medium text-slate-900">Auto-Translation</h3>
                                <p className="text-sm text-slate-500">Automatically translate fetched articles to Tamil</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <div>
                                <h3 className="font-medium text-slate-900">Auto-Summarization</h3>
                                <p className="text-sm text-slate-500">Generate TL;DR bullet points for every article</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* API Keys */}
                <section className="bg-white p-6 rounded-xl border shadow-sm opacity-60">
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-lg font-semibold text-slate-900">API Keys</h2>
                        <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">Managed in .env</span>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Google Gemini API Key</label>
                            <input
                                type="password"
                                value="************************"
                                disabled
                                className="w-full px-4 py-2 border rounded-lg bg-slate-50 text-slate-500"
                            />
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
