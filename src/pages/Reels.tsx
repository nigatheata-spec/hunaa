import { SiteLayout } from "@/components/SiteLayout";
import { Heart, MessageCircle, Share2, Play } from "lucide-react";
import reel1 from "@/assets/reel-1.jpg";
import reel2 from "@/assets/reel-2.jpg";
import reel3 from "@/assets/reel-3.jpg";
import reel4 from "@/assets/reel-4.jpg";
import reel5 from "@/assets/reel-5.jpg";

const REELS = [
  { id: 1, img: reel1, title: "لحظة صدق", author: "هُنا ستوديو", desc: "حكاية قصيرة عن الأمانة بين الأصدقاء", likes: "12.4K", comments: "342" },
  { id: 2, img: reel2, title: "أعجوبة الكون", author: "علمي ممتع", desc: "هل تعلم كم عدد النجوم في مجرتنا؟", likes: "8.9K", comments: "210" },
  { id: 3, img: reel3, title: "حكاية جدتي", author: "بيت العائلة", desc: "قصص الزمن الجميل بأسلوب عصري", likes: "21.1K", comments: "584" },
  { id: 4, img: reel4, title: "تجربة بسيطة", author: "مختبر الفضول", desc: "اصنع بركاناً في مطبخك بثلاث خطوات", likes: "15.7K", comments: "402" },
  { id: 5, img: reel5, title: "في ظلال آية", author: "همسات إيمانية", desc: "تأمّل سريع في معنى الشكر", likes: "30.2K", comments: "812" },
];

export default function Reels() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase">ريلز هُنا</span>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold">
            <span className="text-foreground">لحظات قصيرة </span>
            <span className="text-gold-gradient">بأثر طويل</span>
          </h1>
        </div>

        <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible snap-x snap-mandatory pb-4 -mx-4 px-4">
          {REELS.map((r, i) => (
            <article
              key={r.id}
              className="group relative shrink-0 w-[78vw] sm:w-[42vw] md:w-auto snap-center rounded-2xl overflow-hidden ring-1 ring-primary/25 shadow-card hover:shadow-gold transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[9/16]">
                <img
                  src={r.img}
                  alt={r.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />

                {/* زر تشغيل */}
                <button className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-gold-lg opacity-90 group-hover:scale-110 transition">
                  <Play className="w-6 h-6" fill="currentColor" />
                </button>

                {/* تفاعل جانبي */}
                <div className="absolute left-3 bottom-24 flex flex-col items-center gap-4 text-foreground">
                  <button className="flex flex-col items-center gap-1">
                    <span className="w-9 h-9 rounded-full bg-background/60 backdrop-blur flex items-center justify-center">
                      <Heart className="w-4 h-4 text-primary" />
                    </span>
                    <span className="text-[10px] font-semibold">{r.likes}</span>
                  </button>
                  <button className="flex flex-col items-center gap-1">
                    <span className="w-9 h-9 rounded-full bg-background/60 backdrop-blur flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-primary" />
                    </span>
                    <span className="text-[10px] font-semibold">{r.comments}</span>
                  </button>
                  <button className="flex flex-col items-center gap-1">
                    <span className="w-9 h-9 rounded-full bg-background/60 backdrop-blur flex items-center justify-center">
                      <Share2 className="w-4 h-4 text-primary" />
                    </span>
                  </button>
                </div>

                {/* محتوى أسفل */}
                <div className="absolute inset-x-0 bottom-0 p-3 pr-4">
                  <div className="text-[11px] text-primary font-semibold mb-1">@{r.author}</div>
                  <h3 className="text-base font-bold leading-tight">{r.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
