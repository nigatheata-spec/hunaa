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

    const { messages, familyRole, childContext } = await req.json() as { messages: Msg[], familyRole?: string, childContext?: string };

    const audience =
      familyRole === "mother" ? "الأم" :
      familyRole === "father" ? "الأب" :
      familyRole === "child" ? "الطفل/الطفلة عبر وليّ أمره" :
      "ولي الأمر";

    const system = `أنت "هنا" — المساعد التربوي الذكي في منصة هنا. تخاطب ${audience} بمحبة واحترام وحكمة.

${childContext ? `\n${childContext}\n` : ""}

مهامك:
1. حوار طبيعي قصير لفهم: المشكلة التربوية أو الصفة التي يريد بناءها لنفسه أو لأبنائه، الأعمار، الميول، التوقيت.
2. ترشيح محتوى دقيق من منصة "هنا" (أفلام، مسلسلات، ريلز، مؤثرون، برامج) يعالج المشكلة أو يبني الصفة المطلوبة.
3. عند كل ترشيح، استخدم هذا التنسيق المنظم في سطر مستقل بالضبط:
   🎬 ترشيح: <اسم العمل> | <فيلم/مسلسل/ريل/مؤثر/برنامج> | <سبب الترشيح بجملة قصيرة تربط بالصفة أو المشكلة>
4. إذا لم يوجد محتوى مناسب على المنصة، اقترحه كطلب جديد بهذا التنسيق:
   📝 طلب محتوى: <وصف ما يحتاجه المستخدم>

أسلوبك:
- العربية الفصحى السلسة، دافئ ومختصر.
- لا تذكر كلمة "استشارة"؛ أنت مساعد تربوي ذكي يوصل المستخدم بمحتوى المنصة.
- لا تكرر التنسيقات إلا حين تنطبق فعلاً.`;

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
