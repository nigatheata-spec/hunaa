// 36 سؤال مستوحاة من مقاييس عالمية للأطفال (Big Five for kids, SDQ, Multiple Intelligences, Physical Literacy)
// 12 سؤال لكل محور. كل سؤال سلم ليكرت من 1 (أبداً) إلى 5 (دائماً).

export type AssessmentCategory = "skills" | "physical" | "behavior";

export interface AssessmentQuestion {
  id: string;
  category: AssessmentCategory;
  text: string;
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // ── المهارات والذكاءات (Multiple Intelligences / Cognitive) ──
  { id: "s1",  category: "skills", text: "يحب طفلك حلّ الألغاز والمسائل المنطقية." },
  { id: "s2",  category: "skills", text: "يعبّر عن أفكاره بسهولة بالكلام أو الكتابة." },
  { id: "s3",  category: "skills", text: "يستمتع بالرسم أو التصميم أو الأعمال اليدوية." },
  { id: "s4",  category: "skills", text: "يحفظ الأناشيد والإيقاعات بسرعة." },
  { id: "s5",  category: "skills", text: "يطرح أسئلة عميقة عن سبب الأشياء." },
  { id: "s6",  category: "skills", text: "يحب اكتشاف الطبيعة والحيوانات والنباتات." },
  { id: "s7",  category: "skills", text: "يتعلّم من خلال القصص والروايات أكثر من التلقين." },
  { id: "s8",  category: "skills", text: "يستخدم التكنولوجيا بشكل مستقل وذكي." },
  { id: "s9",  category: "skills", text: "يبتكر ألعاباً أو قصصاً من خياله." },
  { id: "s10", category: "skills", text: "يركّز طويلاً على ما يحبه دون ملل." },
  { id: "s11", category: "skills", text: "يتعلّم بسرعة من المحاولة والخطأ." },
  { id: "s12", category: "skills", text: "يحب القراءة أو الاستماع للكتب." },

  // ── القدرات الجسمانية (Physical Literacy) ──
  { id: "p1",  category: "physical", text: "يتمتع بطاقة بدنية عالية ويحب الحركة." },
  { id: "p2",  category: "physical", text: "يجيد التوازن (الجري، القفز، ركوب الدراجة...)." },
  { id: "p3",  category: "physical", text: "يحب الرياضة أو الألعاب الجماعية." },
  { id: "p4",  category: "physical", text: "يستخدم يديه بدقة (كتابة، فك وتركيب...)." },
  { id: "p5",  category: "physical", text: "ينام عدد ساعات كافٍ بانتظام." },
  { id: "p6",  category: "physical", text: "يأكل وجبات متنوعة دون صعوبة." },
  { id: "p7",  category: "physical", text: "يتحمّل المجهود البدني دون تعب سريع." },
  { id: "p8",  category: "physical", text: "ينسّق حركاته بشكل جيد (رقص، رياضة، إيقاع)." },
  { id: "p9",  category: "physical", text: "يحب الأنشطة الخارجية أكثر من الجلوس." },
  { id: "p10", category: "physical", text: "يتعامل مع المخاطر الجسدية بحذر مناسب." },
  { id: "p11", category: "physical", text: "يهتم بنظافته الشخصية ومظهره." },
  { id: "p12", category: "physical", text: "يستجيب جسده بشكل طبيعي للتعليمات (يمين/يسار، توقّف...)." },

  // ── السلوك والقيم (SDQ + Big Five for kids) ──
  { id: "b1",  category: "behavior", text: "يتعاطف مع مشاعر الآخرين ويواسيهم." },
  { id: "b2",  category: "behavior", text: "يلتزم بالقواعد المتفق عليها في البيت." },
  { id: "b3",  category: "behavior", text: "يتحكم في غضبه دون عنف." },
  { id: "b4",  category: "behavior", text: "صادق حتى عندما يخطئ." },
  { id: "b5",  category: "behavior", text: "يكوّن صداقات بسهولة." },
  { id: "b6",  category: "behavior", text: "يساعد في أعمال المنزل دون طلب متكرر." },
  { id: "b7",  category: "behavior", text: "يحافظ على عبادته (صلاة، ذكر، قراءة قرآن) بحسب عمره." },
  { id: "b8",  category: "behavior", text: "يحترم الكبار ويخاطبهم بأدب." },
  { id: "b9",  category: "behavior", text: "يتقبّل الخسارة في الألعاب دون انهيار." },
  { id: "b10", category: "behavior", text: "يبادر بحل المشكلات بدل الشكوى." },
  { id: "b11", category: "behavior", text: "يقاوم إغراء المحتوى غير المناسب على الشاشات." },
  { id: "b12", category: "behavior", text: "يعبّر عن مشاعره بدل كتمها." },
];

