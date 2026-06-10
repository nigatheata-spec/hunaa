import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Kind = "movie" | "series" | "reel" | "influencer";
interface Title { id: string; title: string; kind: Kind; track: string | null; is_published: boolean; poster_url: string | null }

export default function AdminContent() {
  const [items, setItems] = useState<Title[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", kind: "movie" as Kind, track: "", synopsis: "", long_description: "", poster_url: "", backdrop_url: "", trailer_url: "", age_rating: "", duration_minutes: "" });

  const load = async () => {
    const { data } = await supabase.from("titles").select("id, title, kind, track, is_published, poster_url").order("created_at", { ascending: false });
    setItems((data ?? []) as Title[]);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.title) { toast.error("العنوان مطلوب"); return; }
    const { error } = await supabase.from("titles").insert({
      title: form.title, kind: form.kind, track: form.track || null,
      synopsis: form.synopsis || null, long_description: form.long_description || null,
      poster_url: form.poster_url || null, backdrop_url: form.backdrop_url || null,
      trailer_url: form.trailer_url || null, age_rating: form.age_rating || null,
      duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : null,
    });
    if (error) toast.error(error.message); else { toast.success("تمت الإضافة"); setOpen(false); load(); setForm({ title: "", kind: "movie", track: "", synopsis: "", long_description: "", poster_url: "", backdrop_url: "", trailer_url: "", age_rating: "", duration_minutes: "" }); }
  };

  const del = async (id: string) => {
    if (!confirm("حذف هذا المحتوى؟")) return;
    await supabase.from("titles").delete().eq("id", id);
    load();
  };

  return (
    <AdminLayout title="إدارة المحتوى">
      <div className="flex justify-end mb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button variant="hero"><Plus className="w-4 h-4 ml-1" /> إضافة محتوى</Button></DialogTrigger>
          <DialogContent className="max-w-2xl bg-card max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>محتوى جديد</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>العنوان</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label>النوع</Label>
                  <Select value={form.kind} onValueChange={(v: Kind) => setForm({ ...form, kind: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="movie">فيلم</SelectItem><SelectItem value="series">مسلسل</SelectItem><SelectItem value="reel">ريل</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>المسار</Label><Input value={form.track} onChange={e => setForm({ ...form, track: e.target.value })} placeholder="تاريخ إسلامي، علمي ..." /></div>
                <div><Label>التصنيف العمري</Label><Input value={form.age_rating} onChange={e => setForm({ ...form, age_rating: e.target.value })} placeholder="+12" /></div>
              </div>
              <div><Label>المدة (دقيقة)</Label><Input type="number" value={form.duration_minutes} onChange={e => setForm({ ...form, duration_minutes: e.target.value })} /></div>
              <div><Label>الملخص</Label><Textarea value={form.synopsis} onChange={e => setForm({ ...form, synopsis: e.target.value })} rows={2} /></div>
              <div><Label>الوصف التفصيلي</Label><Textarea value={form.long_description} onChange={e => setForm({ ...form, long_description: e.target.value })} rows={4} /></div>
              <div><Label>رابط البوستر</Label><Input value={form.poster_url} onChange={e => setForm({ ...form, poster_url: e.target.value })} /></div>
              <div><Label>رابط الخلفية</Label><Input value={form.backdrop_url} onChange={e => setForm({ ...form, backdrop_url: e.target.value })} /></div>
              <div><Label>رابط الإعلان / يوتيوب</Label><Input value={form.trailer_url} onChange={e => setForm({ ...form, trailer_url: e.target.value })} placeholder="https://www.youtube.com/watch?v=..." /><p className="text-xs text-muted-foreground mt-1">يدعم روابط يوتيوب مباشرة (سيتم تشغيلها مدمجة في صفحة المنتج).</p></div>
              <Button variant="hero" className="w-full" onClick={save}>حفظ</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <Table>
          <TableHeader><TableRow><TableHead>العنوان</TableHead><TableHead>النوع</TableHead><TableHead>المسار</TableHead><TableHead>الحالة</TableHead><TableHead /></TableRow></TableHeader>
          <TableBody>
            {items.length === 0 ? <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">لا يوجد محتوى بعد</TableCell></TableRow> :
            items.map(i => (
              <TableRow key={i.id}>
                <TableCell className="font-medium">{i.title}</TableCell>
                <TableCell>{i.kind}</TableCell>
                <TableCell>{i.track ?? "-"}</TableCell>
                <TableCell>{i.is_published ? <span className="text-primary">منشور</span> : <span className="text-muted-foreground">مخفي</span>}</TableCell>
                <TableCell><Button variant="ghost" size="icon" onClick={() => del(i.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
