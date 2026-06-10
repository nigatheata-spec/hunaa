import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Msg { role: "user" | "assistant" | "system"; content: string }

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { messages, influencerId } = await req.json() as { messages: Msg[], influencerId: string };

    const { data: inf } = await supabase.from("influencers").select("name, system_prompt, voice_style").eq("id", influencerId).maybeSingle();
    if (!inf) return new Response(JSON.stringify({ error: "Influencer not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" }});

    const safety = `قواعد السلامة الإلزامية:
- أنت تخاطب طفلاً، استخدم لغة بسيطة محببة.
- لا تتحدث في السياسة أو الفتاوى الخلافية أو محتوى البالغين.
- إن سُئلت عن شيء غير مناسب أعد التوجيه برفق إلى قيمة جميلة.
- شجّع الفضول والقراءة والصلاة والبر بالوالدين.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${LOVABLE_API_KEY}` },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: `${inf.system_prompt}\n\n${safety}\n\nأسلوب الصوت: ${inf.voice_style ?? "دافئ ومحبب"}` },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) return new Response(JSON.stringify({ error: "حاول بعد قليل" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" }});
      if (response.status === 402) return new Response(JSON.stringify({ error: "نفدت الأرصدة" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" }});
      return new Response(JSON.stringify({ error: await response.text() }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }});
    }
    return new Response(response.body, { headers: { ...corsHeaders, "Content-Type": "text/event-stream" }});
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }});
  }
});
