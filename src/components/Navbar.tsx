import { HunaLogo } from "./HunaLogo";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/70 backdrop-blur-xl border-b border-primary/10">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <HunaLogo />

        <nav className="hidden md:flex items-center gap-8">
          <a href="#tracks" className="text-sm text-muted-foreground hover:text-primary transition-colors">المسارات</a>
          <a href="#family" className="text-sm text-muted-foreground hover:text-primary transition-colors">الأسرة</a>
          <a href="#ai" className="text-sm text-muted-foreground hover:text-primary transition-colors">الذكاء الاصطناعي</a>
          <a href="#content" className="text-sm text-muted-foreground hover:text-primary transition-colors">المحتوى</a>
        </nav>

        <Button variant="hero" size="sm">
          ابدأ الآن
        </Button>
      </div>
    </header>
  );
};
