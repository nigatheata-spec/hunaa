import { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Send, Sparkles, User as UserIcon, Plus, Baby, User2, UserRound, Users as UsersIcon, MessageSquareHeart, ClipboardCheck, BarChart3, Info } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { ChildAssessmentDialog } from "@/components/ChildAssessmentDialog";
import { CATEGORY_LABEL, categoryBrief, categoryDetail, type AssessmentResult } from "@/data/childAssessment";
import { AvatarPicker } from "@/components/AvatarPicker";
import { defaultAvatarFor } from "@/data/avatars";

interface Msg { role: "user" | "assistant"; content: string }
interface Child {
  id: string; name: string; age: number | null; gender: "boy" | "girl" | null; interests: string | null;
  avatar_url?: string | null; traits?: string | null; assessment?: AssessmentResult | null; assessment_completed_at?: string | null;
}
interface Rec { id: string; suggested_title: string | null; reason: string | null; suggested_kind: string | null; topic: string | null }

type ThreadKey = "father" | "mother" | string; // string => child id

export default function Assistant() {
  const { user } = useAuth();
  const [children, setChildren] = useState<Child[]>([]);
  const [activeThread, setActiveThread] = useState<ThreadKey>("father");
  const [threadMessages, setThreadMessages] = useState<Record<string, Msg[]>>({});
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Rec[]>([]);
  const [openAddChild, setOpenAddChild] = useState(false);
  const [newChild, setNewChild] = useState({ name: "", age: "", gender: "boy" as "boy" | "girl", interests: "" });
  const [openSuggest, setOpenSuggest] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [threadConvIds, setThreadConvIds] = useState<Record<string, string>>({});
  const [openAssessment, setOpenAssessment] = useState(false);
  const [openResults, setOpenResults] = useState(false);
  const [expandedCat, setExpandedCat] = useState<import("@/data/childAssessment").AssessmentCategory | null>(null);
  const [editingTraits, setEditingTraits] = useState(false);
  const [traitsDraft, setTraitsDraft] = useState("");
  const [profile, setProfile] = useState<{ father_avatar_url: string | null; mother_avatar_url: string | null } | null>(null);
  const [searchParams] = useSearchParams();
  const endRef = useRef<HTMLDivElement>(null);

  const threadKey = (row: { family_role: string | null; child_id: string | null }): string | null => {
    if (row.child_id) return row.child_id;
    if (row.family_role === "father" || row.family_role === "mother") return row.family_role;
    return null;
  };

  const loadChildren = async () => {
    if (!user) return;
    const { data } = await supabase.from("children").select("*").eq("parent_id", user.id).order("created_at");
    setChildren((data ?? []) as unknown as Child[]);
  };

  const loadConversations = async () => {
    if (!user) return;
    const { data } = await supabase.from("assistant_conversations").select("id, family_role, child_id, messages").eq("user_id", user.id);
    const msgs: Record<string, Msg[]> = {};
    const ids: Record<string, string> = {};
    (data ?? []).forEach((r: { id: string; family_role: string | null; child_id: string | null; messages: unknown }) => {
      const k = threadKey(r);
      if (!k) return;
      ids[k] = r.id;
      msgs[k] = (r.messages as Msg[]) ?? [];
    });
    setThreadConvIds(ids);
    setThreadMessages(msgs);
  };

  const loadRecs = async () => {
    if (!user) return;
    const { data } = await supabase.from("recommendations").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20);
    setRecommendations((data ?? []) as Rec[]);
  };

  const loadProfile = async () => {
    if (!user) return;
    const { data } = await supabase.from("profiles").select("father_avatar_url, mother_avatar_url").eq("id", user.id).maybeSingle();
    if (data) setProfile(data as { father_avatar_url: string | null; mother_avatar_url: string | null });
  };

  useEffect(() => { loadChildren(); loadRecs(); loadConversations(); loadProfile(); }, [user]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [threadMessages, activeThread]);

  // Honor ?thread= from URL (father | mother | son | daughter | <childId>)
  useEffect(() => {
    const t = searchParams.get("thread");
    if (!t) return;
    if (t === "father" || t === "mother") { setActiveThread(t); return; }
    if (t === "son" || t === "daughter") {
      const target = children.find(c => c.gender === (t === "son" ? "boy" : "girl"));
      if (target) setActiveThread(target.id);
      else setOpenAddChild(true);
      return;
    }
    // assume child id
    if (children.some(c => c.id === t)) setActiveThread(t);
  }, [searchParams, children]);

  const greetingFor = (key: ThreadKey): Msg => {
    if (key === "father") return { role: "assistant", content: "السلام عليكم. أنا مساعدك التربوي الذكي في منصة هنا 🌿\nأخبرني عن نفسك كأب وعن همومك التربوية وأبنائك، وسأرشّح لك محتوى يناسب ما تريد بناءه فيهم أو فيك." };
    if (key === "mother") return { role: "assistant", content: "أهلاً بكِ. أنا مساعدكِ التربوي الذكي في منصة هنا 🌿\nاحكي لي عن أبنائكِ والقيم التي تريدين غرسها، وسأرشّح لكِ أفلاماً ومسلسلات ومحتوى يناسبهم بدقة." };
    const child = children.find(c => c.id === key);
    return { role: "assistant", content: `مرحباً، أنا مساعد ${child?.name ?? "الطفل"} 🌟\nسأتعرف على شخصيته وميوله من خلال حديثنا، ثم أقترح محتوى مفصّل له. ابدأ بأن تخبرني: ما الذي يحبه؟ وما الذي تريد أن يكتسبه؟` };
  };

  const messages = threadMessages[activeThread] ?? [greetingFor(activeThread)];

  const familyRoleFor = (key: ThreadKey): string => {
    if (key === "father" || key === "mother") return key;
    return "child";
  };

  const activeChildId = (): string | null => {
    if (activeThread === "father" || activeThread === "mother") return null;
    return activeThread;
  };

  const activeChildContext = (): string => {
    const child = children.find(c => c.id === activeChildId());
    if (!child) return "";
    let ctx = `سياق الطفل: الاسم ${child.name}، العمر ${child.age ?? "غير محدد"}، النوع ${child.gender === "girl" ? "بنت" : "ابن"}، الاهتمامات: ${child.interests ?? "لم تُذكر بعد"}.`;
    if (child.traits) ctx += ` صفات بارزة: ${child.traits}.`;
    if (child.assessment?.summary) ctx += ` نتائج اختبار الشخصية (٣٦ سؤالاً): ${child.assessment.summary}.`;
    return ctx;
  };

  const activeChild = children.find(c => c.id === activeChildId()) || null;
  const childAvatar = (c: Child) =>
    c.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(c.name)}&backgroundType=gradientLinear`;

  // Parse assistant text to extract structured recommendations and save
  const extractAndSave = async (text: string) => {
    if (!user) return;
    const recMatches = text.matchAll(/🎬\s*ترشيح:\s*([^\n|]+)\s*\|\s*(فيلم|مسلسل|ريل|مؤثر|برنامج)\s*\|\s*([^\n]+)/g);
    const rows = [];
    for (const m of recMatches) {
      rows.push({
        user_id: user.id,
        child_id: activeChildId(),
        family_member: familyRoleFor(activeThread),
        suggested_title: m[1].trim(),
        suggested_kind: m[2].trim(),
        reason: m[3].trim(),
      });
    }
    if (rows.length) {
      await supabase.from("recommendations").insert(rows);
      loadRecs();
    }
    // also save free-form content request markers
    const reqMatches = text.matchAll(/📝\s*طلب محتوى:?\s*([^\n]+)/g);
    for (const m of reqMatches) {
      await supabase.from("content_requests").insert({ user_id: user.id, raw_request: m[1].trim() });
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const cur = threadMessages[activeThread] ?? [greetingFor(activeThread)];
    const newMsgs: Msg[] = [...cur, { role: "user", content: text }];
    setThreadMessages(s => ({ ...s, [activeThread]: newMsgs }));
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/parental-assistant`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({
          messages: newMsgs,
          familyRole: familyRoleFor(activeThread),
          childContext: activeChildContext(),
        }),
      });
      if (!res.ok) { toast.error((await res.json()).error ?? "فشل"); setLoading(false); return; }

      const reader = res.body!.getReader();
      const dec = new TextDecoder();
      let buf = "", acc = "";
      setThreadMessages(s => ({ ...s, [activeThread]: [...newMsgs, { role: "assistant", content: "" }] }));

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const j = JSON.parse(data);
            const delta = j.choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setThreadMessages(s => {
                const arr = [...(s[activeThread] ?? [])];
                arr[arr.length - 1] = { role: "assistant", content: acc };
                return { ...s, [activeThread]: arr };
              });
            }
          } catch { /* ignore */ }
        }
      }
      await extractAndSave(acc);
      await persistThread(activeThread, [...newMsgs, { role: "assistant", content: acc }]);
    } catch {
      toast.error("خطأ في الاتصال");
    } finally { setLoading(false); }
  };

  const persistThread = async (key: ThreadKey, msgs: Msg[]) => {
    if (!user) return;
    const existingId = threadConvIds[key];
    const messagesJson = msgs as unknown as import("@/integrations/supabase/types").Json;
    if (existingId) {
      await supabase.from("assistant_conversations").update({ messages: messagesJson }).eq("id", existingId);
    } else {
      const { data } = await supabase.from("assistant_conversations").insert({
        user_id: user.id,
        messages: messagesJson,
        family_role: key === "father" || key === "mother" ? key : "child",
        child_id: key === "father" || key === "mother" ? null : key,
        title: key === "father" ? "محادثة الأب" : key === "mother" ? "محادثة الأم" : `محادثة ${children.find(c => c.id === key)?.name ?? "الطفل"}`,
      }).select("id").single();
      if (data?.id) setThreadConvIds(s => ({ ...s, [key]: data.id }));
    }
  };

  const sendSuggestion = async () => {
    if (!user) { toast.error("سجّل دخولك أولاً"); return; }
    const text = suggestion.trim();
    if (!text) { toast.error("اكتب اقتراحك"); return; }
    const role = activeThread === "father" || activeThread === "mother"
      ? activeThread
      : (children.find(c => c.id === activeThread)?.gender === "girl" ? "daughter" : "son");
    const { error } = await supabase.from("content_requests").insert({
      user_id: user.id,
      raw_request: text,
      track: "suggestion_admin",
      family_role: role,
    });
    if (error) { toast.error(error.message); return; }
    setSuggestion("");
    setOpenSuggest(false);
    toast.success("وصل اقتراحك للإدارة. شكراً لك 🌿");
  };

  const addChild = async () => {
    if (!user) { toast.error("يجب تسجيل الدخول"); return; }
    if (!newChild.name.trim()) { toast.error("الاسم مطلوب"); return; }
    const { error } = await supabase.from("children").insert({
      parent_id: user.id,
      name: newChild.name.trim(),
      age: newChild.age ? Number(newChild.age) : null,
      gender: newChild.gender,
      interests: newChild.interests || null,
    });
    if (error) { toast.error(error.message); return; }
    setOpenAddChild(false);
    setNewChild({ name: "", age: "", gender: "boy", interests: "" });
    loadChildren();
    toast.success("تمت إضافة الابن/البنت");
  };

  const threadButtons: { key: ThreadKey; label: string; icon: typeof User2; sub?: string }[] = [
    { key: "father", label: "الأب", icon: User2 },
    { key: "mother", label: "الأم", icon: UserRound },
    ...children.map(c => ({ key: c.id as ThreadKey, label: c.name, icon: Baby, sub: c.age ? `${c.age} سنة` : undefined })),
  ];

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm mb-3">
            <Sparkles className="w-4 h-4" /> المساعد التربوي الذكي
          </div>
          <h1 className="text-3xl md:text-4xl font-bold"><span className="text-gold-gradient">منظومة تربية ذكية لأسرتك</span></h1>
          <p className="text-muted-foreground mt-2 text-sm max-w-2xl mx-auto">
            شات منفصل لكل فرد: الأب، الأم، وكل طفل. نتعلّم شخصية كل واحد ونرشّح له المحتوى الأنسب من المنصة.
          </p>
        </div>

        {/* Thread tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-4 justify-center">
          {threadButtons.map(t => {
            const Icon = t.icon;
            const active = activeThread === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveThread(t.key)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition-all ${
                  active ? "bg-gradient-gold text-primary-foreground border-primary shadow-gold" : "bg-card/60 border-primary/20 text-foreground hover:border-primary/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{t.label}</span>
                {t.sub && <span className="text-[10px] opacity-75">{t.sub}</span>}
              </button>
            );
          })}
          <Dialog open={openAddChild} onOpenChange={setOpenAddChild}>
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border border-dashed border-primary/40 text-primary hover:bg-primary/10 transition">
                <Plus className="w-4 h-4" /> إضافة ابن/بنت
              </button>
            </DialogTrigger>
            <DialogContent className="bg-card max-w-md">
              <DialogHeader><DialogTitle>إضافة فرد جديد من الأسرة</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>الاسم</Label><Input value={newChild.name} onChange={e => setNewChild({ ...newChild, name: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>العمر</Label><Input type="number" value={newChild.age} onChange={e => setNewChild({ ...newChild, age: e.target.value })} /></div>
                  <div>
                    <Label>النوع</Label>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => setNewChild({ ...newChild, gender: "boy" })} className={`flex-1 py-2 rounded-lg text-sm border ${newChild.gender === "boy" ? "bg-primary/20 border-primary text-primary" : "border-primary/20"}`}>ابن</button>
                      <button onClick={() => setNewChild({ ...newChild, gender: "girl" })} className={`flex-1 py-2 rounded-lg text-sm border ${newChild.gender === "girl" ? "bg-primary/20 border-primary text-primary" : "border-primary/20"}`}>بنت</button>
                    </div>
                  </div>
                </div>
                <div><Label>الاهتمامات (اختياري)</Label><Textarea value={newChild.interests} onChange={e => setNewChild({ ...newChild, interests: e.target.value })} rows={2} placeholder="رياضة، رسم، قصص الأنبياء..." /></div>
                <Button variant="hero" className="w-full" onClick={addChild}>حفظ</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={openSuggest} onOpenChange={setOpenSuggest}>
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border border-dashed border-primary/40 text-primary hover:bg-primary/10 transition">
                <MessageSquareHeart className="w-4 h-4" /> اقتراح للإدارة
              </button>
            </DialogTrigger>
            <DialogContent className="bg-card max-w-md" dir="rtl">
              <DialogHeader><DialogTitle>تواصل مع إدارة منصة هنا</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">اكتب اقتراحك أو ملاحظتك أو محتوى تتمنى توفره. يصل مباشرة للإدارة ويُلخّص بالذكاء الاصطناعي ضمن مقترحات الجمهور.</p>
                <Textarea value={suggestion} onChange={e => setSuggestion(e.target.value)} rows={5} placeholder="مثال: أتمنى محتوى عن قصص الصحابة للأطفال 7-10 سنوات..." />
                <Button variant="hero" className="w-full" onClick={sendSuggestion}>إرسال للإدارة</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Parent profile sub-card — shown when father/mother thread active */}
        {(activeThread === "father" || activeThread === "mother") && (
          <div className="glass-card rounded-2xl p-4 mb-5 border border-primary/20">
            <div className="flex items-center gap-4 flex-wrap">
              {user ? (
                <AvatarPicker
                  kind={activeThread === "father" ? "father" : "mother"}
                  currentUrl={activeThread === "father" ? profile?.father_avatar_url : profile?.mother_avatar_url}
                  seed={user.id + activeThread}
                  label={activeThread === "father" ? "اختر صورة الأب" : "اختر صورة الأم"}
                  size="md"
                  onSelect={async (url) => {
                    const payload: { id: string; father_avatar_url?: string; mother_avatar_url?: string } = { id: user.id };
                    if (activeThread === "father") payload.father_avatar_url = url;
                    else payload.mother_avatar_url = url;
                    const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "id" });
                    if (error) { toast.error(error.message); return; }
                    await loadProfile();
                    toast.success("تم حفظ الصورة");
                  }}
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-secondary/40 border-2 border-primary/40 flex items-center justify-center text-3xl">
                  {activeThread === "father" ? "👨" : "👩"}
                </div>
              )}
              <div className="flex-1 min-w-[200px]">
                <h3 className="text-lg font-bold text-primary">
                  {activeThread === "father" ? "بروفايل الأب" : "بروفايل الأم"}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {activeThread === "father"
                    ? "محادثة خاصة بك — يتذكر المساعد همومك التربوية ويرشّح محتوى مناسباً."
                    : "محادثة خاصة بكِ — يتذكر المساعد رسالتكِ التربوية ويُخصّص الترشيحات."}
                </p>
                {!user && (
                  <p className="text-[11px] text-primary mt-2">
                    <Link to="/auth" className="hover:underline">سجّل دخولك</Link> لحفظ الصورة والمحادثة.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Child profile sub-card — shown when a child thread is active */}
        {activeChild && (
          <div className="glass-card rounded-2xl p-4 mb-5 border border-primary/20">
            <div className="flex items-start gap-4 flex-wrap">
              <AvatarPicker
                kind={activeChild.gender === "girl" ? "girl" : "boy"}
                currentUrl={activeChild.avatar_url}
                seed={activeChild.id}
                label={`اختر صورة ${activeChild.name}`}
                size="md"
                onSelect={async (url) => {
                  const { error } = await supabase.from("children").update({ avatar_url: url }).eq("id", activeChild.id);
                  if (error) { toast.error(error.message); return; }
                  await loadChildren();
                  toast.success("تم حفظ الصورة");
                }}
              />
              {/* keep layout: hidden placeholder removed — picker replaces img */}
              <div style={{ display: "none" }} aria-hidden>
                <img src={childAvatar(activeChild)} alt="" />
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-primary">{activeChild.name}</h3>
                  {activeChild.age && <span className="text-xs text-muted-foreground">{activeChild.age} سنة</span>}
                  <span className="text-xs text-muted-foreground">• {activeChild.gender === "girl" ? "بنت" : "ابن"}</span>
                  {activeChild.assessment_completed_at && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">شخصيته مفهومة ✓</span>
                  )}
                </div>
                {editingTraits ? (
                  <div className="mt-2 flex gap-2 items-start">
                    <Textarea
                      value={traitsDraft}
                      onChange={e => setTraitsDraft(e.target.value)}
                      rows={2}
                      placeholder="مثال: حنون، فضولي، يحب الرسم وكرة القدم..."
                      className="text-xs"
                    />
                    <div className="flex flex-col gap-1">
                      <Button size="sm" variant="hero" onClick={async () => {
                        const { error } = await supabase.from("children").update({ traits: traitsDraft || null }).eq("id", activeChild.id);
                        if (error) { toast.error(error.message); return; }
                        setEditingTraits(false); loadChildren(); toast.success("تم حفظ الصفات");
                      }}>حفظ</Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingTraits(false)}>إلغاء</Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-foreground/80 mt-1 leading-relaxed">
                    {activeChild.traits || activeChild.interests || "لم تُسجَّل صفات بعد. اضغط (صفاتي) لإضافتها."}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <Button size="sm" variant="hero" onClick={() => setOpenAssessment(true)}>
                  <ClipboardCheck className="w-4 h-4 ml-1.5" />
                  {activeChild.assessment_completed_at ? "إعادة الاختبار" : "إجراء الاختبار (٣٦ سؤال)"}
                </Button>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => { setTraitsDraft(activeChild.traits || ""); setEditingTraits(true); }}>
                    صفاتي
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1" disabled={!activeChild.assessment} onClick={() => setOpenResults(true)}>
                    <BarChart3 className="w-4 h-4 ml-1" /> فهم شخصيتي
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-3 text-center">
              الاختبار اختياري — يساعد المساعد التربوي على ترشيح محتوى أدق لـ{activeChild.name}.
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Chat */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-5 mb-3 min-h-[480px] max-h-[60vh] overflow-y-auto space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === "user" ? "bg-primary/20" : "bg-gradient-gold-shine"}`}>
                    {m.role === "user" ? <UserIcon className="w-4 h-4 text-primary" /> : <Sparkles className="w-4 h-4 text-primary-foreground" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 max-w-[85%] ${m.role === "user" ? "bg-primary/15 text-foreground" : "bg-secondary/60 text-foreground"}`}>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.content || "..."}</p>
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="flex gap-2">
              <Textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }}} placeholder="اكتب رسالتك..." className="resize-none" rows={2} />
              <Button variant="hero" size="lg" onClick={send} disabled={loading}><Send className="w-4 h-4" /></Button>
            </div>
            {!user && <p className="text-xs text-muted-foreground text-center mt-3">سجّل دخولك لحفظ الأبناء والترشيحات.</p>}
          </div>

          {/* Recommendations sidebar */}
          <aside className="space-y-3">
            <div className="glass-card rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <UsersIcon className="w-4 h-4 text-primary" />
                <h3 className="font-bold">ترشيحات المساعد</h3>
              </div>
              {recommendations.length === 0 ? (
                <p className="text-xs text-muted-foreground">ابدأ محادثة واطلب ترشيحاً وسيظهر هنا.</p>
              ) : (
                <ul className="space-y-3">
                  {recommendations.map(r => {
                    const summary = r.reason
                      ? (r.reason.length > 60 ? r.reason.slice(0, 58) + "…" : r.reason)
                      : "لا يوجد ملخص";
                    return (
                      <li key={r.id} className="bg-secondary/40 rounded-xl p-3 border border-primary/10">
                        <div className="flex items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-primary">{r.suggested_title}</p>
                            {r.suggested_kind && <p className="text-[10px] text-muted-foreground">{r.suggested_kind}</p>}
                          </div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition" title="تفاصيل الترشيح">
                                <Info className="w-3 h-3" />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 bg-card border border-primary/20 shadow-gold" align="end" side="left">
                              <p className="text-xs font-semibold text-primary mb-1">{r.suggested_title}</p>
                              <p className="text-[11px] text-muted-foreground leading-relaxed">
                                {r.reason || "لم يُسجَّل تفصيل لهذا الترشيح."}
                              </p>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <p className="text-xs text-foreground/70 mt-1 leading-relaxed">{summary}</p>
                      </li>
                    );
                  })}
                </ul>
              )}
              <Link to="/movies" className="block text-center text-xs text-primary mt-4 hover:underline">تصفّح المكتبة كاملة ←</Link>
            </div>
          </aside>
        </div>
      </section>

      {activeChild && (
        <ChildAssessmentDialog
          open={openAssessment}
          onOpenChange={setOpenAssessment}
          childName={activeChild.name}
          onComplete={async (result) => {
            const { error } = await supabase.from("children").update({
              assessment: result as unknown as import("@/integrations/supabase/types").Json,
              assessment_completed_at: new Date().toISOString(),
            }).eq("id", activeChild.id);
            if (error) { toast.error(error.message); return; }
            await loadChildren();
            toast.success(`تم فهم شخصية ${activeChild.name} ✓`);
          }}
        />
      )}

      {activeChild?.assessment && (
        <Dialog open={openResults} onOpenChange={setOpenResults}>
          <DialogContent className="bg-card max-w-md" dir="rtl">
            <DialogHeader><DialogTitle>شخصية {activeChild.name}</DialogTitle></DialogHeader>
            <div className="space-y-3">
              {(Object.keys(activeChild.assessment.scores) as Array<keyof typeof activeChild.assessment.scores>).map(cat => {
                const s = activeChild.assessment!.scores[cat];
                const isOpen = expandedCat === cat;
                return (
                  <div key={cat} className="rounded-lg border border-border/40 p-3 bg-secondary/20">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-medium">{CATEGORY_LABEL[cat]}</span>
                      <span className="text-primary font-bold">{s.percent}%</span>
                    </div>
                    <div className="h-2 bg-secondary/60 rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-gradient-gold" style={{ width: `${s.percent}%` }} />
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[11px] text-muted-foreground leading-relaxed flex-1">
                        {categoryBrief(cat, s.percent)}
                      </p>
                      <button
                        type="button"
                        onClick={() => setExpandedCat(isOpen ? null : cat)}
                        className="shrink-0 w-6 h-6 rounded-full bg-primary/15 hover:bg-primary/25 text-primary flex items-center justify-center text-sm leading-none transition"
                        aria-label={isOpen ? "إخفاء التفاصيل" : "عرض التفاصيل"}
                      >
                        {isOpen ? "−" : "+"}
                      </button>
                    </div>
                    {isOpen && (
                      <p className="text-[11px] text-foreground/80 leading-relaxed mt-2 pt-2 border-t border-border/30">
                        {categoryDetail(cat, s.percent)}
                      </p>
                    )}
                  </div>
                );
              })}
              <p className="text-[11px] text-muted-foreground text-center pt-2">
                هذه النتائج تُغذّي الذكاء الاصطناعي ليرشّح محتوى أنسب لـ{activeChild.name} في كل المسارات.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </SiteLayout>
  );
}
