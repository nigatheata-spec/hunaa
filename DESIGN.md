# Hunaa Design System

## Color Palette

### Achromatic Foundation
- **Background**: `oklch(5% 0.01 250°)` — deep charcoal with slight cool tint
- **Card**: `oklch(8% 0.01 250°)` — lighter charcoal for layering
- **Foreground**: `oklch(92% 0.01 60°)` — warm off-white (tinted toward brand gold)

### Gold System (Primary)
- **Primary**: `oklch(55% 0.22 60°)` — saturated brand gold (primary actions, accents)
- **Primary Deep**: `oklch(40% 0.20 50°)` — darker gold (hover, depth)
- **Primary Glow**: `oklch(65% 0.25 60°)` — bright gold (highlights, focus)

### Semantic
- **Destructive**: `oklch(50% 0.20 15°)` — muted red (errors, danger)
- **Muted**: `oklch(14% 0.01 250°)` — secondary text, disabled states
- **Border**: `oklch(18% 0.02 50°)` — subtle gold-tinted dividers

## Typography

### Font Stack
- **Heading**: Cairo (300, 400, 600, 700, 900)
- **Body**: Cairo (300, 400, 600, 700)
- **Serif (Arabic poetry/quotes)**: Amiri (400, 700)

### Scale & Hierarchy
- **Display**: 2.5rem, weight 700 (hero titles, main CTAs)
- **Heading 1**: 2rem, weight 700 (page titles)
- **Heading 2**: 1.5rem, weight 600 (section headers)
- **Body**: 1rem, weight 400 (default copy, 65–75ch max-width)
- **Caption**: 0.875rem, weight 400 (secondary labels, timestamps)

## Layout & Spacing

### Rhythm
- **Base unit**: 1rem (16px)
- **Scale**: 0.5, 1, 1.5, 2, 3, 4rem (varied for visual rhythm, never uniform)
- **Container max-width**: None (full-bleed for hero and content sections; use padding instead)
- **RTL by default**: All spacing, alignment, and gesture flows from right-to-left

### Grid & Alignment
- **Navbar**: full-width sticky, centered icon/logo, RTL flex
- **Hero**: full-viewport, layered background imagery with ken-burns animation
- **Content sections**: padding-based rhythm, never hard containers
- **Bottom nav**: 5-icon fixed tab bar (mobile-first)

## Components & Patterns

### Ornamental System
- **Arabesque Dividers**: Radial gradients (gold), centered text, used sparingly to separate major sections
- **Arch/Gateway Frames**: Used in hero imagery and modals—visual metaphor for entry/transformation
- **Border Gradients**: Applied to special cards and CTAs—gold fades to transparent at edges

### Interactive Elements
- **Buttons**: Two variants
  - `variant="hero"`: Gold background (`--primary`), dark text, full-width or inline
  - `variant="outlineGold"`: Gold border + text, transparent background, hover fills with muted gold
- **Cards**: Glass-morphic (subtle backdrop blur, semi-transparent bg, gold border thin)
- **Focus States**: Gold glow (`--primary-glow`) on interactive elements
- **Hover**: Slightly lighter/deeper gold depending on context

### Motion
- **Ken-Burns animation**: Hero imagery (subtle scale + translate, 20s ease-out)
- **Fade-Up**: Content reveals (0.8s ease-out)
- **Shimmer**: Data loading states
- **Transition Smooth**: Default easing for interactive states (0.4s cubic-bezier)

## Color Strategy

**Committed**: One saturated color (gold) carries 30–40% of the UI intentionally. Dark background ensures gold reads as premium, not decorative. Arabesque patterns and ornamental borders reinforce cultural identity; they're not AI slop.

## Thematic Principle

**Dark by Circumstance**: Users engage during evening leisure, on mobile, in relaxed settings. Dark theme is not reflexive; it's motivated by usage context (evening content consumption, reduced eye strain, premium feel, cinematic mood).

---

## Enhancement Opportunities

1. **Typography Hierarchy**: Increase weight contrast between heading levels (e.g., H1 700 → H2 600 → body 400 creates clearer visual jumps)
2. **Spacing Rhythm**: Vary padding/margin ratios per section to reduce monotony (hero: generous, cards: moderate, navigation: tight)
3. **Color Depth**: Introduce secondary gold accent (`oklch(50% 0.18 70°)` — warmer, earthier) for supporting UI elements (tags, badges, secondary CTAs)
4. **Ornamental Integration**: Expand arabesque pattern usage to card backgrounds, section headers, and accent lines (subtle opacity)
5. **Motion Layers**: Add micro-interactions (button press feedback, scroll-linked animations on hero, staggered list item reveals)
6. **Component Elevation**: Use shadow system more deliberately (gold-tinted shadows for depth, card elevation on hover/focus)
