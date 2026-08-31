import logoImg from "@/assets/hunaa-logo.png";

export const HunaLogo = ({ className = "", size = "default" }: { className?: string; size?: "sm" | "default" | "lg" }) => {
  const sizes = { sm: "h-6", default: "h-8", lg: "h-12" };
  return (
    <img src={logoImg} alt="Hunaa" className={`${sizes[size]} w-auto ${className}`} />
  );
};
