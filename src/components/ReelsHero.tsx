import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

import movie1 from "@/assets/movie-1.jpg";
import series1 from "@/assets/series-1.jpg";
import influencer1 from "@/assets/influencer-1.jpg";
import reel1 from "@/assets/reel-1.jpg";
import familyImg from "@/assets/track-family.jpg";
import scienceImg from "@/assets/track-science.jpg";
import historyImg from "@/assets/track-history.jpg";
import travelImg from "@/assets/track-travel.jpg";

type Slide = {
  key: string;
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
  route: string;
  image: string;
};

const SLIDES: Slide[] = [
  {
    key: "movies",
    badge: "أفلام مختارة",
    title: "أفلام تُلهم الأسرة",
    subtitle: "أعمال سينمائية منتقاة بعناية لتُربّي الذوق وتفتح آفاق الخيال.",
    cta: "استكشف الأفلام",
    route: "/movies",
    image: movie1,
  },
  {
    key: "series",
    badge: "مسلسلات هادفة",
    title: "حكايات تنسج القيم",
    subtitle: "مسلسلات ممتدة تبني وجدان الصغار والكبار في كل حلقة.",
    cta: "استكشف المسلسلات",
    route: "/series",
    image: series1,
  },
  {
    key: "influencers",
    badge: "مؤثرون مُلهمون",
    title: "وجوه تصنع فرقاً",
    subtitle: "نخبة من المؤثرين يقدّمون محتوى نافعاً يستحق المتابعة.",
    cta: "تعرّف على المؤثرين",
    route: "/influencers",
    image: influencer1,
  },
  {
    key: "reels",
    badge: "ريلز قصيرة",
    title: "ومضات تُحفّز التفكير",
    subtitle: "محتوى قصير وهادف يُغذّي الروح في دقائق معدودة.",
    cta: "شاهد الريلز",
    route: "/reels",
    image: reel1,
  },
  {
    key: "family",
    badge: "عالم الأسرة",
    title: "روابط تُغذّي القلب",
    subtitle: "محتوى يربّي على التواصل العائلي ويُرسّخ القيم بين الأجيال.",
    cta: "اكتشف المسارات",
    route: "/tracks",
    image: familyImg,
  },
  {
    key: "science",
    badge: "عالم العلوم",
    title: "فضول يبني مستقبلاً",
    subtitle: "اكتشافات ومعارف تُشعل شغف التعلم لدى الصغار والكبار.",
    cta: "اكتشف المسارات",
    route: "/tracks",
    image: scienceImg,
  },
  {
    key: "history",
    badge: "رحلة التاريخ",
    title: "أمجاد ترويها الحضارات",
    subtitle: "سرد تاريخي مُحكم يعيد إحياء ذاكرة الأمة بأسلوب شيّق.",
    cta: "اكتشف المسارات",
    route: "/tracks",
    image: historyImg,
  },
  {
    key: "travel",
    badge: "مغامرات السفر",
    title: "عوالم تنتظر الاستكشاف",
    subtitle: "رحلات بصرية وهادفة تعرّف الأسرة بثقافات العالم المتنوعة.",
    cta: "اكتشف المسارات",
    route: "/tracks",
    image: travelImg,
  },
];

const INTERVAL = 4000;

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
          <img src={s.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-l from-background/40 via-background/15 to-transparent" />
        </div>
      ))}

      {/* المحتوى - مُركز بدون صورتين جانبيتان - مُصغّر لإعطاء مساحة أكبر للصورة */}
      <div className="relative z-20 container mx-auto px-6 pt-40 pb-8 flex items-end justify-center min-h-screen">
        <div key={slide.key} className="animate-fade-up text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-medium backdrop-blur-sm">
            <Sparkles className="w-3 h-3" />
            {slide.badge}
          </span>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight">
            <span className="text-gold-gradient">{slide.title}</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed max-w-xl mx-auto line-clamp-2">
            {slide.subtitle}
          </p>
          <div className="flex flex-row gap-2 justify-center">
            <Button variant="hero" size="sm" className="text-xs px-3 py-1 h-7" onClick={() => navigate(slide.route)}>
              {slide.cta}
            </Button>
            <Button variant="outlineGold" size="sm" className="text-xs px-3 py-1 h-7" onClick={() => navigate("/assistant")}>
              المساعد
            </Button>
          </div>

          {/* المؤشرات */}
          <div className="flex items-center justify-center gap-3 mt-10">
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
                    i === active ? "animate-[reelProgress_4s_linear_forwards]" : "w-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
