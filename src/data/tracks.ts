import t01 from "@/assets/track-01.jpg";
import t02 from "@/assets/track-02.jpg";
import t03 from "@/assets/track-03.jpg";
import t04 from "@/assets/track-04.jpg";
import t05 from "@/assets/track-05.jpg";
import t06 from "@/assets/track-06.jpg";
import t07 from "@/assets/track-07.jpg";
import t08 from "@/assets/track-08.jpg";
import t09 from "@/assets/track-09.jpg";
import t10 from "@/assets/track-10.jpg";
import t11 from "@/assets/track-11.jpg";
import t12 from "@/assets/track-12.jpg";

export type TrackIdea = { title: string; tagline: string };
export type Track = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  ideas: TrackIdea[];
};

export const TRACKS: Track[] = [
  {
    id: 1, slug: "akhlaq", title: "أخلاق وسلوك", subtitle: "قالب درامي مجتمعي",
    description: "قصص تُعلّم الصدق والأمانة والإيثار من خلال مواقف حياتية مؤثرة.",
    image: t01, color: "from-rose-500/30 to-amber-500/20",
    ideas: [
      { title: "حكاية أمين", tagline: "صبيٌ صغير وأمانةٌ كبيرة" },
      { title: "ميزان القلوب", tagline: "حين يكون الصدق هو الطريق" },
      { title: "كلمة شرف", tagline: "وعدٌ لا يُكسر" },
      { title: "ظلال الحقيقة", tagline: "رحلة صبي بين الكذب والصراحة" },
      { title: "أبواب الجنة", tagline: "أعمال صغيرة بأثر عظيم" },
    ],
  },
  {
    id: 2, slug: "seerah", title: "سيرة وقصص", subtitle: "بقالب درامي مشوّق",
    description: "قصص الأنبياء والصحابة والتابعين بأسلوب سينمائي بصري قوي.",
    image: t02, color: "from-amber-500/30 to-yellow-500/20",
    ideas: [
      { title: "نور على نور", tagline: "سيرة المصطفى ﷺ بعين الطفل" },
      { title: "الفاروق", tagline: "عمر بن الخطاب بطلاً ملهماً" },
      { title: "صديق الصدّيق", tagline: "أبو بكر ودروس الوفاء" },
      { title: "قافلة الإيمان", tagline: "أصحاب الرسول في رحلة الدعوة" },
      { title: "حكايات النور", tagline: "خمس قصص من بستان النبوة" },
    ],
  },
  {
    id: 3, slug: "science", title: "علمي تجريبي", subtitle: "تجارب ومعارف",
    description: "محتوى يُحبّب العلم للطفل عبر تجارب آمنة وتفسيرات ممتعة.",
    image: t03, color: "from-cyan-500/30 to-blue-500/20",
    ideas: [
      { title: "مختبر الفضول", tagline: "أسرار العلم في دقائق" },
      { title: "علماء صغار", tagline: "خطوات تجاربك الأولى" },
      { title: "كيف يعمل؟", tagline: "اختراعات تغير حياتنا" },
      { title: "كوكب العقل", tagline: "رحلة في عجائب الفيزياء" },
      { title: "تحت المجهر", tagline: "عوالم لا تُرى بالعين" },
    ],
  },
  {
    id: 4, slug: "travel", title: "رحلات وجغرافيا", subtitle: "اكتشاف العالم",
    description: "جولات حول العالم تُعرّف الطفل بالشعوب والثقافات والتضاريس.",
    image: t04, color: "from-orange-500/30 to-red-500/20",
    ideas: [
      { title: "بوصلة المغامر", tagline: "حول العالم في حلقة" },
      { title: "أقاصي الأرض", tagline: "من القطب إلى الاستواء" },
      { title: "خرائط حية", tagline: "جغرافيا بأسلوب مشوّق" },
      { title: "رحلة ابن بطوطة", tagline: "بعيون طفل اليوم" },
      { title: "مدن وحكايات", tagline: "أسرار العواصم العربية" },
    ],
  },
  {
    id: 5, slug: "education", title: "تعليمي منهجي", subtitle: "أكاديمي مدرسي",
    description: "دعم مرئي للمناهج الدراسية بأسلوب جذّاب يثبّت المعلومة.",
    image: t05, color: "from-emerald-500/30 to-teal-500/20",
    ideas: [
      { title: "حصة ممتعة", tagline: "ملخّصات مرئية للمنهج" },
      { title: "رياضيات بلا خوف", tagline: "أرقام تنبض بالحياة" },
      { title: "لغتي الجميلة", tagline: "العربية بأسلوب جديد" },
      { title: "علوم في دقيقة", tagline: "مفهوم كل يوم" },
      { title: "قبل الامتحان", tagline: "مراجعات سريعة وذكية" },
    ],
  },
  {
    id: 6, slug: "dialogue", title: "حواري", subtitle: "نقاشات وحوارات هادفة",
    description: "حلقات حوارية تنمّي مهارات التفكير والإقناع لدى الطفل.",
    image: t06, color: "from-violet-500/30 to-purple-500/20",
    ideas: [
      { title: "صالون الصغار", tagline: "نقاشات بأذكى عقول" },
      { title: "ماذا لو؟", tagline: "أسئلة تفتح آفاقاً" },
      { title: "وجهان لرأي", tagline: "نتعلّم الاستماع قبل الحكم" },
      { title: "كرسي الفكرة", tagline: "ضيف وفكرة كل أسبوع" },
      { title: "حوار الأجيال", tagline: "بين جدّي وأنا" },
    ],
  },
  {
    id: 7, slug: "tazkiyah", title: "وعظي تزكوي", subtitle: "تربية الروح والقلب",
    description: "محتوى يُغذّي الروح ويُعلّم الطفل التعلّق بالله بأسلوب لطيف.",
    image: t07, color: "from-amber-500/30 to-orange-500/20",
    ideas: [
      { title: "همسات إيمانية", tagline: "دقائق تُنعش القلب" },
      { title: "قطرات نور", tagline: "آية وحكمة كل يوم" },
      { title: "في رحاب الله", tagline: "أسماء الله الحسنى للأطفال" },
      { title: "صلاتي حياتي", tagline: "نتعلّم خشوع الصلاة" },
      { title: "ذكر وأمان", tagline: "أذكار الصباح والمساء" },
    ],
  },
  {
    id: 8, slug: "history", title: "تاريخ إسلامي", subtitle: "حضارتنا وأمجادنا",
    description: "إحياء أمجاد الحضارة الإسلامية بأسلوب سينمائي يبعث الفخر.",
    image: t08, color: "from-yellow-500/30 to-amber-500/20",
    ideas: [
      { title: "الرسالة 2", tagline: "السيدة خديجة بنت خويلد.. أمّ المؤمنين وسند النبوة" },
      { title: "صلاح الدين", tagline: "بطل التحرير" },
      { title: "بغداد المنصور", tagline: "عاصمة الحضارة" },
      { title: "فتح القسطنطينية", tagline: "حلم تحقّق" },
      { title: "علماء غيّروا العالم", tagline: "ابن سينا، الخوارزمي، البيروني" },
    ],
  },
  {
    id: 9, slug: "family", title: "أسري درامي", subtitle: "قيم العائلة المسلمة",
    description: "دراما عائلية دافئة تُرسّخ قيم البر والتراحم والتكافل.",
    image: t09, color: "from-pink-500/30 to-rose-500/20",
    ideas: [
      { title: "بيت العائلة", tagline: "حكايات تحت سقف واحد" },
      { title: "بر الوالدين", tagline: "دروس من الواقع" },
      { title: "إخوة وأخوات", tagline: "كيف نعيش بمحبة" },
      { title: "مائدة الجمعة", tagline: "يوم العائلة المنتظر" },
      { title: "جدّي حكواتي", tagline: "حكايات الزمن الجميل" },
    ],
  },
  {
    id: 10, slug: "documentary", title: "وثائقي", subtitle: "حقائق مصورة",
    description: "أفلام وثائقية قصيرة تعرض حقائق العالم بأسلوب جذّاب وموثّق.",
    image: t10, color: "from-slate-500/30 to-zinc-500/20",
    ideas: [
      { title: "أرض الحقائق", tagline: "وثائقيات سريعة وعميقة" },
      { title: "خلف الكواليس", tagline: "كيف صُنعت الأشياء؟" },
      { title: "ذاكرة الأمة", tagline: "محطات لا تُنسى" },
      { title: "أبطال مجهولون", tagline: "قصص لم تروَ" },
      { title: "كنوز الأرض", tagline: "آثار وأسرار" },
    ],
  },
  {
    id: 11, slug: "nature", title: "مغامرات الطبيعة", subtitle: "رحلات استكشافية",
    description: "استكشاف عالم الحيوان والنبات والبيئة بصوت وصورة مذهلين.",
    image: t11, color: "from-green-500/30 to-emerald-500/20",
    ideas: [
      { title: "ملوك الغابة", tagline: "أسرار الحياة البرية" },
      { title: "أعماق المحيط", tagline: "رحلة تحت الماء" },
      { title: "كوكبنا الأخضر", tagline: "كيف نحمي الأرض؟" },
      { title: "مغامرة في الأدغال", tagline: "مع المستكشف الصغير" },
      { title: "طيور بلا حدود", tagline: "هجرة عجيبة" },
    ],
  },
  {
    id: 12, slug: "drama", title: "درامي هادف", subtitle: "روايات بصرية راقية",
    description: "دراما عميقة بقيم راقية ومعالجة بصرية تليق بطفلك.",
    image: t12, color: "from-indigo-500/30 to-blue-500/20",
    ideas: [
      { title: "ظل الحقيقة", tagline: "حكاية شجاعة" },
      { title: "الطريق", tagline: "قرارات تصنع المصير" },
      { title: "نافذة الأمل", tagline: "حين يولد النور من الظلام" },
      { title: "قلب أبيض", tagline: "نقاء يهزم الكراهية" },
      { title: "خطوات", tagline: "ثلاث حكايات.. وقصة واحدة" },
    ],
  },
];

export const getTrack = (slug: string) => TRACKS.find((t) => t.slug === slug);
