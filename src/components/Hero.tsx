import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HunaLogo } from "./HunaLogo";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-huna.jpg";

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
  title: string;
  description: string;
  cta: string;
  route: string;
  images: [string, string];
};

const SLIDES: Slide[] = [
  {
    key: "movies",
    title: "أفلام تُلهم",
    description: "أفلام مختارة بعناية تُربّي الذوق وتفتح آفاق الخيال للأسرة بكاملها.",
    cta: "استكشف الأفلام",
    route: "/movies",
    images: [movie1, movie2],
  },
  {
    key: "series",
    title: "مسلسلات تُحاكي القيم",
    description: "حكايات ممتدة تنسج القيم في وجدان الصغار والكبار.",
    cta: "استكشف المسلسلات",
    route: "/series",
    images: [series1, series2],
  },
  {
    key: "influencers",
    title: "مؤثرون يصنعون فرقاً",
    description: "وجوه ملهمة تُقدّم محتوى نافعاً يستحق المتابعة.",
    cta: "تعرّف على المؤثرين",
    route: "/influencers",
    images: [influencer1, influencer2],
  },
  {
    key: "reels",
    title: "ريلز قصيرة هادفة",
    description: "ومضات سريعة تُحفّز التفكير وتُغذّي الروح في دقائق.",
    cta: "شاهد الريلز",
    route: "/reels",
    images: [reel1, reel2],
  },
];

export const Hero = () => {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 2000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[idx];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* خلفية الصورة */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="منصة هنا - زخارف إسلامية ذهبية"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-hero-overlay" />
        <div className="absolute inset-0 bg-gradient-radial-gold" />
      </div>

      {/* المحتوى */}
      <div className="relative z-10 container mx-auto px-6 py-24 text-center">
        <div className="animate-fade-up flex justify-center mb-6" style={{ animationDelay: "0.1s" }}>
          <HunaLogo className="scale-150" />
        </div>

        <h1
          className="animate-fade-up text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="block text-foreground">هنا تبدأ</span>
          <span className="block text-gold-gradient mt-2">حضارتك</span>
        </h1>

        {/* بطاقة العرض الدوّار */}
        <div
          key={slide.key}
          className="animate-fade-in mx-auto max-w-3xl mb-8 rounded-3xl border border-primary/20 bg-card/40 backdrop-blur-md p-5 md:p-6 shadow-2xl"
        >
          <div className="grid grid-cols-2 gap-3 mb-4">
            {slide.images.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-primary/30"
              >
                <img
                  src={src}
                  alt={`${slide.title} ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gold-gradient mb-2">
            {slide.title}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
            {slide.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="lg" onClick={() => navigate(slide.route)}>
              {slide.cta}
            </Button>
            <Button variant="outlineGold" size="lg" onClick={() => navigate("/assistant")}>
              المساعد التربوي
            </Button>
          </div>

          {/* مؤشرات */}
          <div className="flex justify-center gap-2 mt-5">
            {SLIDES.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setIdx(i)}
                aria-label={s.title}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-8 bg-primary" : "w-3 bg-primary/30 hover:bg-primary/60"
                }`}
              />
            ))}
          </div>
        </div>

        <p
          className="animate-fade-up font-serif-ar text-primary/70 text-base md:text-lg"
          style={{ animationDelay: "0.9s" }}
        >
          ﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾
        </p>
      </div>

      {/* تأثير الإضاءة السفلية */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
