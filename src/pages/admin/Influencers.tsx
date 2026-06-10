import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

interface Inf { id: string; name: string; tagline: string | null; is_active: boolean }

export default function AdminInfluencers() {
  const [items, setItems] = useState<Inf[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", tagline: "", bio: "", avatar_url: "", voice_style: "", system_prompt: "" });

  const load = () => supabase.from("influencers").select("id, name, tagline, is_active").order("name").then(({ data }) => setItems((data ?? []) as Inf[]));
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.name || !form.system_prompt) { toast.error("الاسم والمطالبة مطلوبان"); return; }
    const { error } = await supabase.from("influencers").insert(form);
    if (error) toast.error(error.message); else { toast.success("تم"); setOpen(false); setForm({ name: "", tagline: "", bio: "", avatar_url: "", voice_style: "", system_prompt: "" }); load(); }
  };
  const del = async (id: string) => { if (!confirm("حذف؟")) return; await supabase.from("influencers").delete().eq("id", id); load(); };

  return (
    <AdminLayout title="المؤثرون الأذكياء">
      <div className="flex justify-end mb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button variant="hero"><Plus className="w-4 h-4 ml-1" /> شخصية جديدة</Button></DialogTrigger>
          <DialogContent className="bg-card max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>مؤثّر ذكي جديد</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>الاسم</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="الشيخ هنا" /></div>
              <div><Label>الشعار الفرعي</Label><Input value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} placeholder="صديقك في رحلة المعرفة" /></div>
              <div><Label>السيرة المختصرة</Label><Textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} rows={2} /></div>
              <div><Label>رابط الصورة</Label><Input value={form.avatar_url} onChange={e => setForm({ ...form, avatar_url: e.target.value })} /></div>
              <div><Label>أسلوب الصوت</Label><Input value={form.voice_style} onChange={e => setForm({ ...form, voice_style: e.target.value })} placeholder="هادئ، حنون، فضولي ..." /></div>
              <div><Label>المطالبة (System Prompt)</Label><Textarea value={form.system_prompt} onChange={e => setForm({ ...form, system_prompt: e.target.value })} rows={6} placeholder="أنت شخصية اسمها ... تخاطب الأطفال ..." /></div>
              <Button variant="hero" className="w-full" onClick={save}>حفظ</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="glass-card rounded-xl divide-y divide-primary/10">
        {items.length === 0 ? <p className="p-10 text-center text-muted-foreground">لا توجد شخصيات بعد</p> :
        items.map(i => (
          <div key={i.id} className="flex justify-between items-center p-4">
            <div><p className="font-bold">{i.name}</p><p className="text-xs text-muted-foreground">{i.tagline}</p></div>
            <Button variant="ghost" size="icon" onClick={() => del(i.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
