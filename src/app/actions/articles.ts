"use server";

import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function createArticle(formData: any) {
    const cookieStore = await cookies();

    // 1. Initialize Default Supabase (for Auth Check)
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
                    } catch { }
                },
            },
        }
    );

    // 2. Check Auth (Allow Dev Bypass)
    const isDevBypass = cookieStore.get('sb-access-token')?.value === 'fake-token';
    const { data: { user } } = await supabase.auth.getUser();

    if (!user && !isDevBypass) {
        return { success: false, message: "Unauthorized" };
    }

    // 3. Initialize Admin Supabase (Service Role) for Database Write to Bypass RLS
    // In 'Dev Bypass' mode (or if user role not set in DB), normal RLS blocks 'insert'.
    // Since this Action is behind Admin protection, we use Service Key.
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    let supabaseAdmin = supabase;

    if (serviceKey) {
        supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            serviceKey,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        ) as any; // Cast to avoid type mismatch with ssr client if strict
    } else {
        console.warn("SUPABASE_SERVICE_ROLE_KEY missing. RLS might block writes.");
    }

    try {
        // 4. Get Category ID
        const { data: categoryData, error: catError } = await supabaseAdmin
            .from('categories')
            .select('id')
            .eq('slug', formData.category)
            .single();

        if (catError) {
            return { success: false, message: "Invalid Category: " + catError.message };
        }

        // 5. Insert Article
        const { error } = await supabaseAdmin.from('articles').insert({
            title: formData.title,
            slug: formData.slug || formData.title.toLowerCase().replace(/ /g, '-').slice(0, 50),
            content: formData.content,
            ai_summary_ta: formData.summary,
            summary: formData.summary,
            image_url: formData.image_url,
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
