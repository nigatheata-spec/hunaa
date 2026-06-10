import { Link } from "react-router-dom";
import { HunaLogo } from "./HunaLogo";

const sections = [
  { title: "اكتشف", links: [
    { label: "أفلام", to: "/movies" },
    { label: "مسلسلات", to: "/series" },
    { label: "ريلز", to: "/reels" },
    { label: "المؤثرون الأذكياء", to: "/influencers" },
  ]},
  { title: "المنصة", links: [
    { label: "المساعد التربوي", to: "/assistant" },
    { label: "الباقات والأسعار", to: "/pricing" },
    { label: "ادعم المنصة", to: "/support" },
    { label: "لوحة التحكم", to: "/admin" },
  ]},
  { title: "الأسرة", links: [
    { label: "للأب", to: "/?role=father" },
    { label: "للأم", to: "/?role=mother" },
    { label: "للابن", to: "/?role=son" },
    { label: "للبنت", to: "/?role=daughter" },
  ]},
];

export const Footer = () => {
  return (
    <footer className="relative border-t border-primary/20 bg-gradient-to-b from-card/30 to-background mt-20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <HunaLogo />
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
              من الحضارة الإسلامية إلى الواقع لنصنع المستقبل. منصة OTT عربية مدعومة بالذكاء الاصطناعي.
            </p>
            <p className="font-serif-ar text-primary/70 text-base mt-4">« هُنا حيث ينبض القلب بالمعرفة »</p>
          </div>
          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="text-primary font-semibold mb-4 text-sm tracking-wider">{s.title}</h4>
              <ul className="space-y-2.5">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} منصة هنا. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">الخصوصية</a>
            <a href="#" className="hover:text-primary">الشروط</a>
            <a href="#" className="hover:text-primary">تواصل</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
