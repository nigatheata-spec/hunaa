import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { HunaLogo } from "./HunaLogo";
import heroImg from "@/assets/hero-huna.jpg";
import familyImg from "@/assets/track-family.jpg";
import historyImg from "@/assets/track-history.jpg";
import scienceImg from "@/assets/track-science.jpg";
import travelImg from "@/assets/track-travel.jpg";

type Reel = {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
};

const reels: Reel[] = [
  {
    image: heroImg,
    badge: "منصة هنا",
    title: "هنا تبدأ حضارتك",
    subtitle: "من الحضارة الإسلامية إلى الواقع لنصنع المستقبل.",
    cta: "ابدأ تجربتك",
  },
  {
    image: historyImg,
    badge: "تاريخ إسلامي",
    title: "قصص صنعت الأمم",
    subtitle: "سير وتاريخ بقالب درامي مدعوم بالذكاء الاصطناعي.",
    cta: "اكتشف المسار",
  },
  {
    image: familyImg,
    badge: "أسري درامي",
    title: "تجربة لكل فرد من الأسرة",
    subtitle: "محتوى مُخصّص للأب والأم والابن والبنت.",
    cta: "خصّص أسرتك",
  },
  {
    image: scienceImg,
    badge: "علمي تجريبي",
    title: "العلم بعين عربية",
    subtitle: "تجارب ومعارف تُلهم العقل وتُغذّي الفضول.",
    cta: "شاهد التجارب",
  },
  {
    image: travelImg,
    badge: "رحلات وجغرافيا",
    title: "رحلات تُعيد اكتشاف العالم",
    subtitle: "جغرافيا ومعارف بإنتاج سينمائي مذهل.",
    cta: "انطلق الآن",
  },
];

const INTERVAL = 3000;

export const ReelsHero = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((p) => (p + 1) % reels.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* الشرائح */}
      {reels.map((reel, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={reel.image}
            alt={reel.title}
            className={`w-full h-full object-cover ${
              i === active ? "animate-[kenburns_8s_ease-out_forwards]" : ""
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-l from-background/80 via-transparent to-transparent" />
        </div>
      ))}

      {/* المحتوى */}
      <div className="relative z-20 h-full container mx-auto px-6 flex flex-col justify-end pb-24 md:pb-32">
        <div className="mb-8">
          <HunaLogo />
        </div>

        {reels.map((reel, i) => (
          <div
            key={i}
            className={`max-w-2xl transition-all duration-700 ${
              i === active
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6 absolute pointer-events-none"
            }`}
          >
            {i === active && (
              <>
                <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-sm font-medium backdrop-blur-sm">
                  {reel.badge}
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                  <span className="text-gold-gradient">{reel.title}</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                  {reel.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="xl">{reel.cta}</Button>
                  <Button variant="outlineGold" size="xl">تعرّف على المسارات</Button>
                </div>
              </>
            )}
          </div>
        ))}

        {/* المؤشرات */}
        <div className="flex items-center gap-3 mt-10">
          {reels.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`الانتقال إلى الشريحة ${i + 1}`}
              className="group relative h-1.5 overflow-hidden rounded-full bg-primary/20"
              style={{ width: i === active ? 56 : 24 }}
            >
              <span
                key={`${i}-${active}`}
                className={`absolute inset-y-0 right-0 bg-primary ${
                  i === active ? "animate-[reelProgress_3s_linear_forwards]" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* تأثير الإضاءة السفلية */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
