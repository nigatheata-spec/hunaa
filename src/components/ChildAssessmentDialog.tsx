import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ASSESSMENT_QUESTIONS, CATEGORY_LABEL, scoreAssessment, type AssessmentResult } from "@/data/childAssessment";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const LIKERT = [
  { v: 1, label: "أبداً" },
  { v: 2, label: "نادراً" },
  { v: 3, label: "أحياناً" },
  { v: 4, label: "غالباً" },
  { v: 5, label: "دائماً" },
];

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  childName: string;
  onComplete: (result: AssessmentResult) => void | Promise<void>;
}

export function ChildAssessmentDialog({ open, onOpenChange, childName, onComplete }: Props) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const q = ASSESSMENT_QUESTIONS[idx];
  const total = ASSESSMENT_QUESTIONS.length;
  const progress = ((idx + 1) / total) * 100;
  const canNext = !!answers[q.id];

  const pick = (v: number) => {
    setAnswers(a => ({ ...a, [q.id]: v }));
    if (idx < total - 1) setTimeout(() => setIdx(i => i + 1), 150);
  };

  const submit = async () => {
    setSubmitting(true);
    const result = scoreAssessment(answers);
    await onComplete(result);
    setSubmitting(false);
    setIdx(0);
    setAnswers({});
    onOpenChange(false);
  };

  const reset = () => { setIdx(0); setAnswers({}); };
  const isLast = idx === total - 1;
  const allAnswered = useMemo(() => ASSESSMENT_QUESTIONS.every(qq => answers[qq.id]), [answers]);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="bg-card max-w-xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            اختبار شخصية {childName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{CATEGORY_LABEL[q.category]}</span>
            <span>{idx + 1} / {total}</span>
          </div>
          <Progress value={progress} className="h-1.5" />

          <div className="bg-secondary/40 rounded-2xl p-5 min-h-[120px] flex items-center justify-center text-center">
            <p className="text-base font-medium leading-relaxed">{q.text}</p>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {LIKERT.map(opt => {
              const sel = answers[q.id] === opt.v;
              return (
                <button
                  key={opt.v}
                  onClick={() => pick(opt.v)}
                  className={`py-3 rounded-lg text-xs border transition-all ${
                    sel ? "bg-gradient-gold text-primary-foreground border-primary shadow-gold" : "border-primary/20 hover:border-primary/50"
                  }`}
                >
                  <div className="font-bold">{opt.v}</div>
                  <div className="opacity-80 mt-0.5">{opt.label}</div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0}>
              <ChevronRight className="w-4 h-4 ml-1" /> السابق
            </Button>
            {isLast ? (
              <Button variant="hero" size="sm" onClick={submit} disabled={!allAnswered || submitting}>
                {submitting ? "جارٍ الحفظ..." : "حفظ النتيجة"}
              </Button>
            ) : (
              <Button variant="hero" size="sm" onClick={() => setIdx(i => Math.min(total - 1, i + 1))} disabled={!canNext}>
                التالي <ChevronLeft className="w-4 h-4 mr-1" />
              </Button>
            )}
          </div>

          <p className="text-[10px] text-muted-foreground text-center">
            الاختبار اختياري ومستوحى من مقاييس عالمية للأطفال. النتائج تساعد الذكاء الاصطناعي في ترشيح محتوى أنسب.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
