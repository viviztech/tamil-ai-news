import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Helper to get Supabase Client
async function getSupabase() {
    const cookieStore = await cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    // Reading only, no need to set
                },
            },
        }
    );
}

// 1. Get Categories
export async function getCategories() {
    const supabase = await getSupabase();
    // Cache for 1 hour? Or just fetch. Supabase is fast.
    const { data } = await supabase
        .from('categories')
        .select('id, name_ta, name_en, slug')
        .order('name_en');
    return data || [];
}

// 2. Get Featured/Latest Articles
export async function getLatestArticles(limit = 10) {
    const supabase = await getSupabase();
    const { data } = await supabase
        .from('articles')
        .select(`
            *,
            categories ( name_ta, name_en, slug )
        `)
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(limit);

    return data || [];
}

export async function getArticleBySlug(slug: string) {
    const supabase = await getSupabase();
    const { data } = await supabase
        .from('articles')
        .select(`
            *,
            categories ( name_ta, name_en, slug ),
            authors ( full_name, avatar_url )
        `)
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

    return data;
}

export async function getArticlesByCategory(categorySlug: string) {
    const supabase = await getSupabase();

    // First get category ID or just join
    const { data } = await supabase
        .from('articles')
        .select(`
            *,
            categories!inner ( name_ta, name_en, slug )
        `)
        .eq('categories.slug', categorySlug)
        .eq('is_published', true)
        .order('published_at', { ascending: false });

    return data || [];
}
