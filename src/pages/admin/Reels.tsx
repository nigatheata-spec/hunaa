import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface Reel {
  id: string;
  title: string;
  author: string | null;
  description: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  cta_label: string | null;
  linked_title_id: string | null;
  likes_count: number;
  comments_count: number;
  is_published: boolean;
  sort_order: number;
}

interface TitleOpt { id: string; title: string }

const db = supabase as unknown as {
  from: (t: string) => any;
};

const empty = {
  title: "", author: "", description: "", video_url: "", thumbnail_url: "",
  cta_label: "مشاهدة العمل", linked_title_id: "", sort_order: "0",
};

export default function AdminReels() {
  const [items, setItems] = useState<Reel[]>([]);
  const [titles, setTitles] = useState<TitleOpt[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...empty });

  const load = async () => {
    const { data, error } = await db.from("reels").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });
    if (error) { toast.error(error.message); return; }
    setItems((data ?? []) as Reel[]);
  };

  useEffect(() => {
    load();
    supabase.from("titles").select("id, title").order("title").then(({ data }) => setTitles((data ?? []) as TitleOpt[]));
  }, []);

  const save = async () => {
    if (!form.title) { toast.error("العنوان مطلوب"); return; }
    const { error } = await db.from("reels").insert({
      title: form.title,
      author: form.author || null,
      description: form.description || null,
      video_url: form.video_url || null,
      thumbnail_url: form.thumbnail_url || null,
      cta_label: form.cta_label || null,
      linked_title_id: form.linked_title_id || null,
      sort_order: Number(form.sort_order) || 0,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("تمت إضافة الريل");
    setOpen(false); setForm({ ...empty }); load();
  };

  const togglePublish = async (r: Reel) => {
    const { error } = await db.from("reels").update({ is_published: !r.is_published }).eq("id", r.id);
    if (error) toast.error(error.message); else load();
  };

  const del = async (id: string) => {
    if (!confirm("حذف هذا الريل؟")) return;
    const { error } = await db.from("reels").delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  };

  return (
    <AdminLayout title="إدارة الريلز">
      <div className="flex justify-end mb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button variant="hero"><Plus className="w-4 h-4 ml-1" /> إضافة ريل</Button></DialogTrigger>
          <DialogContent className="max-w-2xl bg-card max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>ريل جديد</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>العنوان</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label>صاحب المحتوى</Label><Input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="هُنا ستوديو" /></div>
              </div>
              <div><Label>الوصف</Label><Textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
              <div>
                <Label>رابط الفيديو</Label>
                <Input value={form.video_url} onChange={e => setForm({ ...form, video_url: e.target.value })} placeholder="https://... (mp4 أو يوتيوب)" />
                <p className="text-xs text-muted-foreground mt-1">يدعم ملفات mp4 المباشرة وروابط يوتيوب.</p>
              </div>
              <div><Label>صورة الغلاف</Label><Input value={form.thumbnail_url} onChange={e => setForm({ ...form, thumbnail_url: e.target.value })} placeholder="https://..." /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>نص الزر</Label><Input value={form.cta_label} onChange={e => setForm({ ...form, cta_label: e.target.value })} /></div>
                <div><Label>الترتيب</Label><Input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: e.target.value })} /></div>
              </div>
              <div>
                <Label>العمل المرتبط (اختياري)</Label>
                <select
                  className="w-full h-10 rounded-md bg-background border border-input px-3 text-sm"
                  value={form.linked_title_id}
                  onChange={e => setForm({ ...form, linked_title_id: e.target.value })}
                >
                  <option value="">— بدون —</option>
                  {titles.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                </select>
              </div>
              <Button variant="hero" className="w-full" onClick={save}>حفظ</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">الغلاف</TableHead>
              <TableHead className="text-right">العنوان</TableHead>
              <TableHead className="text-right">صاحب المحتوى</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-right">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-10">لا توجد ريلز بعد</TableCell></TableRow>
            ) : items.map(r => (
              <TableRow key={r.id}>
                <TableCell>
                  {r.thumbnail_url
                    ? <img src={r.thumbnail_url} alt={r.title} className="w-12 h-16 object-cover rounded-md" />
                    : <div className="w-12 h-16 rounded-md bg-secondary/50" />}
                </TableCell>
                <TableCell className="font-medium">{r.title}</TableCell>
                <TableCell className="text-muted-foreground">{r.author ?? "—"}</TableCell>
                <TableCell className="text-xs">{r.is_published ? "منشور" : "مخفي"}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => togglePublish(r)}>
                      {r.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => del(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
