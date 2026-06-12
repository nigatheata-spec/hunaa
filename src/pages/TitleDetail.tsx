import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Plus, Share2, Star, Clock, Users, Sparkles, ChevronLeft } from "lucide-react";

interface T {
  id: string; title: string; synopsis: string | null; long_description: string | null;
  poster_url: string | null; backdrop_url: string | null; trailer_url: string | null;
  duration_minutes: number | null; age_rating: string | null; track: string | null;
  target_roles: string[] | null; cast_crew: Record<string, unknown> | null;
  badges: string[] | null; kind: string; stars?: string[] | null;
}

const roleLabels: Record<string, string> = { father: "الأب", mother: "الأم", son: "الابن", daughter: "البنت" };
const kindLabels: Record<string, string> = { movie: "فيلم", series: "مسلسل", reel: "ريل", influencer: "شخصية مؤثرة" };

export default function TitleDetail() {
  const { id } = useParams();
  const [t, setT] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [related, setRelated] = useState<T[]>([]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    supabase.from("titles").select("*").eq("id", id).maybeSingle().then(({ data }) => {
      setT(data as T | null);
      setLoading(false);
      if (data) {
        supabase.from("titles").select("*").eq("kind", (data as T).kind).neq("id", id).eq("is_published", true).limit(8).then(({ data: r }) => {
          setRelated((r ?? []) as T[]);
        });
      }
    });
  }, [id]);

  if (loading) return <SiteLayout><div className="container py-32 text-center text-muted-foreground">جاري التحميل...</div></SiteLayout>;
  if (!t) return <SiteLayout><div className="container py-32 text-center">لم يتم العثور على المحتوى. <Link to="/" className="text-primary">العودة</Link></div></SiteLayout>;

  const heroSrc = t.backdrop_url ?? t.poster_url ?? "";

  return (
    <SiteLayout>
      {/* === Hero بانورامي === */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {heroSrc ? (
          <img src={heroSrc} alt={t.title} className="absolute inset-0 w-full h-full object-cover scale-110 blur-[2px]" />
        ) : <div className="absolute inset-0 bg-gradient-to-br from-secondary via-card to-background" />}

        {/* طبقات تدرّج */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-l from-background/70 via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.18),transparent_60%)]" />

        {/* زخرفة جانبية */}
        <div className="absolute top-24 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-6 pt-28 pb-16">
          <Link to={`/${t.kind}s`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" />
            <span>العودة إلى {kindLabels[t.kind] ?? "القائمة"}</span>
          </Link>

          <div className="grid md:grid-cols-[280px_1fr] gap-10 items-start">
            {/* الملصق */}
            {t.poster_url && (
              <div className="mx-auto md:mx-0 w-56 md:w-full">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-gold opacity-40 rounded-2xl blur-lg group-hover:opacity-70 transition-opacity" />
                  <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-gold-lg border-2 border-primary/30">
                    <img src={t.poster_url} alt={t.title} className="w-full h-full object-cover" />
                    {t.badges?.[0] && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-gradient-gold text-primary-foreground shadow-gold">{t.badges[0]}</Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* التفاصيل */}
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5">
                  <Sparkles className="w-3 h-3 ml-1" />
                  {kindLabels[t.kind] ?? t.kind}
                </Badge>
                {t.track && <Badge variant="secondary" className="bg-primary/15 text-primary border-primary/30">{t.track}</Badge>}
                {t.age_rating && <Badge variant="outline">{t.age_rating}</Badge>}
                {t.badges?.slice(1).map((b) => <Badge key={b} className="bg-gradient-gold text-primary-foreground">{b}</Badge>)}
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight">
                <span className="text-gold-gradient">{t.title}</span>
              </h1>

              {t.synopsis && (
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-7 max-w-xl">
                  {t.synopsis}
                </p>
              )}

              {/* بطاقات معلومات سريعة */}
              <div className="flex flex-wrap gap-3 mb-8">
                {t.duration_minutes && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card/60 backdrop-blur border border-primary/15">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">{t.duration_minutes} دقيقة</span>
                  </div>
                )}
                {t.target_roles && t.target_roles.length > 0 && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card/60 backdrop-blur border border-primary/15">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm">{t.target_roles.map(r => roleLabels[r] ?? r).join("، ")}</span>
                  </div>
                )}
                {t.stars && t.stars.length > 0 && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card/60 backdrop-blur border border-primary/15">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="text-sm">بطولة: {t.stars.slice(0, 3).join("، ")}</span>
                  </div>
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
        </div>
      </section>

      {/* === القصة الكاملة === */}
      {t.long_description && (
        <section className="container mx-auto px-6 py-16 max-w-4xl">
          <div className="rounded-3xl bg-card/40 backdrop-blur border border-primary/15 p-8 md:p-10 shadow-card">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gold-gradient">القصة</h2>
            </div>
            <p className="text-muted-foreground leading-loose whitespace-pre-line text-base md:text-lg">
              {t.long_description}
            </p>
          </div>
        </section>
      )}

      {/* === النجوم === */}
      {t.stars && t.stars.length > 0 && (
        <section className="container mx-auto px-6 pb-16 max-w-5xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-gold-gradient">أبطال العمل</span>
          </h2>
          <div className="flex flex-wrap gap-4">
            {t.stars.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-card border-2 border-primary/30 flex items-center justify-center text-2xl font-bold text-primary shadow-gold">
                  {s.slice(0, 1)}
                </div>
                <span className="text-xs text-muted-foreground max-w-[90px] text-center leading-tight">{s}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* === أعمال مشابهة === */}
      {related.length > 0 && (
        <section className="container mx-auto px-6 pb-20">
          <h2 className="text-2xl font-bold mb-6">
            <span className="text-gold-gradient">قد يعجبك أيضاً</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {related.map((r) => (
              <Link to={`/title/${r.id}`} key={r.id} className="group">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-card border border-primary/10 group-hover:border-primary/40 transition-all shadow-card">
                  {r.poster_url ? (
                    <img src={r.poster_url} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : <div className="w-full h-full bg-gradient-to-br from-secondary to-card" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                </div>
                <h3 className="mt-2 text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">{r.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* === مودال الإعلان === */}
      {showTrailer && t.trailer_url && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur flex items-center justify-center p-4" onClick={() => setShowTrailer(false)}>
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden ring-1 ring-primary/30 shadow-gold-lg" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const url = t.trailer_url!;
              const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
              if (yt) {
                return <iframe src={`https://www.youtube.com/embed/${yt[1]}?autoplay=1`} title={t.title} className="w-full h-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />;
              }
              return <video src={url} controls autoPlay className="w-full h-full" />;
            })()}
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
