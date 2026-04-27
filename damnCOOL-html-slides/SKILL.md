---
name: damncool-html-slides
description: Create bold, animated, browser-ready HTML slide decks from a user topic, outline, notes, or source material. Use when Codex needs to make cool/cinematic/炫酷幻灯片, HTML presentations, browser-openable slide shows, or visual storytelling decks with varied layouts, random-feeling 3D transitions, large icons or emoji, and reusable CSS/JS rather than rewriting a slide engine.
---

# Cinematic HTML Slides

## Core Rule

Copy the bundled suite first, then write deck content with its classes and data attributes. Do not rebuild the presentation engine unless the user explicitly asks.

Bundled suite:

- `assets/cinematic-suite/index.html` - starter HTML.
- `assets/cinematic-suite/css/cinematic-slides.css` - themes, layouts, icon styling, animations.
- `assets/cinematic-suite/js/cinematic-slides.js` - impress-style camera navigation, overview, random transitions, icon packs.
- `references/authoring-patterns.md` - class patterns and examples; read when composing a new deck.

## Workflow

1. Create an output folder in the user-specified path. If no path is specified, create a folder in the current workspace named from the topic, such as `ai-future-slides`.
2. Copy all files from `assets/cinematic-suite/` into that folder.
3. Edit only `index.html` for deck content unless the user asks for custom behavior.
4. Choose one of five body themes:
   - `theme-solar-pop` for bright product, education, optimistic tech.
   - `theme-noir-lux` for high-stakes strategy, finance, executive stories.
   - `theme-cyber-acid` for futuristic, hacker, AI, gaming.
   - `theme-editorial-fire` for opinionated reports, talks, cultural topics.
   - `theme-forest-lab` for science, sustainability, research, healthcare.
5. Convert the user's topic/material into a deck with a strong narrative arc. Prefer 8-16 slides unless the user specifies length.
6. Give every slide a unique transform path using `data-x`, `data-y`, `data-z`, `data-scale`, and `data-rotate`. Vary coordinates so navigation feels spatial.
7. Use mixed layouts: cover, split, bento, quote, metric wall, timeline, comparison, image/visual placeholder, closing.
8. Add large visual anchors on most slides: `<div class="mega-icon" data-icon="..."></div>` or a large emoji/icon character.
9. Avoid default Tailwind-like blue/purple/indigo palettes. Do not use `#3b82f6`, `#6366f1`, `#8b5cf6`, blue-purple gradients, or an indigo-dominant scheme.
10. Verify by opening `index.html` in a browser or serving the folder. Use arrow keys, space, mouse wheel, click, and `Ctrl/Command+G` for overview. `O`/Backspace/Escape are fallback overview shortcuts.

## Authoring Contract

Write slides as:

```html
<section class="step layout-split transition-random" data-x="1200" data-y="0" data-scale="1" data-rotate="-8">
  <div class="mega-icon" data-icon="rocket"></div>
  <p class="eyebrow">Market signal</p>
  <h2>One sharp slide title</h2>
  <p class="lede">A concise explanation grounded in the user's material.</p>
</section>
```

Use semantic text and the suite classes. The JavaScript reads `.step` elements and moves the camera around the slide map, inspired by the source project's `Impress`/`Step` implementation: each slide owns a 3D transform, navigation moves the canvas to the inverse transform, and overview calculates a scale that fits the map. `Ctrl/Command+G` opens a global view of all slides; clicking any slide in that view jumps into it.

## Content Guidance

- Make slides content-rich, not decorative placeholders.
- Prefer concrete facts, named examples, timelines, contrasts, and metrics from the user's material.
- When source material is thin, make reasonable assumptions and label uncertain claims as framing, not facts.
- Keep slide text scannable: title plus 2-5 concise blocks is usually enough.
- Use English or Chinese to match the user.

## Deliverable

Return the path to `index.html`. Mention the chosen theme and the main controls only briefly.
