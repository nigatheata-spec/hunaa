import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Play, Sparkles, Clock, Star, Users, Calendar } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { getTrack } from "@/data/tracks";

export default function IdeaDetail() {
  const { slug, idx } = useParams<{ slug: string; idx: string }>();
  const track = slug ? getTrack(slug) : undefined;
  const i = idx ? parseInt(idx, 10) : -1;
  const idea = track && i >= 0 ? track.ideas[i] : undefined;
  if (!track || !idea) return <Navigate to="/" replace />;

  const meta = [
    { icon: Clock, label: "المدة", value: ["٤٥ دقيقة", "٣٠ دقيقة", "٦٠ دقيقة", "٢٥ دقيقة", "٤٠ دقيقة"][i] || "٤٠ دقيقة" },
    { icon: Star, label: "التقييم", value: ["٤.٨", "٤.٧", "٤.٩", "٤.٦", "٤.٨"][i] || "٤.٧" },
    { icon: Users, label: "الفئة", value: "كل الأسرة" },
    { icon: Calendar, label: "الإصدار", value: "٢٠٢٦" },
  ];

  const related = track.ideas
    .map((it, k) => ({ ...it, k }))
    .filter((it) => it.k !== i)
    .slice(0, 4);

  return (
    <SiteLayout>
      {/* Hero سينمائي */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={track.image}
            alt={idea.title}
            className="w-full h-full object-cover scale-110 blur-[2px]"
            style={{ objectPosition: `${(i * 23) % 100}% ${(i * 31) % 100}%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-50 mix-blend-overlay`} />
        </div>

        <div className="relative container mx-auto px-6 pt-12 pb-16">
          <Link
            to={`/tracks/${track.slug}`}
            className="inline-flex items-center gap-2 text-primary/90 hover:text-primary mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            رجوع إلى مسار {track.title}
          </Link>

          <div className="text-right max-w-4xl mr-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              {track.title}
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-gold-gradient">{idea.title}</span>
            </h1>
            <p className="mt-3 text-lg text-foreground/90">{idea.tagline}</p>

            <p className="mt-5 text-muted-foreground leading-relaxed">
              {track.description} يقدّم هذا العمل تجربة سينمائية مميزة ضمن مسار {track.title}،
              مصمّم بعناية ليُلامس قلب طفلك ويُغذّي عقله بقيم ومعارف يبقى أثرها معه طويلاً.
            </p>

            {/* بيانات سريعة */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {meta.map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.label} className="rounded-xl bg-card/60 backdrop-blur border border-primary/15 px-3 py-2.5 text-right">
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mb-0.5">
                      <Icon className="w-3 h-3 text-primary" />
                      {m.label}
                    </div>
                    <div className="text-sm font-bold text-foreground">{m.value}</div>
                  </div>
                );
              })}
            </div>

            {/* أزرار */}
            <div className="mt-7 flex flex-wrap gap-3 justify-start">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-gold text-primary-foreground font-bold shadow-gold-lg hover:scale-105 transition">
                <Play className="w-4 h-4" fill="currentColor" />
                شاهد الآن
              </button>
              <Link
                to={`/tracks/${track.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 transition"
              >
                المزيد من {track.title}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* نبذة موسعة */}
      <section className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold">
              <span className="text-foreground">عن </span>
              <span className="text-gold-gradient">{idea.title}</span>
            </h2>
            <p className="text-muted-foreground leading-loose">
              {idea.tagline}. حكاية مصاغة بأسلوب درامي راقٍ تأخذ المشاهد في رحلة بصرية وحسّية مدروسة،
              تجمع بين الترفيه الهادف والقيمة التربوية العميقة. يأتي هذا العمل ضمن مسار{" "}
              <span className="text-primary font-semibold">{track.title}</span> الذي
              يهدف إلى {track.description.replace(/[.،]$/, "")}.
            </p>
            <p className="text-muted-foreground leading-loose">
              يتعاون في صناعة هذا المحتوى نخبة من الكتّاب والمخرجين المتخصصين في إنتاج
              المحتوى الموجّه للأسرة المسلمة، مع مراعاة دقيقة للفئة العمرية واهتماماتها،
              وبجودة سينمائية تليق بطفلك.
            </p>
          </div>

          <aside className="rounded-2xl bg-card/60 backdrop-blur border border-primary/15 p-5 space-y-3 h-fit">
            <h3 className="font-bold text-primary">معلومات الإنتاج</h3>
            <div className="text-sm space-y-2 text-muted-foreground">
              <div className="flex justify-between"><span>المسار</span><span className="text-foreground">{track.title}</span></div>
              <div className="flex justify-between"><span>النوع</span><span className="text-foreground">{track.subtitle}</span></div>
              <div className="flex justify-between"><span>اللغة</span><span className="text-foreground">العربية</span></div>
              <div className="flex justify-between"><span>الترجمة</span><span className="text-foreground">متوفرة</span></div>
              <div className="flex justify-between"><span>الجودة</span><span className="text-foreground">4K HDR</span></div>
            </div>
          </aside>
        </div>
      </section>

      {/* أعمال ذات صلة */}
      <section className="container mx-auto px-6 pb-16">
        <h2 className="text-xl md:text-2xl font-bold mb-5">
          <span className="text-foreground">قد يعجبك أيضاً </span>
          <span className="text-gold-gradient">من نفس المسار</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map((r) => (
            <Link
              key={r.k}
              to={`/tracks/${track.slug}/idea/${r.k}`}
              className="group rounded-xl overflow-hidden ring-1 ring-primary/15 hover:ring-primary/40 hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={track.image}
                  alt={r.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]"
                  style={{ objectPosition: `${(r.k * 23) % 100}% ${(r.k * 31) % 100}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-30 mix-blend-overlay`} />
                <div className="absolute bottom-2 right-2 left-2">
                  <h3 className="text-sm font-bold text-foreground line-clamp-1">{r.title}</h3>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{r.tagline}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
