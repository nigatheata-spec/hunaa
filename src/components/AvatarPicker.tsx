import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Check } from "lucide-react";
import { DEFAULT_AVATARS, type AvatarKind, defaultAvatarFor } from "@/data/avatars";

interface Props {
  kind: AvatarKind;
  currentUrl?: string | null;
  seed: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  onSelect: (url: string) => Promise<void> | void;
}

export const AvatarPicker = ({ kind, currentUrl, seed, label, size = "md", onSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const sizes = { sm: "w-12 h-12", md: "w-20 h-20", lg: "w-24 h-24" };
  const shown = currentUrl || defaultAvatarFor(kind, seed);

  const handlePick = async (url: string) => {
    setSaving(true);
    try {
      await onSelect(url);
      setOpen(false);
    } finally { setSaving(false); }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`relative group ${sizes[size]} rounded-full border-2 border-primary/40 hover:border-primary shadow-gold bg-secondary/40 overflow-hidden transition`}
          aria-label="تغيير الصورة الشخصية"
        >
          <img src={shown} alt="" className="w-full h-full object-cover" />
          <span className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <Camera className="w-4 h-4 text-primary" />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-card max-w-md" dir="rtl">
        <DialogHeader><DialogTitle>{label || "اختر صورة شخصية"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">
            اختر من الصور الافتراضية الجاهزة، أو ألصق رابط صورتك الخاصة.
          </p>

          <div className="grid grid-cols-3 gap-3">
            {DEFAULT_AVATARS[kind].map((url) => {
              const isActive = url === currentUrl;
              return (
                <button
                  key={url}
                  type="button"
                  disabled={saving}
                  onClick={() => handlePick(url)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition hover:scale-105 ${
                    isActive ? "border-primary shadow-gold" : "border-border/40 hover:border-primary/60"
                  }`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover bg-secondary/40" />
                  {isActive && (
                    <span className="absolute top-1 left-1 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-border/40">
            <Label className="text-xs">أو رابط صورة مخصصة</Label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="https://..."
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                size="sm"
                variant="hero"
                disabled={!customUrl.trim() || saving}
                onClick={() => handlePick(customUrl.trim())}
              >
                حفظ
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
