# ShopWave brand

Concept 02, **Crest**, approved 2026-09-22. This document is the written form
of the kit in `public/brand/`; `public/brand/brand.html` is the same guide with
every asset rendered, and is worth opening once.

---

## The mark

One continuous swell draws the W of _Wave_, with a second swell trailing behind
it for depth.

Five anchor points on a 64 grid, symmetric about the centre — `(10,16) (21,42)
(32,25) (43,42) (54,16)` — with a horizontal tangent at both valleys and at the
centre peak. That tangent is what keeps the shape reading as a wave rather than
as a drawn letter W. The trailing swell is the same path offset by `(3,14)`.

Every lockup, icon and social image is generated from that one path, so nothing
is hand-traced and the assets cannot drift apart. **Do not redraw the mark.** If
a new size or crop is needed, generate it from the path.

## Lockups

The horizontal lockup is the default. Reach for the stacked one only where the
horizontal will not fit above its minimum size, and the symbol alone only where
the name is already on screen.

| File                       | Use                                    |
| -------------------------- | -------------------------------------- |
| `logo.svg`                 | Default. Light grounds.                |
| `logo-reverse.svg`         | Dark grounds and photography.          |
| `logo-stacked.svg`         | Narrow spaces, square crops.           |
| `logo-stacked-reverse.svg` | Narrow spaces on dark.                 |
| `logo-mono.svg`            | One-colour print, embossing, invoices. |
| `mark.svg`                 | Avatars, app chrome, the packing slip. |
| `mark-reverse.svg`         | The symbol on dark grounds.            |
| `mark-mono.svg`            | The symbol, one flat colour.           |

> **Naming.** The kit calls the dark-ground lockup `logo-reverse.svg`, which is
> the print convention, rather than `logo-dark.svg`. `src/components/brand/logo.tsx`
> renders both and lets CSS pick, so nothing in the app has to choose by hand.

## Clear space and minimum size

The clear-space unit is **x**, the height of the lowercase _o_ in the wordmark.
Keep x clear on all four sides, and x between the symbol and the wordmark.
Nothing else sits inside that box.

| Asset             | Minimum on screen | In print |
| ----------------- | ----------------- | -------- |
| Horizontal lockup | 140 px            | 32 mm    |
| Stacked lockup    | 96 px             | 24 mm    |
| Symbol alone      | 16 px             | —        |

Below 24 px use `favicon.svg`, which carries the optical corrections: it
thickens both swells and shortens the trailing offset, so the two stay separate
instead of blending into one blob. It also flips to paper under
`prefers-color-scheme: dark`, so the mark never disappears into a dark tab strip.

## Colour

Two brand colours and nothing else. The neutrals are deliberately warm rather
than the blue-grey most UI kits ship with, so they sit with the orange instead
of fighting it.

| Token              | Value                 | Use                                             |
| ------------------ | --------------------- | ----------------------------------------------- |
| `--sw-graphite`    | `#14151A`             | Ink. Type, the leading swell, app-icon grounds. |
| `--sw-orange`      | `#FF6B35`             | The trailing swell, and one action per screen.  |
| `--sw-orange-deep` | `#E4511B`             | Hover and pressed states of that action.        |
| `--sw-orange-tint` | `#FFF1EA`             | Washes, selected rows.                          |
| `--sw-paper`       | `#FFFFFF`             | Reversed lockups and product surfaces.          |
| `--sw-sand-50…700` | `#FAF9F8` → `#2E2C29` | The warm neutral ramp.                          |

All of it lives in `public/brand/tokens.css`, which is the single source of
truth: `src/app/globals.css` imports that file directly rather than copying the
values, so the kit and the app can never disagree.

### Contrast

Signal orange against white measures **2.9:1** and fails WCAG AA for text. So
the primary button is orange with **graphite** text (6.5:1), not white. Keep it
that way; if an orange surface ever needs white text, the surface is wrong.

`--sw-sand-500` on paper is 5.5:1 and is the lightest neutral allowed for body
text. Lighter steps are for borders and fills only.

### What the app adds

Two things the brand does not define, because neither is a brand colour:

- **Dark-mode elevation.** `--sw-graphite-900/800/700/600` in `globals.css` step
  up from graphite for page, card, muted and border surfaces in dark mode.
- **One destructive red**, `--sw-danger` `#B42318`. Errors need a hue the brand
  palette does not have. It is used for destructive actions and error states
  only, never decoratively.

## Icons and social

| File                    | Size       | Where                        |
| ----------------------- | ---------- | ---------------------------- |
| `favicon.svg`           | scalable   | Tab icon, scheme-aware.      |
| `favicon-32.png`        | 32 × 32    | Legacy tab icon.             |
| `favicon-16.png`        | 16 × 16    | Legacy tab icon.             |
| `apple-touch-icon.png`  | 180 × 180  | iOS home screen.             |
| `icon-192.png`          | 192 × 192  | PWA manifest.                |
| `icon-512.png`          | 512 × 512  | PWA manifest.                |
| `icon-maskable-512.png` | 512 × 512  | PWA maskable, 80% safe zone. |
| `og-image.png`          | 1200 × 630 | Open Graph and Twitter card. |

## What not to do

- **Don't stretch.** Scale both axes together, always.
- **Don't rotate.** The swell has a horizon. Keep it level.
- **Don't add effects.** No shadows, bevels or gradients.
- **Don't recolour.** Graphite and orange, or a mono variant.
- **Don't sink it into the ground.** Use the reverse lockup instead.
- **Don't crowd it.** Nothing enters the clear space.

## Typography

The kit draws the wordmark as paths, so it depends on no font. The interface
uses **Geist Sans**, with **Geist Mono** for order numbers, SKUs and error
references. Both are installed from the `geist` npm package rather than fetched
from a font CDN, so a build never depends on network access to render text.

## How it is applied in this repository

| Where                           | What                                                                 |
| ------------------------------- | -------------------------------------------------------------------- |
| `public/brand/`                 | The kit, shipped as static files. Round-one concepts in `concepts/`. |
| `src/app/globals.css`           | Imports `tokens.css`, maps it to semantic tokens, light and dark.    |
| `src/components/brand/logo.tsx` | The lockup, with the reverse version swapped in by CSS on dark.      |
| `src/app/layout.tsx`            | Favicons, Apple touch icon, Open Graph image, theme colour.          |
| `src/app/manifest.ts`           | The PWA manifest and its three icons.                                |
| `src/lib/site.ts`               | The asset paths, in one place.                                       |
