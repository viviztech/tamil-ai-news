import { SiteHeader } from "@/components/site-header";
import { NewsCard } from "@/components/news-card";

// Mock Data
const FEATURED_NEWS = {
  title: "செயற்கை நுண்ணறிவு புரட்சி: தமிழகத்தில் புதிய தொழில்நுட்ப பூங்கா",
  category: "தொழில்நுட்பம்",
  summary: "சென்னை அருகே அமையவுள்ள பிரம்மாண்டமான AI பூங்கா, ஆயிரக்கணக்கான வேலைவாய்ப்புகளை உருவாக்கும் என எதிர்பார்க்கப்படுகிறது.",
  imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60",
  date: "2 மணி நேரத்திற்கு முன்",
  slug: "tamilnadu-ai-park-announcement",
};

const TRENDING_NEWS = [
  {
    title: "இஸ்ரோவின் அடுத்த சாதனை பயணம்",
    category: "அறிவியல்",
    imageUrl: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&auto=format&fit=crop&q=60",
    date: "4 மணி நேரத்திற்கு முன்",
    slug: "isro-next-mission",
  },
  {
    title: "தங்கம் விலை அதிரடி சரிவு",
    category: "வர்த்தகம்",
    imageUrl: "https://images.unsplash.com/photo-1610375460993-d60d948775dd?w=800&auto=format&fit=crop&q=60",
    date: "5 மணி நேரத்திற்கு முன்",
    slug: "gold-rate-drop",
  },
  {
    title: "கோலிவுட் நட்சத்திரத்தின் புதிய படம்",
    category: "சினிமா",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=60",
    date: "6 மணி நேரத்திற்கு முன்",
    slug: "kollywood-new-movie",
  },
];

const LATEST_NEWS = [
  {
    title: "உலக முதலீட்டாளர்கள் மாநாடு 2025",
    category: "அரசியல்",
    summary: "சென்னையில் கோலாகலமாக தொடங்கியது உலக முதலீட்டாளர்கள் மாநாடு.",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=60",
    date: "30 நிமிடங்களுக்கு முன்",
    slug: "investors-meet-2025",
  },
  {
    title: "புதிய எலக்ட்ரிக் கார் அறிமுகம்",
    category: "ஆட்டோமொபைல்",
    summary: "டாடா மோட்டார்ஸ் தனது புதிய எலக்ட்ரிக் காரை அறிமுகப்படுத்தியது.",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=60",
    date: "1 மணி நேரத்திற்கு முன்",
    slug: "new-ev-launch",
  },
  {
    title: "கூகுளின் புதிய AI அப்டேட்",
    category: "தொழில்நுட்பம்",
    summary: "ஜெமினி மாடலில் புதிய வசதிகள் சேர்க்கப்பட்டுள்ளன.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60",
    date: "3 மணி நேரத்திற்கு முன்",
    slug: "google-gemini-update",
  },
  {
    title: "ஐபிஎல் 2025 அட்டவணை வெளியீடு",
    category: "விளையாட்டு",
    summary: "ரசிகர்கள் ஆவலுடன் எதிர்பார்த்த ஐபிஎல் போட்டிகள் ஏப்ரல் முதல் வாரம் துவங்குகிறது.",
    imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=60",
    date: "4 மணி நேரத்திற்கு முன்",
    slug: "ipl-2025-schedule",
  },
];

export default function Home() {
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
            <NewsCard
              {...FEATURED_NEWS}
              size="large"
            />
          </div>

          {/* Trending Side List */}
          <div>
            <h2 className="text-2xl font-bold mb-4 font-noto-sans-tamil flex items-center gap-2">
              <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block"></span>
              டிரெண்டிங்
            </h2>
            <div className="flex flex-col gap-4">
              {TRENDING_NEWS.map((news) => (
                <NewsCard key={news.slug} {...news} size="small" />
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
            {LATEST_NEWS.map((news) => (
              <NewsCard key={news.slug} {...news} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
