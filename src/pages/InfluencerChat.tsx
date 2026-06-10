import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Msg { role: "user" | "assistant"; content: string }
interface Inf { id: string; name: string; tagline: string | null; avatar_url: string | null }

export default function InfluencerChat() {
  const { id } = useParams();
  const [inf, setInf] = useState<Inf | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    supabase.from("influencers").select("id, name, tagline, avatar_url").eq("id", id).maybeSingle().then(({ data }) => {
      setInf(data as Inf | null);
      if (data) setMessages([{ role: "assistant", content: `أهلاً بك يا صديقي! أنا ${data.name}. كيف يمكنني مساعدتك اليوم؟ 🌟` }]);
    });
  }, [id]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading || !id) return;
    const newMsgs: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/influencer-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ messages: newMsgs, influencerId: id }),
      });
      if (!res.ok) { toast.error("تعذّر الإرسال"); setLoading(false); return; }
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
            if (delta) { acc += delta; setMessages(m => { const c = [...m]; c[c.length - 1] = { role: "assistant", content: acc }; return c; }); }
          } catch { /* ignore */ }
        }
      }
    } finally { setLoading(false); }
  };

  if (!inf) return <SiteLayout><div className="container py-32 text-center text-muted-foreground">جاري التحميل...</div></SiteLayout>;

  return (
    <SiteLayout>
      <section className="container mx-auto px-6 py-12 max-w-3xl">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-gold-shine p-1 mb-4">
            <div className="w-full h-full rounded-full bg-card overflow-hidden flex items-center justify-center">
              {inf.avatar_url ? <img src={inf.avatar_url} alt={inf.name} className="w-full h-full object-cover" /> : <span className="text-4xl font-serif-ar text-primary">{inf.name[0]}</span>}
            </div>
          </div>
          <h1 className="text-3xl font-bold"><span className="text-gold-gradient">{inf.name}</span></h1>
          {inf.tagline && <p className="text-muted-foreground text-sm mt-1">{inf.tagline}</p>}
        </div>

        <div className="glass-card rounded-2xl p-6 mb-4 min-h-[400px] max-h-[55vh] overflow-y-auto space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
              <div className={`rounded-2xl px-4 py-3 max-w-[80%] text-sm leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "bg-primary/15" : "bg-secondary/60"}`}>{m.content || "..."}</div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="flex gap-2">
          <Textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }}} placeholder="اكتب رسالتك..." rows={2} className="resize-none" />
          <Button variant="hero" size="lg" onClick={send} disabled={loading}><Send className="w-4 h-4" /></Button>
        </div>
      </section>
    </SiteLayout>
  );
}
