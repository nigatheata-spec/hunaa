import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sparkles, BarChart3 } from "lucide-react";
import { toast } from "sonner";

interface Req { id: string; raw_request: string; family_role: string | null; track: string | null; status: string; created_at: string }
interface Analysis { summary?: string; details?: string; topTopics?: { name: string; count: number }[]; topTracks?: { name: string; count: number }[]; topRoles?: { name: string; count: number }[]; recommendations?: string[]; total?: number }

export default function AdminRequests() {
  const [items, setItems] = useState<Req[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => { supabase.from("content_requests").select("*").order("created_at", { ascending: false }).then(({ data }) => setItems((data ?? []) as Req[])); }, []);

  const filtered = filter === "all" ? items : items.filter(i => i.family_role === filter);

  const analyze = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
      });
      const data = await res.json();
      if (!res.ok) toast.error(data.error ?? "فشل التحليل");
      else setAnalysis(data);
    } finally { setAnalyzing(false); }
  };

  return (
    <AdminLayout title="طلبات الجمهور">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {[["all","الكل"],["father","الأب"],["mother","الأم"],["son","الابن"],["daughter","البنت"]].map(([v, l]) => (
            <Button key={v} variant={filter === v ? "hero" : "outlineGold"} size="sm" onClick={() => setFilter(v)}>{l}</Button>
          ))}
        </div>
        <Button variant="hero" onClick={analyze} disabled={analyzing}>
          <Sparkles className="w-4 h-4 ml-1" /> {analyzing ? "جاري التحليل..." : "حلّل بالذكاء الاصطناعي"}
        </Button>
      </div>

      {analysis && (
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <div className="glass-card rounded-xl p-5 lg:col-span-2">
            <div className="flex items-center gap-2 mb-3"><BarChart3 className="w-5 h-5 text-primary" /><h3 className="font-bold">الملخص المجمل</h3></div>
            <p className="text-sm leading-relaxed text-muted-foreground mb-4">{analysis.summary}</p>
            {analysis.details && <details className="text-sm"><summary className="cursor-pointer text-primary">عرض التفاصيل الإحصائية</summary><p className="mt-2 text-muted-foreground whitespace-pre-line">{analysis.details}</p></details>}
            {analysis.recommendations && (
              <div className="mt-4 pt-4 border-t border-primary/10">
                <h4 className="text-sm font-semibold text-primary mb-2">توصيات</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">{analysis.recommendations.map((r, i) => <li key={i}>• {r}</li>)}</ul>
              </div>
            )}
          </div>
          <div className="space-y-3">
            {analysis.topTopics && (
              <div className="glass-card rounded-xl p-4">
                <h4 className="text-xs font-semibold text-primary mb-2">أكثر المواضيع</h4>
                {analysis.topTopics.slice(0, 5).map(t => (
                  <div key={t.name} className="flex justify-between text-sm py-1"><span>{t.name}</span><span className="text-muted-foreground">{t.count}</span></div>
                ))}
              </div>
            )}
            {analysis.topTracks && (
              <div className="glass-card rounded-xl p-4">
                <h4 className="text-xs font-semibold text-primary mb-2">أكثر المسارات</h4>
                {analysis.topTracks.slice(0, 5).map(t => (
                  <div key={t.name} className="flex justify-between text-sm py-1"><span>{t.name}</span><span className="text-muted-foreground">{t.count}</span></div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="glass-card rounded-xl divide-y divide-primary/10">
        {filtered.length === 0 ? <div className="p-10 text-center text-muted-foreground">لا توجد طلبات بعد</div> :
        filtered.map(r => (
          <div key={r.id} className="p-4 flex justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm mb-1">{r.raw_request}</p>
              <div className="flex gap-2 text-xs text-muted-foreground">
                {r.family_role && <span>👤 {r.family_role}</span>}
                {r.track && <span>📚 {r.track}</span>}
                <span>{new Date(r.created_at).toLocaleDateString("ar")}</span>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${r.status === 'new' ? 'bg-primary/20 text-primary' : 'bg-secondary'}`}>{r.status}</span>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
