import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Plan {
  id: string; code: string; name: string; description: string | null;
  price_monthly: number; price_yearly: number | null; max_profiles: number;
  features: string[]; sort_order: number;
}

export default function Pricing() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [promo, setPromo] = useState("");
  const [yearly, setYearly] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    supabase.from("plans").select("*").eq("is_active", true).order("sort_order").then(({ data }) => {
      setPlans((data ?? []) as Plan[]);
    });
  }, []);

  const applyPromo = async () => {
    if (!promo.trim()) return;
    const { data, error } = await supabase.from("promo_codes").select("*").eq("code", promo.trim().toUpperCase()).eq("is_active", true).maybeSingle();
    if (error || !data) { toast.error("الكود غير صحيح"); return; }
    setDiscount(data.discount_percent ?? 0);
    toast.success(`تم تطبيق خصم ${data.discount_percent}%`);
  };

  const finalPrice = (p: number) => {
    const base = yearly ? p : p;
    return (base * (1 - discount / 100)).toFixed(2);
  };

  return (
    <SiteLayout>
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm mb-4">
            <Sparkles className="w-4 h-4" /> اختر الباقة المناسبة لأسرتك
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="text-gold-gradient">باقات منصة هنا</span></h1>
          <p className="text-muted-foreground">3 باقات مرنة، مع مساعد تربوي ذكي ومؤثرين أذكياء للأطفال.</p>

          <div className="inline-flex items-center gap-2 bg-secondary/50 rounded-full p-1 mt-6 border border-primary/10">
            <button onClick={() => setYearly(false)} className={`px-4 py-1.5 rounded-full text-sm ${!yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>شهري</button>
            <button onClick={() => setYearly(true)} className={`px-4 py-1.5 rounded-full text-sm ${yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>سنوي · وفّر 17%</button>
          </div>
        </div>

        {/* Promo code */}
        <div className="max-w-md mx-auto mb-10 flex gap-2">
          <Input placeholder="كود الخصم (اختياري)" value={promo} onChange={(e) => setPromo(e.target.value)} />
          <Button variant="outlineGold" onClick={applyPromo}>تطبيق</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, idx) => (
            <div key={p.id} className={`relative rounded-2xl p-8 border ${idx === 2 ? "border-primary bg-card shadow-gold-lg" : "border-primary/20 bg-card/50"}`}>
              {idx === 2 && <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-gold-shine text-primary-foreground text-xs font-bold">الأكثر شعبية</div>}
              <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
              <p className="text-sm text-muted-foreground mb-6 min-h-[40px]">{p.description}</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gold-gradient">${finalPrice(yearly ? (p.price_yearly ?? p.price_monthly * 12) : p.price_monthly)}</span>
                <span className="text-muted-foreground text-sm"> / {yearly ? "سنة" : "شهر"}</span>
              </div>
              <Button variant={idx === 2 ? "hero" : "outlineGold"} size="lg" className="w-full mb-6">اشترك الآن</Button>
              <ul className="space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">سيتم تفعيل بوابة الدفع قريباً. أبلغني عند الجاهزية لتفعيل Paddle أو Stripe.</p>
      </section>
    </SiteLayout>
  );
}
