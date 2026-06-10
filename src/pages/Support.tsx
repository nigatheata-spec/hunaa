import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Trophy, Star, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const tiers = [
  { name: "داعم", icon: Heart, amount: 25, color: "from-rose-500 to-amber-500", perks: ["شكر شخصي", "اسمك في قائمة الداعمين"] },
  { name: "راعٍ فضي", icon: Star, amount: 100, color: "from-slate-300 to-slate-500", perks: ["كل ما سبق", "شهر مجاني من باقة الأسرة", "شهادة شكر رقمية"] },
  { name: "راعٍ ذهبي", icon: Trophy, amount: 500, color: "from-yellow-400 to-amber-600", perks: ["كل ما سبق", "سنة كاملة مجانية", "اسمك في تترات أعمال هنا"] },
];

export default function Support() {
  const [amount, setAmount] = useState(50);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [tier, setTier] = useState("");

  const submit = async () => {
    if (!amount || amount < 1) { toast.error("أدخل مبلغاً صحيحاً"); return; }
    const { error } = await supabase.from("donations").insert({
      donor_name: name || null, donor_email: email || null, amount, currency: "USD", tier: tier || null, message: msg || null,
    });
    if (error) toast.error("تعذّر الإرسال"); else { toast.success("شكراً لدعمك! سنتواصل معك لإتمام التبرع."); setMsg(""); }
  };

  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-arabesque" />
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm mb-6">
            <Sparkles className="w-4 h-4" /> مشروع أمّة
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6"><span className="text-gold-gradient">ادعم منصة هنا</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            هنا ليست منصة تجارية فقط — هي مشروع حضاري لإعادة سرد قصتنا بأدوات اليوم. دعمك يحوّل الفكرة إلى مؤسسة راسخة تخدم أجيالاً قادمة.
          </p>
        </div>
      </section>

      {/* Progress */}
      <section className="container mx-auto px-6 -mt-6 mb-16 max-w-3xl">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex justify-between text-sm mb-3"><span>الهدف الحالي: <strong className="text-primary">$50,000</strong></span><span className="text-muted-foreground">المجموع: $12,400</span></div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden"><div className="h-full bg-gradient-gold-shine" style={{ width: "25%" }} /></div>
        </div>
      </section>

      {/* Tiers */}
      <section className="container mx-auto px-6 mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">مستويات الدعم</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.name} onClick={() => { setAmount(t.amount); setTier(t.name); }} className={`text-right glass-card rounded-2xl p-6 hover:border-primary/50 transition-all ${tier === t.name ? "border-primary shadow-gold" : ""}`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center mb-4`}><Icon className="w-6 h-6 text-white" /></div>
                <h3 className="text-xl font-bold mb-1">{t.name}</h3>
                <p className="text-3xl font-bold text-gold-gradient mb-4">${t.amount}</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">{t.perks.map(p => <li key={p}>• {p}</li>)}</ul>
              </button>
            );
          })}
        </div>
      </section>

      {/* Donation form */}
      <section className="container mx-auto px-6 mb-20 max-w-2xl">
        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">ساهم بأي مبلغ</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <Input placeholder="الاسم (اختياري)" value={name} onChange={(e) => setName(e.target.value)} />
            <Input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Input type="number" min={1} placeholder="المبلغ بالدولار" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mb-4 text-lg" />
          <Textarea placeholder="رسالتك لفريق هنا (اختياري)" value={msg} onChange={(e) => setMsg(e.target.value)} className="mb-6" />
          <Button variant="hero" size="lg" className="w-full" onClick={submit}>تبرّع الآن</Button>
        </div>
      </section>
    </SiteLayout>
  );
}
