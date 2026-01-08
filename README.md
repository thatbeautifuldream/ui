# attn/ui

A small, curated collection of accessible, animated UI components.

Built on the shadcn distribution model: you copy the code, you own it. No package to install, no styles to override, no framework lock-in.

This isn't a design system. It's a public expression of UI craft—what gets included has passed a quality bar for accessibility, motion, and interaction design. Attention to detail is all you need.

## Getting Started

Visit [ui.milind.app](https://ui.milind.app) to browse components and copy the code.

Components are distributed as code, compatible with the `shadcn` CLI:

```bash
npx shadcn@latest add https://ui.milind.app/r/nested-drawer.json
```

## Philosophy

Most component libraries optimize for breadth. This one optimizes for depth.

Every component here has been built with attention to accessible markup, smooth motion, and interaction nuance. Components are included only when they meet a quality standard: no half-working animations, no keyboard traps, no motion without purpose.

## Component Acceptance Checklist

- Keyboard navigation and focus management work correctly
- ARIA patterns are implemented according to WAI-ARIA Authoring Practices
- Animations are smooth, purposeful, and respect `prefers-reduced-motion`
- Component can be interrupted mid-animation without visual or state bugs
- Implementation is composition-friendly and doesn't force a single use case
- Code is readable and doesn't obscure intent with premature abstraction
- Component solves a real interaction problem, not just aesthetic novelty

---

Made by Milind Mishra
