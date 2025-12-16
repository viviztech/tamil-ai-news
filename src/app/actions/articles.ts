"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createArticle(formData: any) {
    const cookieStore = await cookies();

    // 1. Check for Placeholder Keys
    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder")) {
        return {
            success: false,
            message: "Supabase not connected. Please set real credentials in .env.local"
        };
    }

    // 2. Initialize Supabase
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );

    // 3. Check Auth (Allow Dev Bypass)
    const isDevBypass = cookieStore.get('sb-access-token')?.value === 'fake-token';
    const { data: { user } } = await supabase.auth.getUser();

    if (!user && !isDevBypass) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        // 4. Get Category ID
        const { data: categoryData, error: catError } = await supabase
            .from('categories')
            .select('id')
            .eq('slug', formData.category)
            .single();

        if (catError) {
            return { success: false, message: "Invalid Category: " + catError.message };
        }

        // 5. Insert Article
        const { error } = await supabase.from('articles').insert({
            title: formData.title,
            slug: formData.slug || formData.title.toLowerCase().replace(/ /g, '-').slice(0, 50),
            content: formData.content,
            ai_summary_ta: formData.summary,
            summary: formData.summary,
            category_id: categoryData?.id || null,
            is_published: true,
            tags: formData.seoTags ? formData.seoTags.split(',').map((t: string) => t.trim()) : [],
            published_at: new Date().toISOString()
        });

        if (error) {
            return { success: false, message: error.message };
        }

        return { success: true, message: "Article created successfully" };

    } catch (e: any) {
        return { success: false, message: e.message };
    }
}
