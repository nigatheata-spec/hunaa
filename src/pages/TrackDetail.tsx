import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Play, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { getTrack } from "@/data/tracks";

export default function TrackDetail() {
  const { slug } = useParams<{ slug: string }>();
  const track = slug ? getTrack(slug) : undefined;
  if (!track) return <Navigate to="/" replace />;

  return (
    <SiteLayout>
      {/* Hero سينمائي */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src={track.image}
            alt={track.title}
            className="w-full h-full object-cover scale-110 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-50 mix-blend-overlay`} />
        </div>

        <div className="relative container mx-auto px-6 pt-16 pb-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary/90 hover:text-primary mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            رجوع
          </Link>

          <div className="grid md:grid-cols-[280px_1fr] gap-8 items-center">
            <div className="relative mx-auto md:mx-0 w-48 md:w-full">
              <div className="absolute -inset-3 bg-gradient-gold rounded-2xl blur-2xl opacity-40" />
              <img
                src={track.image}
                alt={track.title}
                className="relative aspect-[3/4] w-full object-cover rounded-2xl shadow-gold-lg ring-1 ring-primary/30"
              />
            </div>
            <div className="text-center md:text-right">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                مسار رقم {track.id.toString().padStart(2, "0")}
              </span>
              <h1 className="mt-4 text-4xl md:text-6xl font-bold">
                <span className="text-gold-gradient">{track.title}</span>
              </h1>
              <p className="mt-3 text-lg text-foreground/90">{track.subtitle}</p>
              <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                {track.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* الأفكار الخمس */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          <span className="text-foreground">أفكار مقترحة </span>
          <span className="text-gold-gradient">من هذا المسار</span>
        </h2>
        <p className="text-muted-foreground mb-8">خمس قصص قادمة بانتظارك في هذا المسار</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {track.ideas.map((idea, i) => (
            <article
              key={i}
              className="group relative rounded-2xl overflow-hidden ring-1 ring-primary/15 bg-card/60 backdrop-blur hover:ring-primary/40 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={track.image}
                  alt={idea.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]"
                  style={{ objectPosition: `${(i * 23) % 100}% ${(i * 31) % 100}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-30 mix-blend-overlay`} />
                <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-background/70 backdrop-blur text-primary text-[10px] font-bold">
                  فكرة {String(i + 1).padStart(2, "0")}
                </div>
                <button className="absolute bottom-3 left-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-gold-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                  <Play className="w-4 h-4" fill="currentColor" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {idea.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{idea.tagline}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
