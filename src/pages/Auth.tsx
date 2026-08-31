import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HunaLogo } from "@/components/HunaLogo";
import { toast } from "sonner";
import heroImg from "@/assets/hero-huna.jpg";

export default function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => { if (user) navigate("/"); }, [user, navigate]);

  const signIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) toast.error(error.message);
    else { toast.success("مرحباً بعودتك"); navigate("/"); }
  };

  const signUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: window.location.origin, data: { display_name: name } }
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else toast.success("تم إنشاء الحساب — تحقق من بريدك");
  };

  const google = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) toast.error(error.message);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 animate-[kenburns_20s_ease-out_infinite_alternate]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      <div className="absolute inset-0 bg-pattern-arabesque" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4"><HunaLogo size="lg" /></div>
          <p className="text-muted-foreground text-sm">ادخل إلى عالم هنا — حيث تبدأ الحضارة</p>
        </div>

        <div className="glass-card rounded-2xl p-8 shadow-gold-lg">
          <Tabs defaultValue="signin" dir="rtl">
            <TabsList className="grid grid-cols-2 w-full bg-secondary/50 mb-6">
              <TabsTrigger value="signin">تسجيل الدخول</TabsTrigger>
              <TabsTrigger value="signup">حساب جديد</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <div className="space-y-2"><Label>البريد الإلكتروني</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" /></div>
              <div className="space-y-2"><Label>كلمة المرور</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
              <Button variant="hero" size="lg" className="w-full" disabled={loading} onClick={signIn}>دخول</Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2"><Label>الاسم</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="اسمك الكريم" /></div>
              <div className="space-y-2"><Label>البريد الإلكتروني</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div className="space-y-2"><Label>كلمة المرور</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
              <Button variant="hero" size="lg" className="w-full" disabled={loading} onClick={signUp}>أنشئ حسابك</Button>
            </TabsContent>
          </Tabs>

          <div className="ornament-divider my-6 text-xs text-muted-foreground">أو</div>
          <Button variant="outlineGold" size="lg" className="w-full" onClick={google}>الدخول عبر Google</Button>
        </div>
      </div>
    </div>
  );
}
