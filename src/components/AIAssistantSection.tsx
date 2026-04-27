import { ArabesqueDivider } from "./ArabesqueDivider";
import { Button } from "./ui/button";
import { MessageSquareHeart, Brain, Sparkles, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "ذكاء يفهمك",
    description: "محرك توصيات ذكي يتعلّم من تفضيلاتك ويقترح المحتوى الأنسب لك.",
  },
  {
    icon: MessageSquareHeart,
    title: "مساعد تربوي ذكي",
    description: "مستشار ذكي للأب والأم يقدّم توجيهات تربوية يومية ويجيب عن استشاراتكم.",
  },
  {
    icon: ShieldCheck,
    title: "محتوى آمن ومنتقى",
    description: "كل محتوى يمر بتدقيق قيمي يضمن مناسبته للأسرة المسلمة.",
  },
  {
    icon: Sparkles,
    title: "تجربة سينمائية",
    description: "جودة عالية، ترجمة عربية فصحى، وأسلوب عرض يليق بحضارتنا.",
  },
];

export const AIAssistantSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial-gold opacity-50" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-4">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            الذكاء الاصطناعي
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-center mb-6">
          <span className="text-gold-gradient">مساعدك الذكي</span>
          <span className="text-foreground"> في كل خطوة</span>
        </h2>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg">
          من توصيات المحتوى إلى الاستشارات التربوية، الذكاء الاصطناعي مدمج في كل ركن من أركان منصة هنا.
        </p>

        <ArabesqueDivider />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* الميزات */}
          <div className="space-y-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex gap-5 group animate-fade-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <Icon className="w-7 h-7 text-primary-foreground" strokeWidth={2} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* محاكاة محادثة */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="absolute -inset-4 bg-gradient-gold opacity-20 blur-3xl rounded-full" />

            <div className="relative glass-card rounded-2xl p-6 shadow-gold-lg">
              <div className="flex items-center gap-3 pb-4 border-b border-primary/20 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold text-foreground">مساعد هنا</p>
                  <p className="text-xs text-primary">متصل الآن</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-secondary/60 rounded-2xl rounded-tr-sm p-4 mr-12">
                  <p className="text-sm text-foreground">
                    ابني عمره 12 سنة وبدأ يبتعد عن الصلاة، كيف أتعامل معه؟
                  </p>
                </div>

                <div className="bg-gradient-gold/10 border border-primary/30 rounded-2xl rounded-tl-sm p-4 ml-12">
                  <p className="text-sm text-foreground leading-relaxed">
                    أهلاً بك. هذه مرحلة حساسة. أنصحك بثلاث خطوات: أولاً اقترب منه عاطفياً قبل أن تأمره، ثانياً شاهد معه برنامج «همّة الفتى» على المنصة، ثالثاً...
                  </p>
                  <div className="mt-3 pt-3 border-t border-primary/20 flex items-center gap-2">
                    <span className="text-xs text-primary">📺 توصية:</span>
                    <span className="text-xs text-muted-foreground">برنامج همّة الفتى</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <input
                  className="flex-1 bg-input/60 border border-primary/20 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60"
                  placeholder="اكتب سؤالك للمساعد..."
                  disabled
                />
                <Button variant="hero" size="default">إرسال</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
