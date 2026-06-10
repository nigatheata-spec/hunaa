import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";

interface Gateway { id: string; code: string; name: string; is_enabled: boolean }

export default function AdminGateways() {
  const [items, setItems] = useState<Gateway[]>([]);
  const load = () => supabase.from("payment_gateways").select("*").order("name").then(({ data }) => setItems((data ?? []) as Gateway[]));
  useEffect(() => { load(); }, []);

  const toggle = async (id: string, val: boolean) => {
    const { error } = await supabase.from("payment_gateways").update({ is_enabled: val }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success(val ? "تم التفعيل" : "تم التعطيل"); load(); }
  };

  return (
    <AdminLayout title="بوابات الدفع">
      <div className="grid md:grid-cols-2 gap-4">
        {items.map(g => (
          <div key={g.id} className="glass-card rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><CreditCard className="w-6 h-6 text-primary" /></div>
              <div><h3 className="font-bold">{g.name}</h3><p className="text-xs text-muted-foreground">{g.code}</p></div>
            </div>
            <Switch checked={g.is_enabled} onCheckedChange={(v) => toggle(g.id, v)} />
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-6">تفعيل بوابة هنا يضيفها للقائمة في صفحة الباقات. لاكتمال الربط الفعلي بـ Paddle/Stripe يجب تفعيلها على مستوى المنصة (أبلغني للتنفيذ).</p>
    </AdminLayout>
  );
}
