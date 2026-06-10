import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface D { id: string; donor_name: string | null; donor_email: string | null; amount: number; tier: string | null; message: string | null; created_at: string; status: string }

export default function AdminSupport() {
  const [items, setItems] = useState<D[]>([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    supabase.from("donations").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      const arr = (data ?? []) as D[];
      setItems(arr);
      setTotal(arr.reduce((s, x) => s + Number(x.amount ?? 0), 0));
    });
  }, []);
  return (
    <AdminLayout title="الدعم الجماهيري">
      <div className="glass-card rounded-xl p-5 mb-4">
        <p className="text-xs text-muted-foreground">إجمالي التبرعات</p>
        <p className="text-4xl font-bold text-gold-gradient">${total.toFixed(2)}</p>
      </div>
      <div className="glass-card rounded-xl divide-y divide-primary/10">
        {items.length === 0 ? <p className="p-10 text-center text-muted-foreground">لا توجد تبرعات بعد</p> :
        items.map(d => (
          <div key={d.id} className="p-4">
            <div className="flex justify-between mb-1"><span className="font-medium">{d.donor_name ?? "متبرع كريم"}</span><span className="text-primary font-bold">${d.amount}</span></div>
            <div className="flex gap-3 text-xs text-muted-foreground">{d.donor_email && <span>{d.donor_email}</span>}{d.tier && <span>· {d.tier}</span>}<span>· {new Date(d.created_at).toLocaleDateString("ar")}</span></div>
            {d.message && <p className="text-sm mt-2 text-muted-foreground italic">"{d.message}"</p>}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
