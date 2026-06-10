import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Plus, Share2, Star, Clock } from "lucide-react";

interface T {
  id: string; title: string; synopsis: string | null; long_description: string | null;
  poster_url: string | null; backdrop_url: string | null; trailer_url: string | null;
  duration_minutes: number | null; age_rating: string | null; track: string | null;
  target_roles: string[] | null; cast_crew: Record<string, unknown> | null;
  badges: string[] | null; kind: string;
}

const roleLabels: Record<string, string> = { father: "الأب", mother: "الأم", son: "الابن", daughter: "البنت" };

export default function TitleDetail() {
  const { id } = useParams();
  const [t, setT] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase.from("titles").select("*").eq("id", id).maybeSingle().then(({ data }) => {
      setT(data as T | null);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <SiteLayout><div className="container py-32 text-center text-muted-foreground">جاري التحميل...</div></SiteLayout>;
  if (!t) return <SiteLayout><div className="container py-32 text-center">لم يتم العثور على المحتوى. <Link to="/" className="text-primary">العودة</Link></div></SiteLayout>;

  return (
    <SiteLayout>
      {/* Hero / Backdrop */}
      <section className="relative min-h-[70vh] overflow-hidden">
        {t.backdrop_url || t.poster_url ? (
          <img src={t.backdrop_url ?? t.poster_url ?? ""} alt={t.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : <div className="absolute inset-0 bg-gradient-to-br from-secondary via-card to-background" />}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-l from-background/60 to-transparent" />

        <div className="relative container mx-auto px-6 pt-32 pb-12 flex flex-col md:flex-row gap-10">
          {t.poster_url && (
            <div className="w-48 md:w-64 flex-shrink-0 mx-auto md:mx-0">
              <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-gold-lg border border-primary/20">
                <img src={t.poster_url} alt={t.title} className="w-full h-full object-cover" />
              </div>
            </div>
          )}
          <div className="flex-1 max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {t.track && <Badge variant="secondary" className="bg-primary/15 text-primary border-primary/30">{t.track}</Badge>}
              {t.age_rating && <Badge variant="outline">{t.age_rating}</Badge>}
              {t.badges?.map((b) => <Badge key={b} className="bg-gradient-gold text-primary-foreground">{b}</Badge>)}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4"><span className="text-gold-gradient">{t.title}</span></h1>
            {t.synopsis && <p className="text-lg text-muted-foreground leading-relaxed mb-6">{t.synopsis}</p>}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              {t.duration_minutes && <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {t.duration_minutes} دقيقة</span>}
              {t.target_roles && t.target_roles.length > 0 && (
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-primary" /> مناسب لـ: {t.target_roles.map(r => roleLabels[r] ?? r).join("، ")}</span>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="lg" onClick={() => setShowTrailer(true)} disabled={!t.trailer_url}>
                <Play className="w-5 h-5 ml-2 fill-current" /> {t.trailer_url ? "شاهد الإعلان" : "قريباً"}
              </Button>
              <Button variant="outlineGold" size="lg"><Plus className="w-5 h-5 ml-2" /> أضف لقائمتي</Button>
              <Button variant="ghost" size="lg"><Share2 className="w-5 h-5 ml-2" /> مشاركة</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Long description */}
      {t.long_description && (
        <section className="container mx-auto px-6 py-12 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4 text-primary">تفاصيل أكثر</h2>
          <p className="text-muted-foreground leading-loose whitespace-pre-line">{t.long_description}</p>
        </section>
      )}

      {/* Trailer modal */}
      {showTrailer && t.trailer_url && (
        <div className="fixed inset-0 z-[60] bg-background/95 flex items-center justify-center p-4" onClick={() => setShowTrailer(false)}>
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <video src={t.trailer_url} controls autoPlay className="w-full h-full" />
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
