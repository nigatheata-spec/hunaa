import { Link, useLocation } from "react-router-dom";
import { Film, Tv, Users, Sparkles } from "lucide-react";

const navItems = [
  { label: "أفلام", to: "/movies", icon: Film },
  { label: "مسلسلات", to: "/series", icon: Tv },
  { label: "مؤثرون", to: "/influencers", icon: Users },
];

export const Footer = () => {
  const location = useLocation();

  return (
    <footer className="sticky bottom-0 z-50 px-4 pb-3">
      <div className="relative mx-auto max-w-sm">
        {/* Center AI circle — elevated above the bar */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10">
          <Link
            to="/assistant"
            aria-label="المساعد التربوي"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-primary to-[hsl(38,70%,40%)] text-primary-foreground shadow-gold-lg border-2 border-background transition-transform duration-300 hover:scale-110 active:scale-95"
          >
            <Sparkles className="w-5 h-5" />
          </Link>
        </div>

        {/* Rounded rectangle dock */}
        <nav className="flex items-center justify-around rounded-2xl bg-card/80 backdrop-blur-xl border border-primary/20 shadow-card px-2 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-0.5 px-3 py-0.5 rounded-xl transition-colors duration-200 ${
                  isActive ? "text-primary" : "text-[hsl(43,74%,55%)] hover:text-[hsl(45,90%,65%)]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
};
