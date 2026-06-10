import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Plan { id: string; code: string; name: string; price_monthly: number; price_yearly: number | null; max_profiles: number; is_active: boolean }
interface Promo { id: string; code: string; discount_percent: number | null; uses: number; is_active: boolean }

export default function AdminPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [promos, setPromos] = useState<Promo[]>([]);
  const [newPromo, setNewPromo] = useState({ code: "", discount_percent: 10 });
  const [open, setOpen] = useState(false);

  const load = async () => {
    const [p, c] = await Promise.all([
      supabase.from("plans").select("*").order("sort_order"),
      supabase.from("promo_codes").select("*").order("created_at", { ascending: false }),
    ]);
    setPlans((p.data ?? []) as Plan[]);
    setPromos((c.data ?? []) as Promo[]);
  };
  useEffect(() => { load(); }, []);

  const addPromo = async () => {
    if (!newPromo.code) return;
    const { error } = await supabase.from("promo_codes").insert({ code: newPromo.code.toUpperCase(), discount_percent: newPromo.discount_percent });
    if (error) toast.error(error.message); else { toast.success("تم"); setOpen(false); setNewPromo({ code: "", discount_percent: 10 }); load(); }
  };

  return (
    <AdminLayout title="الباقات والأكواد">
      <h2 className="text-lg font-bold mb-3">الباقات</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {plans.map(p => (
          <div key={p.id} className="glass-card rounded-xl p-5">
            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-xs text-muted-foreground mb-3">{p.code}</p>
            <p className="text-2xl text-gold-gradient font-bold">${p.price_monthly}<span className="text-sm text-muted-foreground"> /شهر</span></p>
            <p className="text-xs text-muted-foreground mt-1">حتى {p.max_profiles} ملف</p>
            <p className="text-xs mt-3">{p.is_active ? <span className="text-primary">نشطة</span> : <span className="text-muted-foreground">معطلة</span>}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">أكواد الخصم</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button variant="hero" size="sm">+ كود جديد</Button></DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader><DialogTitle>كود خصم</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>الكود</Label><Input value={newPromo.code} onChange={e => setNewPromo({ ...newPromo, code: e.target.value })} placeholder="HUNA20" /></div>
              <div><Label>نسبة الخصم %</Label><Input type="number" min={1} max={100} value={newPromo.discount_percent} onChange={e => setNewPromo({ ...newPromo, discount_percent: Number(e.target.value) })} /></div>
              <Button variant="hero" className="w-full" onClick={addPromo}>إضافة</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass-card rounded-xl p-4">
        {promos.length === 0 ? <p className="text-center text-muted-foreground py-6">لا توجد أكواد بعد</p> :
        <div className="divide-y divide-primary/10">{promos.map(p => (
          <div key={p.id} className="flex justify-between items-center py-3">
            <div><span className="font-mono font-bold text-primary">{p.code}</span><span className="text-sm text-muted-foreground mr-3">— خصم {p.discount_percent}%</span></div>
            <span className="text-xs text-muted-foreground">استخدم {p.uses} مرة</span>
          </div>
        ))}</div>}
      </div>
    </AdminLayout>
  );
}
