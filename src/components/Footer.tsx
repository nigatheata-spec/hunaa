import { Link, useLocation } from "react-router-dom";
import { Film, Users, Clapperboard, Sparkles, Home } from "lucide-react";

const centerItems = [
  { label: "أعمال", to: "/movies", icon: Film },
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

  const isHomeActive = location.pathname === "/";
  const isAssistantActive = location.pathname === "/assistant";

  return (
    <footer className="sticky bottom-0 z-50 px-4 pb-3">
      <div className="relative mx-auto max-w-sm">
        <nav className="grid grid-cols-5 items-center rounded-2xl bg-card/80 backdrop-blur-xl border border-primary/20 shadow-card px-2 py-2">
          <div className="flex justify-center">
            <Link
              to="/assistant"
              aria-label="المساعد التربوي"
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-colors duration-200 w-14 ${
                isAssistantActive ? "text-[hsl(45,90%,65%)]" : "text-[hsl(43,74%,55%)] hover:text-[hsl(45,90%,65%)]"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-[9px] font-bold">المساعد</span>
            </Link>
          </div>
          <div className="flex justify-center">{renderItem(centerItems[0])}</div>
          <div className="flex justify-center">{renderItem(centerItems[1])}</div>
          <div className="flex justify-center">{renderItem(centerItems[2])}</div>
          <div className="flex justify-center">
            <Link
              to="/"
              aria-label="الرئيسية"
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-colors duration-200 w-14 ${
                isHomeActive ? "text-[hsl(45,90%,65%)]" : "text-[hsl(43,74%,55%)] hover:text-[hsl(45,90%,65%)]"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[9px] font-bold">هوم</span>
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
};
