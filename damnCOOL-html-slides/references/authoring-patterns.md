# Authoring Patterns

## Spatial Model

Each slide is a `.step`. The deck engine places steps in a large 3D canvas and navigates by transforming the canvas around the active step.

Useful attributes:

- `data-x`, `data-y`, `data-z`: slide position.
- `data-scale`: camera scale for the active slide.
- `data-rotate`: 2D rotation in degrees.
- `data-transition`: `random`, `swoop`, `spin`, `dive`, `snap`, `float`, or `warp`.

Controls: arrows, space, wheel, and click move through slides. `Ctrl/Command+G` opens the global overview of all slides; click a slide while in overview to jump to it. `O`, Backspace, and Escape also open overview.

Use a path instead of a row:

```html
<section class="step layout-cover" data-x="0" data-y="0" data-scale="1"></section>
<section class="step layout-bento" data-x="1300" data-y="-300" data-z="-200" data-rotate="7"></section>
<section class="step layout-quote" data-x="2500" data-y="400" data-scale="0.85" data-rotate="-12"></section>
<section class="step layout-metrics" data-x="1200" data-y="1300" data-z="300" data-scale="1.15" data-rotate="18"></section>
```

## Layout Classes

- `layout-cover`: big centered title.
- `layout-split`: two-column narrative + visual.
- `layout-bento`: dense cards.
- `layout-quote`: oversized quotation or thesis.
- `layout-metrics`: large numbers.
- `layout-timeline`: connected sequence.
- `layout-comparison`: two to three contrast panels.
- `layout-stack`: vertical argument.
- `layout-radar`: centered object with orbiting points.
- `layout-close`: final statement.

## Content Components

- `eyebrow`: short context label.
- `lede`: larger support copy.
- `mega-icon`: large icon; set `data-icon`.
- `badge-row`, `badge`: compact tags.
- `card-grid`, `card`: grouped details.
- `metric`, `metric-label`: number and label.
- `timeline`, `event`: sequence.
- `callout`: highlighted claim.
- `visual-frame`: framed image/diagram placeholder.

## Built-In Icon Keys

The JS fills empty `.mega-icon[data-icon]` nodes.

Emoji-style: `rocket`, `fire`, `spark`, `brain`, `eye`, `map`, `shield`, `bolt`, `seed`, `gem`, `target`, `wave`, `lab`, `magnet`, `compass`.

Symbol-style: `sun`, `moon`, `star`, `ring`, `crosshair`, `node`, `signal`, `pulse`, `delta`, `infinity`.

If no key fits, put a direct emoji or character inside `.mega-icon`.

## Animation Classes

Add to inner elements:

- `kinetic`: subtle floating movement.
- `pop-in`: entry scale.
- `slide-up`: entry movement.
- `glow-pulse`: pulsing emphasis.
- `ticker`: horizontal text stream.
- `tilt-card`: hover tilt.
- `orbit-field`: rotating decorative icon cluster.

## Five Theme Choices

- `theme-solar-pop`: amber, coral, teal, charcoal. Energetic and broad.
- `theme-noir-lux`: black, bone, gold, crimson. Executive and dramatic.
- `theme-cyber-acid`: black, acid green, hot pink, orange. Futuristic and intense.
- `theme-editorial-fire`: paper, ink, red, ochre. Opinionated and magazine-like.
- `theme-forest-lab`: deep green, mint, clay, cream. Research and nature.

Do not add blue-purple, indigo, or default Tailwind gradient colors.
