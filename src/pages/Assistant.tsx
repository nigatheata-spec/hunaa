import { useState, useRef, useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, User as UserIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Msg { role: "user" | "assistant"; content: string }

export default function Assistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "السلام عليكم، أنا مساعدك التربوي في منصة هنا. أخبرني عن أبنائك واهتماماتك، وسأقترح لك محتوى مناسباً ونسجّل احتياجاتك لإثراء المنصة 🌿" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // Extract content request markers and save
  const extractRequests = async (text: string) => {
    if (!user) return;
    const lines = text.split("\n").filter(l => l.includes("📝") || l.toLowerCase().includes("طلب محتوى"));
    for (const line of lines) {
      const clean = line.replace(/📝\s*طلب محتوى:?/g, "").trim();
      if (clean.length > 5) {
        await supabase.from("content_requests").insert({
          user_id: user.id,
          raw_request: clean,
        });
      }
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const newMsgs: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/parental-assistant`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ messages: newMsgs }),
      });

      if (!res.ok) { toast.error((await res.json()).error ?? "فشل"); setLoading(false); return; }

      const reader = res.body!.getReader();
      const dec = new TextDecoder();
      let buf = "", acc = "";
      setMessages(m => [...m, { role: "assistant", content: "" }]);

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
              setMessages(m => { const c = [...m]; c[c.length - 1] = { role: "assistant", content: acc }; return c; });
            }
          } catch { /* ignore */ }
        }
      }
      await extractRequests(acc);
    } catch (e) {
      toast.error("خطأ في الاتصال");
    } finally { setLoading(false); }
  };

  return (
    <SiteLayout>
      <section className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm mb-3">
            <Sparkles className="w-4 h-4" /> مساعد تربوي ذكي
          </div>
          <h1 className="text-3xl md:text-4xl font-bold"><span className="text-gold-gradient">حوار مع هنا</span></h1>
          <p className="text-muted-foreground mt-2 text-sm">احكِ لنا ما تريد، ونحن نوصلك بمحتواك ونحفظ احتياجاتك في لوحة التحكم.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-4 min-h-[500px] max-h-[60vh] overflow-y-auto space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === "user" ? "bg-primary/20" : "bg-gradient-gold-shine"}`}>
                {m.role === "user" ? <UserIcon className="w-4 h-4 text-primary" /> : <span className="text-primary-foreground font-serif-ar">ه</span>}
              </div>
              <div className={`rounded-2xl px-4 py-3 max-w-[80%] ${m.role === "user" ? "bg-primary/15 text-foreground" : "bg-secondary/60 text-foreground"}`}>
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
        {!user && <p className="text-xs text-muted-foreground text-center mt-3">سجّل دخولك لحفظ طلباتك في لوحة التحكم.</p>}
      </section>
    </SiteLayout>
  );
}
