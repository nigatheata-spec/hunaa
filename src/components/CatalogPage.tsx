import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

interface Title {
  id: string;
  title: string;
  synopsis: string | null;
  poster_url: string | null;
  backdrop_url: string | null;
  track: string | null;
  kind: string;
}

export const CatalogPage = ({ kind, title, subtitle }: { kind: "movie" | "series" | "reel" | "influencer"; title: string; subtitle: string }) => {
  const [items, setItems] = useState<Title[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("titles").select("*").eq("kind", kind).eq("is_published", true).then(({ data }) => {
      setItems((data ?? []) as Title[]);
      setLoading(false);
    });
  }, [kind]);

  return (
    <SiteLayout>
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="text-gold-gradient">{title}</span></h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        {loading ? (
          <div className="text-center text-muted-foreground py-20">جاري التحميل...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">لم يتم إضافة محتوى بعد في هذا القسم.</p>
            <p className="text-sm text-primary/70">سيقوم فريق "هنا" قريباً برفع باقة أولى من المحتوى.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {items.map((t) => (
              <Link to={`/title/${t.id}`} key={t.id} className="group">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-card border border-primary/10 group-hover:border-primary/40 transition-all">
                  {t.poster_url ? <img src={t.poster_url} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <div className="w-full h-full bg-gradient-to-br from-secondary to-card" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 inset-x-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.track && <Badge variant="secondary" className="bg-primary/20 text-primary text-[10px]">{t.track}</Badge>}
                  </div>
                </div>
                <h3 className="mt-3 text-sm font-medium group-hover:text-primary transition-colors">{t.title}</h3>
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
};
