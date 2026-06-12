import { Link } from "react-router-dom";
import { ArabesqueDivider } from "./ArabesqueDivider";
import { Button } from "./ui/button";

const members = [
  {
    role: "أب",
    title: "للأب",
    description: "محتوى يدعم دورك القيادي في الأسرة، ونصائح تربوية من المساعد الذكي.",
    gradient: "from-amber-600/30 to-yellow-700/20",
    emoji: "👨",
    thread: "father",
  },
  {
    role: "أم",
    title: "للأم",
    description: "محتوى يثري حياتك ويدعم رسالتك التربوية، مع توصيات يومية مخصصة.",
    gradient: "from-rose-500/30 to-pink-600/20",
    emoji: "👩",
    thread: "mother",
  },
  {
    role: "ابن",
    title: "للابن",
    description: "محتوى مناسب لعمرك يصقل شخصيتك ويبني هويتك الإسلامية بأسلوب جذاب.",
    gradient: "from-cyan-500/30 to-blue-600/20",
    emoji: "👦",
    thread: "son",
  },
  {
    role: "بنت",
    title: "للبنت",
    description: "تجربة آمنة وملهمة، محتوى منتقى بعناية يناسب اهتماماتك ومرحلتك.",
    gradient: "from-violet-500/30 to-fuchsia-600/20",
    emoji: "👧",
    thread: "daughter",
  },
];

export const FamilySection = () => {
  return (
    <section className="relative py-24 bg-gradient-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            تجربة الأسرة
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-center mb-6">
          <span className="text-foreground">لكل فرد </span>
          <span className="text-gold-gradient">عالمه الخاص</span>
        </h2>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg">
          منصة هنا تتعرّف على عضو الأسرة وتُخصّص له تجربة فريدة تناسب دوره وعمره واهتماماته.
        </p>

        <ArabesqueDivider />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, idx) => (
            <Link
              key={member.role}
              to={`/assistant?thread=${member.thread}`}
              className="group relative rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/60 transition-all duration-500 animate-fade-up block"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`relative bg-gradient-to-br ${member.gradient} p-8 h-full backdrop-blur-sm`}>
                <div className="absolute inset-0 bg-card/50" />

                <div className="relative flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-background/80 border-2 border-primary/40 flex items-center justify-center mb-6 text-5xl group-hover:scale-110 group-hover:border-primary transition-all duration-500 shadow-gold">
                    {member.emoji}
                  </div>

                  <h3 className="text-2xl font-bold text-gold-gradient mb-3">
                    {member.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 min-h-[80px]">
                    {member.description}
                  </p>

                  <Button variant="outlineGold" size="sm" className="w-full pointer-events-none">
                    افتح المساعد الذكي
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
