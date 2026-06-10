import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type Role = "father" | "mother" | "son" | "daughter";

export default function Account() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role | "">("");

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) { setName(data.display_name ?? ""); setRole((data.family_role as Role) ?? ""); }
    });
  }, [user]);

  const save = async () => {
    if (!user) return;
    const { error } = await supabase.from("profiles").update({ display_name: name, family_role: (role || null) as Role | null }).eq("id", user.id);
    if (error) toast.error(error.message); else toast.success("تم الحفظ");
  };

  return (
    <SiteLayout>
      <section className="container mx-auto px-6 py-12 max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center"><span className="text-gold-gradient">إعدادات الحساب</span></h1>
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div><Label>الاسم</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
          <div><Label>دورك في الأسرة</Label>
            <Select value={role} onValueChange={(v: Role) => setRole(v)}>
              <SelectTrigger><SelectValue placeholder="اختر..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="father">أب</SelectItem>
                <SelectItem value="mother">أم</SelectItem>
                <SelectItem value="son">ابن</SelectItem>
                <SelectItem value="daughter">بنت</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="hero" size="lg" className="w-full" onClick={save}>حفظ</Button>
        </div>
      </section>
    </SiteLayout>
  );
}
