import { HunaLogo } from "./HunaLogo";

export const Footer = () => {
  return (
    <footer className="relative border-t border-primary/20 bg-card/50">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-right">
            <HunaLogo />
            <p className="text-muted-foreground text-sm mt-3 max-w-md">
              منصة هنا — حيث تلتقي الحضارة الإسلامية بتقنيات المستقبل.
            </p>
          </div>

          <p className="font-serif-ar text-primary/60 text-lg text-center">
            « هُنا حيث ينبض القلب بالمعرفة »
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-primary/10 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} منصة هنا. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
};
