import { Link, useNavigate } from "react-router-dom";
import { HunaLogo } from "./HunaLogo";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, LayoutDashboard, User as UserIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./ui/dropdown-menu";

export const Navbar = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/70 backdrop-blur-xl border-b border-primary/10">
      <div className="container mx-auto px-6 h-16 grid grid-cols-3 items-center">
        <div className="flex justify-start">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outlineGold" size="sm" className="gap-2">
                  <UserIcon className="w-4 h-4" />
                  حسابي
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-card border-primary/20">
                <DropdownMenuItem onClick={() => navigate("/assistant")}>المساعد التربوي</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/account")}>إعدادات الأسرة</DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <LayoutDashboard className="w-4 h-4 ml-2" /> لوحة التحكم
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="w-4 h-4 ml-2" /> تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="hero" size="sm" onClick={() => navigate("/auth")}>ابدأ الآن</Button>
          )}
        </div>
        <div className="flex justify-center">
          <Link to="/" aria-label="الصفحة الرئيسية"><HunaLogo /></Link>
        </div>
        <div />
      </div>
    </header>
  );
};
