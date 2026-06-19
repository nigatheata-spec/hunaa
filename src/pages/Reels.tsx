import { SiteLayout } from "@/components/SiteLayout";
import { Heart, MessageCircle, Share2, Play, Film } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import reel1 from "@/assets/reel-1.jpg";
import reel2 from "@/assets/reel-2.jpg";
import reel3 from "@/assets/reel-3.jpg";
import reel4 from "@/assets/reel-4.jpg";
import reel5 from "@/assets/reel-5.jpg";

const REELS = [
  { id: 1, img: reel1, title: "لحظة صدق", author: "هُنا ستوديو", desc: "حكاية قصيرة عن الأمانة بين الأصدقاء", likes: "12.4K", comments: "342", titleSlug: "1", ctaLabel: "مشاهدة الفيلم" },
  { id: 2, img: reel2, title: "أعجوبة الكون", author: "علمي ممتع", desc: "هل تعلم كم عدد النجوم في مجرتنا؟", likes: "8.9K", comments: "210", titleSlug: "2", ctaLabel: "مشاهدة المسلسل" },
  { id: 3, img: reel3, title: "حكاية جدتي", author: "بيت العائلة", desc: "قصص الزمن الجميل بأسلوب عصري", likes: "21.1K", comments: "584", titleSlug: "3", ctaLabel: "مشاهدة المسلسل" },
  { id: 4, img: reel4, title: "تجربة بسيطة", author: "مختبر الفضول", desc: "اصنع بركاناً في مطبخك بثلاث خطوات", likes: "15.7K", comments: "402", titleSlug: "4", ctaLabel: "مشاهدة الفيلم" },
  { id: 5, img: reel5, title: "في ظلال آية", author: "همسات إيمانية", desc: "تأمّل سريع في معنى الشكر", likes: "30.2K", comments: "812", titleSlug: "5", ctaLabel: "مشاهدة الفيلم" },
];

export default function Reels() {
  return (
    <SiteLayout>
      <div
        className="relative w-full h-[calc(100svh-5.5rem)] overflow-y-auto snap-y snap-mandatory bg-background"
        style={{ scrollbarWidth: "none" }}
      >
        {REELS.map((r) => (
          <section
            key={r.id}
            className="relative w-full h-[calc(100svh-5.5rem)] snap-start snap-always flex items-center justify-center"
          >
            {/* Background image */}
            <img
              src={r.img}
              alt={r.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />

            {/* Play button center */}
            <button className="relative z-10 w-16 h-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-gold-lg hover:scale-110 transition">
              <Play className="w-7 h-7" fill="currentColor" />
            </button>

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
            <div className="absolute inset-x-0 bottom-0 z-10 p-5 pb-24">
              <div className="text-xs text-primary font-semibold mb-1">@{r.author}</div>
              <h3 className="text-xl font-bold leading-tight">{r.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2 mb-3">{r.desc}</p>
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
            </div>
          </section>
        ))}
      </div>
    </SiteLayout>
  );
}
