import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Film, Inbox, CreditCard, CreditCardIcon, Users, Heart, Bot, LogOut, MessageSquareHeart, Clapperboard } from "lucide-react";
import { HunaLogo } from "./HunaLogo";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";

const links = [
  { to: "/admin", label: "نظرة عامة", icon: LayoutDashboard, end: true },
  { to: "/admin/content", label: "المحتوى", icon: Film },
  { to: "/admin/reels", label: "الريلز", icon: Clapperboard },
  { to: "/admin/requests", label: "طلبات الجمهور", icon: Inbox },
  { to: "/admin/suggestions", label: "مقترحات المستخدمين", icon: MessageSquareHeart },
  { to: "/admin/influencers", label: "المؤثرون الأذكياء", icon: Bot },
  { to: "/admin/users", label: "المستخدمون", icon: Users },
  { to: "/admin/plans", label: "الباقات والأكواد", icon: CreditCard },
  { to: "/admin/gateways", label: "بوابات الدفع", icon: CreditCardIcon },
  { to: "/admin/support", label: "الدعم الجماهيري", icon: Heart },
];

export const AdminLayout = ({ children, title }: { children: ReactNode; title: string }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex bg-background" dir="rtl">
      <aside className="w-64 bg-card/50 border-l border-primary/10 flex flex-col">
        <div className="p-6 border-b border-primary/10 cursor-pointer" onClick={() => navigate("/")}>
          <HunaLogo />
          <p className="text-xs text-muted-foreground mt-2">لوحة التحكم</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"}`}>
              <l.icon className="w-4 h-4" /> {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-primary/10">
          <Button variant="ghost" size="sm" className="w-full justify-start" onClick={signOut}><LogOut className="w-4 h-4 ml-2" /> خروج</Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <header className="h-16 border-b border-primary/10 flex items-center px-6">
          <h1 className="text-xl font-bold text-gold-gradient">{title}</h1>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};
