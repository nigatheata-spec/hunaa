import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

import movie1 from "@/assets/movie-1.jpg";
import movie2 from "@/assets/movie-2.jpg";
import series1 from "@/assets/series-1.jpg";
import series2 from "@/assets/series-2.jpg";
import influencer1 from "@/assets/influencer-1.jpg";
import influencer2 from "@/assets/influencer-2.jpg";
import reel1 from "@/assets/reel-1.jpg";
import reel2 from "@/assets/reel-2.jpg";

type Slide = {
  key: string;
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
  route: string;
  images: [string, string];
};

const SLIDES: Slide[] = [
  {
    key: "movies",
    badge: "أفلام مختارة",
    title: "أفلام تُلهم الأسرة",
    subtitle: "أعمال سينمائية منتقاة بعناية لتُربّي الذوق وتفتح آفاق الخيال.",
    cta: "استكشف الأفلام",
    route: "/movies",
    images: [movie1, movie2],
  },
  {
    key: "series",
    badge: "مسلسلات هادفة",
    title: "حكايات تنسج القيم",
    subtitle: "مسلسلات ممتدة تبني وجدان الصغار والكبار في كل حلقة.",
    cta: "استكشف المسلسلات",
    route: "/series",
    images: [series1, series2],
  },
  {
    key: "influencers",
    badge: "مؤثرون مُلهمون",
    title: "وجوه تصنع فرقاً",
    subtitle: "نخبة من المؤثرين يقدّمون محتوى نافعاً يستحق المتابعة.",
    cta: "تعرّف على المؤثرين",
    route: "/influencers",
    images: [influencer1, influencer2],
  },
  {
    key: "reels",
    badge: "ريلز قصيرة",
    title: "ومضات تُحفّز التفكير",
    subtitle: "محتوى قصير وهادف يُغذّي الروح في دقائق معدودة.",
    cta: "شاهد الريلز",
    route: "/reels",
    images: [reel1, reel2],
  },
];

const INTERVAL = 2000;

export const ReelsHero = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[active];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* خلفية الصورة الكبيرة */}
      {SLIDES.map((s, i) => (
        <div
          key={s.key}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={s.images[0]} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-l from-background/90 via-background/30 to-transparent" />
        </div>
      ))}

      {/* المحتوى */}
      <div className="relative z-20 container mx-auto px-6 pt-28 pb-16 grid md:grid-cols-2 gap-10 items-center min-h-screen">
        {/* نص */}
        <div key={slide.key} className="animate-fade-up order-2 md:order-1">
          <span className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-sm font-medium backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            {slide.badge}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight">
            <span className="text-gold-gradient">{slide.title}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
            {slide.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" onClick={() => navigate(slide.route)}>
              {slide.cta}
            </Button>
            <Button variant="outlineGold" size="xl" onClick={() => navigate("/assistant")}>
              المساعد التربوي
            </Button>
          </div>

          {/* المؤشرات */}
          <div className="flex items-center gap-3 mt-10">
            {SLIDES.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setActive(i)}
                aria-label={s.title}
                className="group relative h-1.5 overflow-hidden rounded-full bg-primary/20"
                style={{ width: i === active ? 56 : 24 }}
              >
                <span
                  key={`${i}-${active}`}
                  className={`absolute inset-y-0 right-0 bg-primary ${
                    i === active ? "animate-[reelProgress_2s_linear_forwards]" : "w-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* صورتان جانبيتان */}
        <div key={`${slide.key}-imgs`} className="order-1 md:order-2 grid grid-cols-2 gap-4 animate-fade-in">
          {slide.images.map((src, i) => (
            <div
              key={i}
              className={`relative aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-primary/30 shadow-2xl ${
                i === 1 ? "translate-y-8" : ""
              }`}
            >
              <img
                src={src}
                alt={`${slide.title} ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 right-3 left-3">
                <span className="inline-block px-2.5 py-1 rounded-full bg-background/70 backdrop-blur text-[10px] text-primary border border-primary/30">
                  {slide.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
