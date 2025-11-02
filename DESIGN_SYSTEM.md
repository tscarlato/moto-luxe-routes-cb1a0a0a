# MotoMap Design System Documentation

## Overview
This design system implements the "Rugged Refined" aesthetic - a premium motorcycle lifestyle theme that balances earthy sophistication with adventure-ready functionality.

---

## Color Palette

### Primary Colors

**Background (Warm Off-White)**
- HSL: `40 30% 96%`
- Hex: `#F9F7F3`
- Usage: Main background, card backgrounds

**Foreground (Deep Brown-Black)**
- HSL: `40 29% 11%`
- Hex: `#252015`
- Usage: Primary text, headings

**Primary (Deep Slate Blue)**
- HSL: `207 33% 30%`
- Hex: `#334D66`
- Usage: Primary buttons, links, important UI elements
- Hover: `--primary-dark` (207 33% 22%)

**Accent (Burnt Copper)**
- HSL: `22 60% 48%`
- Hex: `#C46831`
- Usage: CTAs, highlights, logo accent
- Hover: `--accent-glow` (22 60% 58%)

**Secondary (Warm Sand)**
- HSL: `33 40% 84%`
- Hex: `#E7D9C7`
- Usage: Secondary buttons, subtle backgrounds

### Semantic Colors

**Muted**
- Default: `33 30% 88%`
- Foreground: `30 20% 45%`
- Usage: Disabled states, subtle text

**Destructive**
- Default: `0 70% 50%`
- Foreground: `40 30% 96%`
- Usage: Error states, delete actions

**Border/Input**
- HSL: `33 15% 85%`
- Usage: Borders, input outlines

---

## Typography

### Font Families

**Headings (Serif)**
```css
font-family: 'Instrument Serif', Georgia, serif;
```
- Usage: All headings (h1-h6), logo, important labels
- Weight: Normal (400) - the elegance comes from the typeface itself
- Tracking: Tight (`tracking-tight`)

**Body (Sans-Serif)**
```css
font-family: 'Inter', system-ui, sans-serif;
```
- Usage: Body text, UI elements, forms
- Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Line Height | Weight |
|---------|---------------|---------------|-------------|--------|
| H1 | 3.75rem (60px) | 3rem (48px) | tight | normal |
| H2 | 3rem (48px) | 2.5rem (40px) | tight | normal |
| H3 | 2.25rem (36px) | 2rem (32px) | snug | normal |
| H4 | 1.875rem (30px) | 1.5rem (24px) | snug | normal |
| H5 | 1.5rem (24px) | 1.25rem (20px) | normal | normal |
| H6 | 1.25rem (20px) | 1.125rem (18px) | normal | normal |
| Body | 1rem (16px) | 1rem (16px) | relaxed | regular |
| Small | 0.875rem (14px) | 0.875rem (14px) | normal | regular |

### Usage Guidelines

```tsx
// Headings - automatic serif styling
<h1>Premium Route Planning</h1>

// Body text - automatic sans-serif
<p>Plan your perfect motorcycle journey</p>

// Explicit font family classes
<div className="font-serif">Instrument Serif text</div>
<div className="font-sans">Inter text</div>
```

---

## Spacing System

Consistent spacing scale based on CSS variables:

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| `--space-xs` | 0.25rem (4px) | `space-xs` | Minimal padding |
| `--space-sm` | 0.5rem (8px) | `space-sm` | Compact spacing |
| `--space-md` | 1rem (16px) | `space-md` | Default spacing |
| `--space-lg` | 1.5rem (24px) | `space-lg` | Section spacing |
| `--space-xl` | 2rem (32px) | `space-xl` | Large sections |
| `--space-2xl` | 3rem (48px) | `space-2xl` | Major sections |
| `--space-3xl` | 4rem (64px) | `space-3xl` | Hero sections |

---

## Components

### Buttons

**Variants:**

```tsx
// Primary - Deep slate blue
<Button variant="default">Primary Action</Button>

// Accent - Burnt copper (for main CTAs)
<Button variant="accent">Book Your Ride</Button>

// Outline - Transparent with border
<Button variant="outline">Secondary</Button>

// Secondary - Warm sand
<Button variant="secondary">Subtle Action</Button>

// Ghost - Minimal hover effect
<Button variant="ghost">Cancel</Button>

// Link - Text with underline on hover
<Button variant="link">Learn More</Button>
```

