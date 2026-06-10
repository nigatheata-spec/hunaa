// CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Msg { role: "user" | "assistant" | "system"; content: string }

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }});

    const { messages, familyRole } = await req.json() as { messages: Msg[], familyRole?: string };

    const system = `أنت "هنا" — مساعد تربوي عربي ذكي يخاطب ${familyRole === 'mother' ? 'الأم' : familyRole === 'father' ? 'الأب' : 'ولي الأمر'} بمحبة واحترام.
مهمتك: حوار طبيعي لفهم احتياجات الأسرة من المحتوى المرئي (أفلام/مسلسلات/ريلز/برامج تعليمية).
- اسأل أسئلة قصيرة لتفهم: أعمار الأبناء، اهتماماتهم، القيم التي يريد تعزيزها، التوقيت.
- اقترح أنواع محتوى من مسارات منصة هنا الـ12 (تاريخ إسلامي، علمي، أسري، رحلات، تعليمي، وعظي، أخلاق ...).
- في نهاية كل اقتراح اذكر بوضوح "📝 طلب محتوى:" متبوعاً بسطر يلخّص ما يطلبه (موضوع/مسار/جمهور) لكي نسجّله في لوحة التحكم.
- ردّ بالعربية الفصحى السلسة، مختصراً ودافئاً.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${LOVABLE_API_KEY}` },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: system }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      const txt = await response.text();
      if (response.status === 429) return new Response(JSON.stringify({ error: "تجاوزت الحد المسموح، حاول لاحقاً" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" }});
      if (response.status === 402) return new Response(JSON.stringify({ error: "نفدت الأرصدة، الرجاء التواصل مع الإدارة" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" }});
      return new Response(JSON.stringify({ error: txt }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }});
    }

    return new Response(response.body, { headers: { ...corsHeaders, "Content-Type": "text/event-stream" }});
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }});
  }
});
