export const HunaLogo = ({ className = "", size = "default" }: { className?: string; size?: "sm" | "default" | "lg" }) => {
  const sizes = { sm: "text-xl", default: "text-2xl", lg: "text-4xl" };
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className="relative w-9 h-9 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-gold-shine opacity-90 animate-shimmer" />
        <div className="absolute inset-[2px] rounded-full bg-background" />
        <span className="relative font-serif-ar text-primary text-xl leading-none">ه</span>
      </div>
      <span className={`font-bold text-gold-gradient tracking-wide ${sizes[size]}`}>هُنا</span>
    </div>
  );
};
