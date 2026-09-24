# Realster

Realster is a **Coimbatore, Tamil Nadu** marketplace for **land and
homes**: a public site for browsing plots, farms, houses, and apartments,
plus an authenticated dashboard where licensed agents publish and manage
their own listings.

This is a demo/portfolio build. The 3 agents and 21 listings that ship
in the seed data are fictional. Photography is stock imagery.

## Stack

- **Next.js 16** (App Router, Server Actions, Turbopack) + TypeScript
- **Tailwind CSS v4** + **shadcn/ui** (on top of `@base-ui/react` primitives)
- **Prisma 6** + **SQLite** for storage (zero external services required)
- Cookie-based session auth (JWT via `jose`, passwords hashed with `bcryptjs`)
- Local filesystem image uploads (`public/uploads/`) for agent-added photos

## Features

**Public site**
- Home page with hero search, featured land, featured homes, and browse-by-locality
- `/properties` — search + filters (category, city, listing type, property type,
  price range) with pagination
- `/properties?category=land` and `/properties?category=homes` — first-class
  catalogs for land vs built property
- `/properties/[slug]` — listing detail with photo gallery, amenities,
  and a direct contact card for the listing agent (call/email)
- `/agents` and `/agents/[id]` — agent directory and profile pages with
  their active listings
- `/about`, `/contact` (working contact form — see note below)

**Agent dashboard** (`/dashboard`, requires login)
- `/register` and `/login` — agent account creation and sign-in
- `/dashboard` — overview with listing counts by status
- `/dashboard/properties` — manage your own listings (edit / delete)
- `/dashboard/properties/new` and `/dashboard/properties/[id]/edit` — full
  listing form with multi-photo upload, file picker with previews, and
  per-photo removal
- Routes under `/dashboard` are protected by middleware (`src/proxy.ts`)
  and re-checked server-side in each page/action

## Getting started

```bash
npm install
npm run db:seed   # creates prisma/dev.db and seeds 3 agents + 21 listings
npm run dev       # http://localhost:4127
```

`npm install` and the first `prisma migrate dev` already ran during setup
in this environment, but `npm run db:seed` is safe to re-run any time — it
wipes and re-creates the demo agents/properties.

### Demo agent login

```
kavitha@realster.com / Realster123!
```

(Also seeded: `arun@realster.com` and `meera@realster.com`, same
password.) Or use "Create agent account" on `/register` to make your own.

### Environment variables

Copy `.env.example` to `.env` if you need to recreate it:

```
DATABASE_URL="file:./dev.db"
SESSION_SECRET="change-me-to-a-long-random-string-in-production"
```

`DATABASE_URL` is resolved to an absolute path at runtime
(`src/lib/prisma.ts`) so the app and the Prisma CLI always agree on the
same `prisma/dev.db` file regardless of the working directory a command
is run from.

## Deploy on Hostinger (Node.js web app)

This is a full-stack Next.js app (SSR + server actions + SQLite). It needs
Hostinger **Node.js web apps** hosting (Business or Cloud), not static
HTML hosting.

1. Put this project on **GitHub** (Hostinger only imports GitHub repos).
2. In hPanel: **Websites → Add Website → Node.js web app → Import Git repository**.
3. Connect GitHub, pick this repo, branch `main`.
4. Use these settings (Hostinger usually auto-detects Next.js):

   | Setting | Value |
   |---|---|
   | Framework | Next.js |
   | Node.js version | 20 or 22 |
   | Install command | `npm ci` |
   | Build command | `npm run build` |
   | Start command | `npm run start` |
   | Output directory | `.next` |

   The build uses **Webpack** (`next build --webpack`) because Hostinger’s
   Linux image has glibc 2.28 — Next.js 16’s default Turbopack build needs
   glibc 2.29+.

   `npm run start` already binds `0.0.0.0` and uses Hostinger's `$PORT`.
   On first boot it runs Prisma migrations and seeds the demo listings if
   the database is empty.

5. Add environment variables (import `.env.hostinger.example`, then
   replace `SESSION_SECRET` with a long random string):

   ```
   NODE_ENV=production
   DATABASE_URL=file:./dev.db
   SESSION_SECRET=your-long-random-secret
   ```

6. Click **Deploy**. After it is live, demo login is
   `kavitha@realster.com` / `Realster123!`.

Every later push to `main` rebuilds the site automatically. SQLite lives
on the Hostinger disk — later deploys keep existing listings unless you
delete `prisma/dev.db`.

## Notes & limitations (demo scope)

- **Contact form** (`/contact`) validates and logs submissions server-side
  but doesn't send real email — there's no email provider configured. Swap
  in Resend/Postmark/etc. in `src/actions/contact.ts` for production.
- **Image uploads** are written to `public/uploads/` on the local
  filesystem. That's fine for a single-instance demo; a real deployment
  on serverless/multi-instance infrastructure would need object storage
  (S3, R2, etc.) instead.
- **SQLite** is used for zero-config local storage. Swapping to Postgres
  is a one-line change to `prisma/schema.prisma`'s `datasource` block plus
  a new `DATABASE_URL`.
- **Hero video** is a Remotion composition (`remotion/`). Rebuild with
  `npm run video:render` (needs Chrome). The site falls back to the
  poster still if the video files are missing.
- **Brand tokens** follow the UI-UX Pro Max three-layer model
  (`docs/brand-guidelines.md`, `docs/design-tokens.json`,
  `src/styles/design-tokens.css`). Agent skills used for this build live
  under `.agents/skills/`.

## Project structure

```
prisma/schema.prisma        Agent / Property / PropertyImage models
prisma/seed.ts               Demo agents + listings seed script
src/actions/                 Server actions (auth, properties, contact)
src/app/(site)/               Public marketing + listings pages
src/app/(auth)/                Login / register pages
src/app/dashboard/             Protected agent dashboard
src/components/                Shared UI (site chrome, property cards/forms)
src/components/ui/             shadcn/ui primitives
src/lib/                        Prisma client, session/auth, validation, utils
src/proxy.ts                    Route-protection middleware
public/images/                  Brand logo + stock property/hero photos
```
