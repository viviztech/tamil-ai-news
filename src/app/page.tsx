import { SiteHeader } from "@/components/site-header";
import { NewsCard } from "@/components/news-card";
import { getLatestArticles } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";
import { ta } from "date-fns/locale";

// Helper to format date
const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: ta });
  } catch {
    return "";
  }
};

export default async function Home() {
  const articles = await getLatestArticles(15);

  const featured = articles[0]; // Newest is featured
  const trending = articles.slice(1, 4); // Next 3 are trending
  const latest = articles.slice(4); // Rest are latest

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Hero Article */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 font-noto-sans-tamil flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block"></span>
              சிறப்புச் செய்திகள்
            </h2>
            {featured ? (
              <NewsCard
                title={featured.title}
                category={featured.categories?.name_ta || "பொது"}
                imageUrl={featured.image_url || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60"}
                date={formatDate(featured.published_at)}
                slug={featured.slug}
                summary={featured.summary}
                size="large"
              />
            ) : (
              <div className="h-64 flex items-center justify-center bg-slate-100 rounded-xl">
                <p className="text-slate-500">செய்திகள் இல்லை (No Articles)</p>
              </div>
            )}
          </div>

          {/* Trending Side List */}
          <div>
            <h2 className="text-2xl font-bold mb-4 font-noto-sans-tamil flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block"></span>
              டிரெண்டிங்
            </h2>
            <div className="flex flex-col gap-4">
              {trending.map((news: any) => (
                <NewsCard
                  key={news.slug}
                  title={news.title}
                  category={news.categories?.name_ta || "பொது"}
                  imageUrl={news.image_url || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"}
                  date={formatDate(news.published_at)}
                  slug={news.slug}
                  size="small"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Latest News Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-noto-sans-tamil flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block"></span>
              சமீபத்திய செய்திகள்
            </h2>
            <button className="text-sm text-red-600 hover:text-red-700 font-medium">
              மேலும் காண்க &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latest.map((news: any) => (
              <NewsCard
                key={news.slug}
                title={news.title}
                category={news.categories?.name_ta || "பொது"}
                imageUrl={news.image_url || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"}
                date={formatDate(news.published_at)}
                slug={news.slug}
                summary={news.summary}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

