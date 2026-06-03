---
name: Growth-Oriented Academic Management
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#a43a3a'
  on-tertiary: '#ffffff'
  tertiary-container: '#fc7c78'
  on-tertiary-container: '#711419'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3af'
  on-tertiary-fixed: '#410005'
  on-tertiary-fixed-variant: '#842225'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  h1:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  gutter: 1.5rem
  margin: 2rem
---

## Brand & Style

The brand identity centers on the intersection of academic rigor and personal growth. It is designed to feel like a high-end productivity tool—think Notion’s structural clarity mixed with Airtable’s data-driven versatility—tailored specifically for the educational sector. The target audience includes private tutors, learning center administrators, and students who value organization and progress.

The design style is **Corporate / Modern** with a focus on high-utility minimalism. It utilizes ample white space to reduce cognitive load, ensuring that complex scheduling and student data remain approachable. The interface evokes feelings of trust, clarity, and momentum, using a "light-touch" aesthetic where the content is the hero and the UI acts as a supportive, invisible framework.

## Colors

The palette is anchored by an Emerald Green primary color, representing growth and educational success. This is balanced by a vibrant Safety Orange used exclusively for high-priority actions and system alerts to ensure they are never missed.

The background is a crisp, clean white, while a cool-toned slate gray serves as the neutral for secondary text and borders. Subtle gradients are used sparingly, specifically as a "shimmer" on primary buttons or as soft top-to-bottom fades on card headers to add depth without clutter. Success states should utilize the primary green, while destructive actions should use a standard soft red to differentiate from the functional orange accent.

## Typography

This design system utilizes **Inter** across all levels to achieve a systematic and utilitarian feel. The hierarchy is established through clear weight variations rather than decorative flourishes. 

Headlines use a tighter letter-spacing and heavier weights to feel grounded and authoritative. Body text prioritizes legibility with a generous line height (1.6) to facilitate long-form reading of lesson notes and student feedback. Labels and small metadata use medium to semi-bold weights to remain distinct even at smaller scales. Use "Optical" sizing if available to maintain sharpness in dashboard views.

## Layout & Spacing

This design system employs a **Fixed Grid** for dashboard views and a **Fluid Grid** for content-heavy pages like lesson lists. The layout is built on an 8px base rhythm, ensuring consistent vertical and horizontal alignment.

Standard dashboard views use a 12-column grid with 24px (1.5rem) gutters. Content is typically housed within "containers" that have a max-width of 1440px on large screens. For the Tutor Management experience, the sidebar remains fixed (280px) while the main content area expands. Use generous padding inside cards (24px) to mimic the airy feel of modern SaaS tools like Airtable.

## Elevation & Depth

Visual hierarchy is established through **Ambient Shadows** and **Tonal Layers**. Instead of harsh borders, surfaces are elevated using soft, multi-layered shadows with a slight green-tinted neutral base (e.g., `#64748B` at 10% opacity) to keep the shadows feeling "fresh" rather than "dirty."

- **Level 0 (Base):** White background.
- **Level 1 (Cards):** Subtly elevated with a 4px blur shadow and a 1px soft gray stroke (`#E2E8F0`).
- **Level 2 (Modals/Popovers):** Higher elevation with a 12px blur and 15% opacity to indicate temporary focus.
- **Tonal Tiers:** Use subtle background fills (`#F8FAFC`) to differentiate sections, such as a side-rail or a secondary utility bar, without needing an elevation change.

## Shapes

To maintain a "Friendly but Professional" tone, this design system uses **Rounded** geometry. The standard corner radius is 8px (0.5rem), providing a modern, approachable feel that avoids the rigidity of sharp corners while remaining more professional than fully pill-shaped components.

- **Standard Buttons & Inputs:** 8px (0.5rem)
- **Large Containers/Cards:** 16px (1rem)
- **Modals/Large Sections:** 24px (1.5rem)
- **Tags/Chips:** Should remain 8px to match the buttons, rather than being fully circular.

## Components

### Buttons
Primary buttons use a solid Green fill with white text. Secondary buttons use a Green outline with a subtle light-green hover state. Accent buttons (CTAs/Alerts) use the Orange fill. All buttons feature a subtle 1px "inner-glow" gradient at the top to simulate a tactile, high-quality surface.

### Input Fields
Inputs use a white background with a 1px border. On focus, the border transitions to Primary Green with a 2px soft outer glow (halo). Placeholder text should be a light slate gray.

### Cards
The primary container for information. Cards feature a white background, the Level 1 shadow, and 24px internal padding. For tutor profiles or course cards, use a 4px Green top-border to reinforce branding.

### Chips & Badges
Used for status (e.g., "Active," "Pending"). They should use a low-saturation background of the status color with high-saturation text of the same hue. Corners are consistent with the 8px roundedness.

### Lists & Tables
Tables should have no vertical borders—only horizontal dividers in a very light gray. Row hover states should trigger a subtle shift to the surface color (`#F8FAFC`) to assist with row tracking.

### Additional Components
- **Progress Bars:** Thin, high-contrast green bars for student progress.
- **Schedule Blocks:** Softly tinted containers in the calendar view, utilizing subtle borders to denote different subjects or tutors.