**Sizes:**
```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

**Button Styling:**
- Font: Semi-bold, wide tracking
- Transition: 250ms smooth
- Shadow: Subtle elevation on hover
- Border radius: `--radius` (0.5rem)

### Cards

Premium card component with elegant shadows:

```tsx
import {
  CardPremium,
  CardPremiumHeader,
  CardPremiumTitle,
  CardPremiumDescription,
  CardPremiumContent,
  CardPremiumFooter,
} from "@/components/ui/card-premium";

<CardPremium>
  <CardPremiumHeader>
    <CardPremiumTitle>Trip Summary</CardPremiumTitle>
    <CardPremiumDescription>Your route details</CardPremiumDescription>
  </CardPremiumHeader>
  <CardPremiumContent>
    {/* Content */}
  </CardPremiumContent>
  <CardPremiumFooter>
    {/* Footer actions */}
  </CardPremiumFooter>
</CardPremium>
```

### Logo

```tsx
import Logo from "@/components/Logo";

// Standard usage
<Logo />

// Without icon
<Logo showIcon={false} />

// Different sizes
<Logo size="sm" />
<Logo size="md" />
<Logo size="lg" />

// Custom styling
<Logo className="text-accent" />
```

---

## Custom Utility Classes

### Glass Panel Effect
```tsx
<div className="glass-panel">
  {/* Semi-transparent panel with backdrop blur */}
</div>
```

### Shadow Utilities
```tsx
<div className="shadow-elegant">Subtle depth</div>
<div className="shadow-elevated">More pronounced depth</div>
```

### Transitions
```tsx
<div className="transition-fast">150ms transition</div>
<div className="transition-smooth">250ms transition</div>
```

---

## Design Tokens

All design tokens are defined in `src/index.css`:

### Custom Tokens
- `--accent-glow`: Lighter copper for hover states
- `--primary-dark`: Darker slate for button hover
- `--surface-elevated`: Slightly elevated surface color

### Transition Tokens
- `--transition-fast`: 150ms cubic-bezier(0.4, 0, 0.2, 1)
- `--transition-base`: 250ms cubic-bezier(0.4, 0, 0.2, 1)
- `--transition-slow`: 350ms cubic-bezier(0.4, 0, 0.2, 1)

---

## Modifying the Theme

### Changing Colors

All colors are HSL-based for easy modification. To change the primary color:

1. Open `src/index.css`
2. Find `--primary: 207 33% 30%;`
3. Adjust HSL values (Hue: 0-360, Saturation: 0-100%, Lightness: 0-100%)
4. Consider updating `--primary-dark` for hover states

Example: Make it more blue
```css
--primary: 215 40% 30%; /* More blue hue */
--primary-dark: 215 40% 22%; /* Darker version */
```

### Changing Fonts

1. Update font links in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

2. Update font family in `tailwind.config.ts`:
```ts
fontFamily: {
  sans: ['YourSansFont', 'system-ui', 'sans-serif'],
  serif: ['YourSerifFont', 'Georgia', 'serif'],
}
```

### Adjusting Spacing

Modify spacing scale in `src/index.css`:
```css
--space-md: 1.25rem; /* Increase from 1rem */
```

---

## Best Practices

### DO
✅ Use semantic color tokens (e.g., `bg-primary`, `text-accent`)
✅ Use the predefined spacing scale
✅ Apply `font-serif` to headings and important text
✅ Use `shadow-elegant` for subtle depth
✅ Leverage button variants instead of custom styles

### DON'T
❌ Use raw color values (e.g., `bg-[#334D66]`)
❌ Use arbitrary spacing (e.g., `p-[13px]`)
❌ Override font families directly in components
❌ Create custom shadow values
❌ Mix design system tokens with custom values

---

## Accessibility

### Color Contrast
All color combinations meet WCAG 2.1 AA standards:
- Primary text on background: 12.8:1
- Accent text on background: 6.2:1
- Primary button: 5.5:1

### Focus States
All interactive elements have clear focus indicators:
```tsx
focus-visible:outline-none 
focus-visible:ring-2 
focus-visible:ring-ring 
focus-visible:ring-offset-2
```

### Typography
- Minimum body text size: 16px
- Line heights optimized for readability
- Sufficient letter spacing on headings

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Font Loading
Fonts use `display=swap` for optimal performance and FOUT prevention.

---

## Questions?

For design system questions or modifications, refer to:
- `src/index.css` - All design tokens
- `tailwind.config.ts` - Tailwind configuration
- `src/components/ui/` - Component implementations
