# Project Books — authoring standard

Markdown sources for the per-project "ספר פרויקט" pages, rendered by
`components/Markdown.tsx`.

## Standard: every Project Book must have a table of contents

**From now on, every new Project Book added to the portfolio must include a
table of contents near the top** — placed after the intro block and before the
first main section (see `marzipan.md` and `yuval-digital.md` for the pattern).

### How anchors work

The renderer (`components/Markdown.tsx`) gives every heading an `id` derived
from its text via a GitHub-style `slugify`:

1. `trim()`
2. `toLowerCase()`
3. strip everything except letters, digits, whitespace, and `-`
   (`/[^\p{L}\p{N}\s-]/gu` → `""`, so Hebrew letters are kept; `.`, `/`, and the
   non-breaking hyphen `‑` U+2011 are removed)
4. whitespace → `-`

So a heading like `## 6. מפת ראוטים / עמודים` becomes the id
`6-מפת-ראוטים--עמודים` (the `/` is dropped, leaving a double hyphen from the two
spaces). TOC links must match the renderer's output exactly — when in doubt,
run `npm run build` and verify the links jump correctly.
