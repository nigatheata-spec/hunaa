import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Film, Inbox, Users, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ titles: 0, requests: 0, users: 0, donations: 0 });
  useEffect(() => {
    Promise.all([
      supabase.from("titles").select("*", { count: "exact", head: true }),
      supabase.from("content_requests").select("*", { count: "exact", head: true }),
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("donations").select("amount"),
    ]).then(([t, r, u, d]) => {
      const totalDon = (d.data ?? []).reduce((s, x: { amount: number }) => s + Number(x.amount ?? 0), 0);
      setStats({ titles: t.count ?? 0, requests: r.count ?? 0, users: u.count ?? 0, donations: totalDon });
    });
  }, []);

  const cards = [
    { label: "محتوى منشور", value: stats.titles, icon: Film },
    { label: "طلبات الجمهور", value: stats.requests, icon: Inbox },
    { label: "المستخدمون", value: stats.users, icon: Users },
    { label: "التبرعات ($)", value: stats.donations.toFixed(0), icon: DollarSign },
  ];

  return (
    <AdminLayout title="نظرة عامة">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <div key={c.label} className="glass-card rounded-xl p-5">
            <c.icon className="w-5 h-5 text-primary mb-3" />
            <p className="text-xs text-muted-foreground">{c.label}</p>
            <p className="text-3xl font-bold text-gold-gradient mt-1">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="glass-card rounded-xl p-6 mt-6">
        <h2 className="text-lg font-bold mb-3">مرحباً بك في لوحة "هنا"</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">من هنا تدير المحتوى، تتابع طلبات الجمهور، تشرف على المؤثرين الأذكياء، وتفعّل بوابات الدفع. ابدأ من قائمة الجانب.</p>
      </div>
    </AdminLayout>
  );
}
