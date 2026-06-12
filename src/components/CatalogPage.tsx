import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Baby, User2, UserRound, Users as UsersIcon, Film, Tv, Sparkles as SparklesIcon, Mic } from "lucide-react";

interface Title {
  id: string;
  title: string;
  synopsis: string | null;
  poster_url: string | null;
  backdrop_url: string | null;
  track: string | null;
  kind: string;
  audience?: string[] | null;
  stars?: string[] | null;
}

type Audience = "all" | "father" | "mother" | "son" | "daughter";
type Kind = "all" | "movie" | "series" | "reel" | "influencer";

const audienceChips: { id: Audience; label: string; icon: typeof Baby }[] = [
  { id: "all", label: "كل الأسرة", icon: UsersIcon },
  { id: "father", label: "الأب", icon: User2 },
  { id: "mother", label: "الأم", icon: UserRound },
  { id: "son", label: "الابن", icon: Baby },
  { id: "daughter", label: "البنت", icon: Baby },
];

const kindChips: { id: Kind; label: string; icon: typeof Film }[] = [
  { id: "all", label: "الكل", icon: SparklesIcon },
  { id: "movie", label: "أفلام", icon: Film },
  { id: "series", label: "مسلسلات", icon: Tv },
  { id: "reel", label: "ريلز", icon: SparklesIcon },
  { id: "influencer", label: "مؤثرون", icon: Mic },
];

export const CatalogPage = ({
  kind,
  title,
  subtitle,
  showKindFilter = false,
}: {
  kind: "movie" | "series" | "reel" | "influencer";
  title: string;
  subtitle: string;
  showKindFilter?: boolean;
}) => {
  const [items, setItems] = useState<Title[]>([]);
  const [loading, setLoading] = useState(true);
  const [audience, setAudience] = useState<Audience>("all");
  const [kindFilter, setKindFilter] = useState<Kind>(kind);

  useEffect(() => {
    const q = supabase.from("titles").select("*").eq("is_published", true);
    const query = showKindFilter && kindFilter !== "all" ? q.eq("kind", kindFilter) : showKindFilter ? q : q.eq("kind", kind);
    query.then(({ data }) => {
      setItems((data ?? []) as Title[]);
      setLoading(false);
    });
  }, [kind, kindFilter, showKindFilter]);

  const filtered = useMemo(() => {
    if (audience === "all") return items;
    return items.filter((t) => !t.audience || t.audience.includes(audience));
  }, [items, audience]);

  return (
    <SiteLayout>
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3"><span className="text-gold-gradient">{title}</span></h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        {/* Audience filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {audienceChips.map((c) => {
            const Icon = c.icon;
            const active = audience === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setAudience(c.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border transition-all ${
                  active
                    ? "bg-gradient-gold text-primary-foreground border-primary shadow-gold"
                    : "bg-card/60 text-foreground border-primary/20 hover:border-primary/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Kind filter */}
        {showKindFilter && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {kindChips.map((c) => {
              const Icon = c.icon;
              const active = kindFilter === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setKindFilter(c.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all ${
                    active
                      ? "bg-primary/20 text-primary border-primary/60"
                      : "bg-card/40 text-muted-foreground border-primary/10 hover:text-primary"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {c.label}
                </button>
              );
            })}
          </div>
        )}

        {loading ? (
          <div className="text-center text-muted-foreground py-20">جاري التحميل...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">لا يوجد محتوى مطابق للفلتر الحالي.</p>
            <p className="text-sm text-primary/70">جرّب تغيير الفلتر أو مسح التصفية.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filtered.map((t) => (
              <Link to={`/title/${t.id}`} key={t.id} className="group">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-card border border-primary/10 group-hover:border-primary/40 transition-all shadow-card">
                  {t.poster_url ? (
                    <img
                      src={t.poster_url}
                      alt={t.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary to-card" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-3">
                    {t.track && (
                      <Badge variant="secondary" className="bg-primary/20 text-primary text-[10px] mb-1">
                        {t.track}
                      </Badge>
                    )}
                    {t.stars && t.stars.length > 0 && (
                      <p className="text-[10px] text-muted-foreground line-clamp-1">
                        بطولة: {t.stars.slice(0, 2).join("، ")}
                      </p>
                    )}
                  </div>
                </div>
                <h3 className="mt-3 text-sm font-medium group-hover:text-primary transition-colors">
                  {t.title}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
};
