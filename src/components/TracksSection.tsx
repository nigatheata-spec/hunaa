import { Link } from "react-router-dom";
import { ArabesqueDivider } from "./ArabesqueDivider";
import { TRACKS } from "@/data/tracks";

export const TracksSection = () => {
  return (
    <section className="relative py-24 bg-pattern-arabesque">
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            مسارات المحتوى
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-center mb-6">
          <span className="text-foreground">اثنا عشر مساراً </span>
          <span className="text-gold-gradient">يصنعون رحلتك</span>
        </h2>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg mb-4">
          كل مسار مصمّم بعناية ومدعوم بالذكاء الاصطناعي لتقديم محتوى يناسب اهتماماتك واحتياجاتك.
        </p>

        <ArabesqueDivider />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mt-12">
          {TRACKS.map((track, idx) => (
            <Link
              key={track.id}
              to={`/tracks/${track.slug}`}
              className="group relative block rounded-2xl overflow-hidden ring-1 ring-primary/20 shadow-card hover:shadow-gold hover:-translate-y-1 transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="aspect-[3/4] relative">
                <img
                  src={track.image}
                  alt={track.title}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]"
                />
                {/* تدرّج علوي للقراءة */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                {/* تدرّج ملوّن خاص بالمسار */}
                <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-40 mix-blend-overlay group-hover:opacity-70 transition-opacity duration-500`} />

                {/* رقم المسار */}
                <div className="absolute top-3 right-3 font-serif-ar text-3xl text-primary/80 font-bold leading-none drop-shadow-lg">
                  {track.id.toString().padStart(2, "0")}
                </div>

                {/* محتوى */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors drop-shadow">
                    {track.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                    {track.subtitle}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-primary text-xs font-medium opacity-80 group-hover:opacity-100">
                    <span>استكشف ٥ أفكار</span>
                    <span>←</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
