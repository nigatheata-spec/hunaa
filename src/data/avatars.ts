// Default avatar set (DiceBear-generated SVG URLs — no upload needed).
// Used for parent profiles and child profiles.

export const DEFAULT_AVATARS = {
  father: [
    "https://api.dicebear.com/7.x/personas/svg?seed=Father1&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede",
    "https://api.dicebear.com/7.x/personas/svg?seed=Father2&backgroundType=gradientLinear&backgroundColor=ffd5dc,ffdfbf",
    "https://api.dicebear.com/7.x/personas/svg?seed=Father3&backgroundType=gradientLinear&backgroundColor=d1d4f9,c0aede",
    "https://api.dicebear.com/7.x/personas/svg?seed=Father4&backgroundType=gradientLinear&backgroundColor=ffdfbf,ffd5dc",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Dad1&backgroundType=gradientLinear",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Dad2&backgroundType=gradientLinear",
  ],
  mother: [
    "https://api.dicebear.com/7.x/personas/svg?seed=Mother1&backgroundType=gradientLinear&backgroundColor=ffd5dc,b6e3f4",
    "https://api.dicebear.com/7.x/personas/svg?seed=Mother2&backgroundType=gradientLinear&backgroundColor=c0aede,ffd5dc",
    "https://api.dicebear.com/7.x/personas/svg?seed=Mother3&backgroundType=gradientLinear&backgroundColor=ffdfbf,d1d4f9",
    "https://api.dicebear.com/7.x/personas/svg?seed=Mother4&backgroundType=gradientLinear&backgroundColor=b6e3f4,ffd5dc",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Mom1&backgroundType=gradientLinear",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Mom2&backgroundType=gradientLinear",
  ],
  boy: [
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Boy1&backgroundType=gradientLinear&backgroundColor=b6e3f4,c0aede",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Boy2&backgroundType=gradientLinear&backgroundColor=ffdfbf,ffd5dc",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Boy3&backgroundType=gradientLinear&backgroundColor=d1d4f9,b6e3f4",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Boy4&backgroundType=gradientLinear&backgroundColor=c0aede,ffdfbf",
    "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Boy1&backgroundType=gradientLinear",
    "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Boy2&backgroundType=gradientLinear",
  ],
  girl: [
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Girl1&backgroundType=gradientLinear&backgroundColor=ffd5dc,c0aede",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Girl2&backgroundType=gradientLinear&backgroundColor=ffdfbf,ffd5dc",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Girl3&backgroundType=gradientLinear&backgroundColor=c0aede,ffd5dc",
    "https://api.dicebear.com/7.x/adventurer/svg?seed=Girl4&backgroundType=gradientLinear&backgroundColor=b6e3f4,ffd5dc",
    "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Girl1&backgroundType=gradientLinear",
    "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Girl2&backgroundType=gradientLinear",
  ],
} as const;

export type AvatarKind = keyof typeof DEFAULT_AVATARS;

export const defaultAvatarFor = (kind: AvatarKind, seed: string) => {
  const list = DEFAULT_AVATARS[kind];
  // deterministic pick from seed
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return list[Math.abs(h) % list.length];
};
