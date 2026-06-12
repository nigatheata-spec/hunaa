import { Link, useLocation } from "react-router-dom";
import { Film, Tv, Users, Clapperboard, Sparkles } from "lucide-react";

const leftItems = [
  { label: "أفلام", to: "/movies", icon: Film },
  { label: "مسلسلات", to: "/series", icon: Tv },
];
const rightItems = [
  { label: "مؤثرون", to: "/influencers", icon: Users },
  { label: "ريلز", to: "/reels", icon: Clapperboard },
];

export const Footer = () => {
  const location = useLocation();

  const renderItem = (item: { label: string; to: string; icon: typeof Film }) => {
    const isActive = location.pathname === item.to;
    const Icon = item.icon;
    return (
      <Link
        key={item.to}
        to={item.to}
        className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-colors duration-200 w-14 ${
          isActive ? "text-[hsl(45,90%,65%)]" : "text-[hsl(43,74%,55%)] hover:text-[hsl(45,90%,65%)]"
        }`}
      >
        <Icon className="w-4 h-4" />
        <span className="text-[9px] font-medium">{item.label}</span>
      </Link>
    );
  };

  return (
    <footer className="sticky bottom-0 z-50 px-4 pb-3">
      <div className="relative mx-auto max-w-sm">
        <nav className="grid grid-cols-5 items-center rounded-2xl bg-card/80 backdrop-blur-xl border border-primary/20 shadow-card px-2 py-2">
          <div className="flex justify-center">{renderItem(leftItems[0])}</div>
          <div className="flex justify-center">{renderItem(leftItems[1])}</div>
          <div className="flex justify-center">
            <Link
              to="/assistant"
              aria-label="المساعد التربوي"
              className="flex items-center justify-center w-12 h-12 -mt-5 rounded-full bg-gradient-to-br from-primary to-[hsl(38,70%,40%)] text-primary-foreground shadow-gold-lg border-2 border-background transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <Sparkles className="w-5 h-5" />
            </Link>
          </div>
          <div className="flex justify-center">{renderItem(rightItems[0])}</div>
          <div className="flex justify-center">{renderItem(rightItems[1])}</div>
        </nav>
      </div>
    </footer>
  );
};
