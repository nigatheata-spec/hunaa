import { ArabesqueDivider } from "./ArabesqueDivider";
import {
  BookOpen,
  Heart,
  FlaskConical,
  Compass,
  GraduationCap,
  MessageCircle,
  Sparkles,
  Landmark,
  Users,
  Drama,
  Mountain,
  ScrollText,
} from "lucide-react";

const tracks = [
  { id: 1, title: "أخلاق وسلوك", subtitle: "قالب درامي مجتمعي", icon: Heart, color: "from-rose-500/20 to-amber-500/20" },
  { id: 2, title: "سيرة وقصص", subtitle: "بقالب درامي مشوّق", icon: BookOpen, color: "from-amber-500/20 to-yellow-500/20" },
  { id: 3, title: "علمي تجريبي", subtitle: "تجارب ومعارف", icon: FlaskConical, color: "from-cyan-500/20 to-blue-500/20" },
  { id: 4, title: "رحلات وجغرافيا", subtitle: "اكتشاف العالم", icon: Compass, color: "from-orange-500/20 to-red-500/20" },
  { id: 5, title: "تعليمي منهجي", subtitle: "أكاديمي مدرسي", icon: GraduationCap, color: "from-emerald-500/20 to-teal-500/20" },
  { id: 6, title: "حواري", subtitle: "نقاشات وحوارات هادفة", icon: MessageCircle, color: "from-violet-500/20 to-purple-500/20" },
  { id: 7, title: "وعظي تزكوي", subtitle: "تربية الروح والقلب", icon: Sparkles, color: "from-amber-500/20 to-orange-500/20" },
  { id: 8, title: "تاريخ إسلامي", subtitle: "حضارتنا وأمجادنا", icon: Landmark, color: "from-yellow-500/20 to-amber-500/20" },
  { id: 9, title: "أسري درامي", subtitle: "قيم العائلة المسلمة", icon: Users, color: "from-pink-500/20 to-rose-500/20" },
  { id: 10, title: "وثائقي", subtitle: "حقائق مصورة", icon: ScrollText, color: "from-slate-500/20 to-zinc-500/20" },
  { id: 11, title: "مغامرات الطبيعة", subtitle: "رحلات استكشافية", icon: Mountain, color: "from-green-500/20 to-emerald-500/20" },
  { id: 12, title: "درامي هادف", subtitle: "روايات بصرية راقية", icon: Drama, color: "from-indigo-500/20 to-blue-500/20" },
];

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-12">
          {tracks.map((track, idx) => {
            const Icon = track.icon;
            return (
              <div
                key={track.id}
                className="group relative glass-card rounded-xl p-6 hover:-translate-y-1 hover:shadow-gold cursor-pointer transition-all duration-500 animate-fade-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {/* رقم المسار */}
                <div className="absolute top-4 left-4 font-serif-ar text-5xl text-primary/10 font-bold leading-none group-hover:text-primary/20 transition-colors">
                  {track.id.toString().padStart(2, "0")}
                </div>

                {/* تأثير التدرج */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{track.subtitle}</p>

                  <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                    <span>استكشف</span>
                    <span>←</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
