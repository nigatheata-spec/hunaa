import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface P { id: string; display_name: string | null; family_role: string | null; created_at: string }

export default function AdminUsers() {
  const [items, setItems] = useState<P[]>([]);
  useEffect(() => { supabase.from("profiles").select("*").order("created_at", { ascending: false }).then(({ data }) => setItems((data ?? []) as P[])); }, []);
  return (
    <AdminLayout title="المستخدمون">
      <div className="glass-card rounded-xl divide-y divide-primary/10">
        {items.length === 0 ? <p className="p-10 text-center text-muted-foreground">لا مستخدمين بعد</p> :
        items.map(p => (
          <div key={p.id} className="p-4 flex justify-between text-sm">
            <span>{p.display_name ?? "بدون اسم"}</span>
            <span className="text-muted-foreground">{p.family_role ?? "—"}</span>
            <span className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString("ar")}</span>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
