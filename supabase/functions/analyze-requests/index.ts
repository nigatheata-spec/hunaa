import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    let track: string | null = null;
    try { const body = await req.json(); track = body?.track ?? null; } catch { /* no body */ }

    let q = supabase.from("content_requests").select("id, raw_request, family_role, track").order("created_at", { ascending: false }).limit(200);
    if (track) q = q.eq("track", track);
    const { data: requests } = await q;

    if (!requests || requests.length === 0)
      return new Response(JSON.stringify({ summary: "لا توجد طلبات بعد.", details: "", stats: {} }), { headers: { ...corsHeaders, "Content-Type": "application/json" }});

    const prompt = `حلل طلبات المحتوى التالية من جمهور منصة "هنا" وأعطني:
1. ملخص مجمل (3-4 أسطر) لمزاج الجمهور وأبرز رغباته.
2. تفصيل إحصائي: أكثر المواضيع تكراراً، الفئات المستهدفة، المسارات الأكثر طلباً، نوبات الإلحاح.
3. توصيات سريعة لفريق المحتوى.

الطلبات:
${requests.map((r, i) => `${i+1}. [${r.family_role ?? '?'} / ${r.track ?? 'عام'}] ${r.raw_request}`).join("\n")}

أعد الإجابة كـ JSON بالشكل:
{"summary": "...", "details": "...", "topTopics": [{"name":"","count":0}], "topTracks": [{"name":"","count":0}], "topRoles": [{"name":"","count":0}], "recommendations": ["",""]}`;

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${LOVABLE_API_KEY}` },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "أنت محلل بيانات للمحتوى الإعلامي. أعد JSON صالحاً فقط بدون أي نص إضافي." },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    const data = await r.json();
    const text = data.choices?.[0]?.message?.content ?? "{}";
    let parsed: unknown = {};
    try { parsed = JSON.parse(text); } catch { parsed = { summary: text }; }

    return new Response(JSON.stringify({ ...(parsed as object), total: requests.length }), { headers: { ...corsHeaders, "Content-Type": "application/json" }});
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }});
  }
});
