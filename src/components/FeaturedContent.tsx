import { ArabesqueDivider } from "./ArabesqueDivider";
import history from "@/assets/track-history.jpg";
import family from "@/assets/track-family.jpg";
import travel from "@/assets/track-travel.jpg";
import science from "@/assets/track-science.jpg";

const featured = [
  { img: history, title: "أبواب الأندلس", category: "تاريخ إسلامي", duration: "8 حلقات" },
  { img: family, title: "حكاية بيت", category: "أسري درامي", duration: "12 حلقة" },
  { img: travel, title: "على درب الرحالة", category: "رحلات وجغرافيا", duration: "موسم 2" },
  { img: science, title: "أسرار الكون", category: "علمي تجريبي", duration: "10 حلقات" },
];

export const FeaturedContent = () => {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            محتوى مختار
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-center mb-6">
          <span className="text-foreground">أحدث الإنتاجات </span>
          <span className="text-gold-gradient">على هنا</span>
        </h2>

        <ArabesqueDivider />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item, idx) => (
            <div
              key={item.title}
              className="group relative rounded-xl overflow-hidden cursor-pointer animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-card">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block text-xs font-semibold text-primary mb-2 px-2 py-1 rounded bg-primary/10 border border-primary/30">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.duration}</p>
              </div>

              {/* إطار ذهبي عند hover */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/60 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
