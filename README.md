# יובל פרויקטים — Portfolio

תיק עבודות אישי בעברית (RTL), Mobile-first, בעיצוב כהה ומודרני.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Static data file (`lib/projects.ts`)
- Deploy-ready for Vercel

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

```
app/
  page.tsx                  # עמוד בית
  projects/[slug]/page.tsx  # עמוד פרויקט
  layout.tsx                # RTL + Heebo font
components/
  ProjectCard.tsx
  TechBadge.tsx
  StatusBadge.tsx
lib/
  projects.ts               # נתוני הפרויקטים
public/
  projects/                 # תמונות placeholder
```

## Editing projects

Edit `lib/projects.ts`. Each project: `title`, `slug`, `shortDescription`,
`longDescription`, `whatIBuilt`, `techStack`, `status`, `image`, `liveUrl`,
optional `githubUrl`. Replace the `liveUrl` / `image` placeholders with real values.

## Deploy

Push to GitHub and import into Vercel — zero config needed.
