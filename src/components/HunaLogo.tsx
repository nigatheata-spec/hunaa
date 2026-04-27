import { Sparkles } from "lucide-react";

export const HunaLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-gold blur-md opacity-50" />
        <Sparkles className="relative w-7 h-7 text-primary" strokeWidth={1.5} />
      </div>
      <span className="text-2xl font-bold text-gold-gradient tracking-wide">هُنا</span>
    </div>
  );
};
