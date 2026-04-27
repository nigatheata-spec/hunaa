import { HunaLogo } from "./HunaLogo";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-huna.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* خلفية الصورة */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="منصة هنا - زخارف إسلامية ذهبية"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-hero-overlay" />
        <div className="absolute inset-0 bg-gradient-radial-gold" />
      </div>

      {/* المحتوى */}
      <div className="relative z-10 container mx-auto px-6 py-24 text-center">
        <div className="animate-fade-up flex justify-center mb-8" style={{ animationDelay: "0.1s" }}>
          <HunaLogo className="scale-150" />
        </div>

        <h1
          className="animate-fade-up text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="block text-foreground">هنا تبدأ</span>
          <span className="block text-gold-gradient mt-2">حضارتك</span>
        </h1>

        <p
          className="animate-fade-up text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ animationDelay: "0.5s" }}
        >
          منصة المحتوى العربي الأولى المدعومة بالذكاء الاصطناعي.
          <br className="hidden md:block" />
          اثنا عشر مساراً، تجربة مخصصة لكل فرد من أسرتك.
        </p>

        <div
          className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animationDelay: "0.7s" }}
        >
          <Button variant="hero" size="xl">
            ابدأ تجربتك الآن
          </Button>
          <Button variant="outlineGold" size="xl">
            تعرف على المسارات
          </Button>
        </div>

        <p
          className="animate-fade-up font-serif-ar text-primary/70 text-lg mt-16"
          style={{ animationDelay: "0.9s" }}
        >
          ﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾
        </p>
      </div>

      {/* تأثير الإضاءة السفلية */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
