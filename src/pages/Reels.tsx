import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Heart, MessageCircle, Share2, Play, Film } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import reel1 from "@/assets/reel-1.jpg";
import reel2 from "@/assets/reel-2.jpg";
import reel3 from "@/assets/reel-3.jpg";
import reel4 from "@/assets/reel-4.jpg";
import reel5 from "@/assets/reel-5.jpg";

interface ReelItem {
  id: string;
  img: string;
  video?: string | null;
  title: string;
  author: string;
  desc: string;
  likes: string;
  comments: string;
  titleSlug: string;
  ctaLabel: string;
}

const FALLBACK: ReelItem[] = [
  { id: "1", img: reel1, title: "لحظة صدق", author: "هُنا ستوديو", desc: "حكاية قصيرة عن الأمانة بين الأصدقاء", likes: "12.4K", comments: "342", titleSlug: "1", ctaLabel: "مشاهدة الفيلم" },
  { id: "2", img: reel2, title: "أعجوبة الكون", author: "علمي ممتع", desc: "هل تعلم كم عدد النجوم في مجرتنا؟", likes: "8.9K", comments: "210", titleSlug: "2", ctaLabel: "مشاهدة المسلسل" },
  { id: "3", img: reel3, title: "حكاية جدتي", author: "بيت العائلة", desc: "قصص الزمن الجميل بأسلوب عصري", likes: "21.1K", comments: "584", titleSlug: "3", ctaLabel: "مشاهدة المسلسل" },
  { id: "4", img: reel4, title: "تجربة بسيطة", author: "مختبر الفضول", desc: "اصنع بركاناً في مطبخك بثلاث خطوات", likes: "15.7K", comments: "402", titleSlug: "4", ctaLabel: "مشاهدة الفيلم" },
  { id: "5", img: reel5, title: "في ظلال آية", author: "همسات إيمانية", desc: "تأمّل سريع في معنى الشكر", likes: "30.2K", comments: "812", titleSlug: "5", ctaLabel: "مشاهدة الفيلم" },
];

const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n));

const youtubeId = (url: string) => {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m?.[1] ?? null;
};

export default function Reels() {
  const [reels, setReels] = useState<ReelItem[]>(FALLBACK);

  useEffect(() => {
    (supabase as unknown as { from: (t: string) => any })
      .from("reels")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .then(({ data }: { data: any[] | null }) => {
        if (!data || data.length === 0) return;
        setReels(
          data.map((r, i) => ({
            id: r.id,
            img: r.thumbnail_url || FALLBACK[i % FALLBACK.length].img,
            video: r.video_url,
            title: r.title,
            author: r.author || "هُنا ستوديو",
            desc: r.description || "",
            likes: fmt(r.likes_count ?? 0),
            comments: fmt(r.comments_count ?? 0),
            titleSlug: r.linked_title_id || "",
            ctaLabel: r.cta_label || "مشاهدة العمل",
          }))
        );
      });
  }, []);

  return (
    <SiteLayout noTopPadding>
      <div
        className="relative w-full h-[calc(100svh-5.5rem)] overflow-y-auto snap-y snap-mandatory bg-background"
        style={{ scrollbarWidth: "none" }}
      >
        {reels.map((r) => {
          const yt = r.video ? youtubeId(r.video) : null;
          const isFile = !!r.video && !yt;
          return (
            <section
              key={r.id}
              className="relative w-full h-[calc(100svh-5.5rem)] snap-start snap-always flex items-center justify-center"
            >
              {/* Media */}
              {isFile ? (
                <video
                  src={r.video!}
                  className="absolute inset-0 w-full h-full object-cover"
                  poster={r.img}
                  playsInline
                  muted
                  loop
                  controls
                />
              ) : yt ? (
                <iframe
                  src={`https://www.youtube.com/embed/${yt}`}
                  title={r.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <img src={r.img} alt={r.title} className="absolute inset-0 w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20 pointer-events-none" />

              {/* Play button center */}
              {!r.video && (
                <button className="relative z-10 w-16 h-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-gold-lg hover:scale-110 transition">
                  <Play className="w-7 h-7" fill="currentColor" />
                </button>
              )}

              {/* Side actions */}
              <div className="absolute left-3 bottom-32 z-10 flex flex-col items-center gap-5 text-foreground">
                <button className="flex flex-col items-center gap-1">
                  <span className="w-11 h-11 rounded-full bg-background/60 backdrop-blur flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </span>
                  <span className="text-[11px] font-semibold">{r.likes}</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <span className="w-11 h-11 rounded-full bg-background/60 backdrop-blur flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </span>
                  <span className="text-[11px] font-semibold">{r.comments}</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <span className="w-11 h-11 rounded-full bg-background/60 backdrop-blur flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-primary" />
                  </span>
                </button>
              </div>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-5 pb-6">
                <div className="text-xs text-primary font-semibold mb-1">@{r.author}</div>
                <h3 className="text-xl font-bold leading-tight">{r.title}</h3>
                {r.desc && <p className="mt-1 text-sm text-muted-foreground line-clamp-2 mb-3">{r.desc}</p>}
                {r.titleSlug && (
                  <Button
                    asChild
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 shadow-gold"
                  >
                    <Link to={`/title/${r.titleSlug}`}>
                      <Film className="w-4 h-4 ml-2" />
                      {r.ctaLabel}
                    </Link>
                  </Button>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </SiteLayout>
  );
}
