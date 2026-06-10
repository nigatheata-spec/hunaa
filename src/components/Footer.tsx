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
    <footer className="sticky bottom-0 z-50 px-4 pb-4">
      <div className="relative mx-auto max-w-md">
        {/* Center AI circle — elevated above the bar */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10">
          <Link
            to="/assistant"
            aria-label="المساعد التربوي"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-deep text-primary-foreground shadow-gold-lg border-2 border-background transition-transform duration-300 hover:scale-110 active:scale-95"
          >
            <Sparkles className="w-6 h-6" />
          </Link>
        </div>

        {/* Rounded rectangle dock */}
        <nav className="flex items-center justify-around rounded-3xl bg-card/80 backdrop-blur-xl border border-primary/20 shadow-card px-2 py-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-colors duration-200 ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
};