export const CATEGORY_LABEL: Record<AssessmentCategory, string> = {
  skills: "المهارات والذكاءات",
  physical: "القدرات الجسمانية",
  behavior: "السلوك والقيم",
};

export interface AssessmentResult {
  answers: Record<string, number>;
  scores: Record<AssessmentCategory, { raw: number; max: number; percent: number }>;
  summary: string;
}

export function scoreAssessment(answers: Record<string, number>): AssessmentResult {
  const cats: AssessmentCategory[] = ["skills", "physical", "behavior"];
  const scores = {} as AssessmentResult["scores"];
  cats.forEach(c => {
    const qs = ASSESSMENT_QUESTIONS.filter(q => q.category === c);
    const raw = qs.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    const max = qs.length * 5;
    scores[c] = { raw, max, percent: Math.round((raw / max) * 100) };
  });
  const summary = cats
    .map(c => `${CATEGORY_LABEL[c]}: ${scores[c].percent}%`)
    .join(" | ");
  return { answers, scores, summary };
}

// شرح مختصر + تفصيل لكل محور بحسب مستوى النسبة
export function categoryBrief(cat: AssessmentCategory, percent: number): string {
  const level = percent >= 75 ? "high" : percent >= 50 ? "mid" : "low";
  const map: Record<AssessmentCategory, Record<string, string>> = {
    skills: {
      high: "ذكاء وفضول عاليان وقدرة على التعلّم السريع.",
      mid: "مهارات جيدة تحتاج تحفيزاً مستمراً.",
      low: "يحتاج إلى تنشيط الفضول والمهارات المعرفية.",
    },
    physical: {
      high: "طاقة بدنية ممتازة وتناسق حركي عالٍ.",
      mid: "نشاط جسماني متوسط، قابل للتطوير.",
      low: "يحتاج إلى تشجيع على الحركة والرياضة.",
    },
    behavior: {
      high: "سلوك ناضج، تعاطف والتزام بالقيم.",
      mid: "سلوك متّزن مع بعض النقاط القابلة للتحسين.",
      low: "يحتاج إلى دعم في الانضباط والتواصل العاطفي.",
    },
  };
  return map[cat][level];
}

export function categoryDetail(cat: AssessmentCategory, percent: number): string {
  const level = percent >= 75 ? "high" : percent >= 50 ? "mid" : "low";
  const map: Record<AssessmentCategory, Record<string, string>> = {
    skills: {
      high: "طفلك يُظهر فضولاً معرفياً واضحاً وقدرة على التركيز والابتكار. رشّح له محتوى يثير التفكير: وثائقيات علمية، قصص اكتشاف، تحديات منطقية، ومحتوى يدفعه للسؤال والتجريب.",
      mid: "لدى طفلك أساس جيد من المهارات الذهنية لكنه يحتاج محفّزاً منتظماً. قدّم له قصصاً بطلها فضولي، ومحتوى يمزج المتعة بالمعلومة، وأنشطة عملية خفيفة بعد المشاهدة.",
      low: "قد يحتاج طفلك وقتاً أطول للانخراط في المحتوى المعرفي. ابدأ بقصص قصيرة جذّابة بصرياً، شخصيات محبوبة، ومحتوى تفاعلي بسيط يبني ثقته في قدراته العقلية تدريجياً.",
    },
    physical: {
      high: "طفلك يمتلك طاقة عالية ويحتاج تفريغها بإيجاب. رشّح له محتوى رياضي وملهم، قصص أبطال رياضيين، وتحديات حركية يمكنه تجربتها بعد المشاهدة.",
      mid: "نشاطه الجسماني متوسط؛ ساعده على تطويره بقصص ملهمة عن المغامرة والاكتشاف، ومحتوى عن صحة الجسد والغذاء والنوم بأسلوب ممتع.",
      low: "قد يميل طفلك إلى الجلوس الطويل. اعرض عليه محتوى يحفّز الحركة (شخصيات نشِطة، رياضات ممتعة، رحلات في الطبيعة) مع تشجيعه على دقائق نشاط بعد كل حلقة.",
    },
    behavior: {
      high: "سلوكه ناضج ومتعاطف. رشّح له محتوى يعمّق القيم: قصص قيادة، نماذج أخلاقية، ومحتوى عن خدمة المجتمع والإيمان، فهو جاهز لاستيعاب رسائل عميقة.",
      mid: "يحتاج إلى تعزيز قيم محددة (التحكم بالغضب، الصدق، التعاون...). اختر له قصصاً يواجه أبطالها مواقف مشابهة ويتعلّمون منها، وناقشه فيها بعد المشاهدة.",
      low: "قد يحتاج طفلك إلى دعم سلوكي وعاطفي. ابدأ بمحتوى عن المشاعر وتسميتها، قصص الصداقة والتسامح، وتجنّب المحتوى العنيف أو السلبي تماماً في هذه المرحلة.",
    },
  };
  return map[cat][level];
}
