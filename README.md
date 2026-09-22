# Realster

Realster is a real estate listings platform: a public site for browsing
properties for sale or rent, plus an authenticated dashboard where licensed
agents log in to publish and manage their own listings.

This is a demo/portfolio build. The 3 agents and 15 property listings that
ship in the seed data are fictional, and the property photos are stock
photography, not real listings.

## Stack

- **Next.js 16** (App Router, Server Actions, Turbopack) + TypeScript
- **Tailwind CSS v4** + **shadcn/ui** (on top of `@base-ui/react` primitives)
- **Prisma 6** + **SQLite** for storage (zero external services required)
- Cookie-based session auth (JWT via `jose`, passwords hashed with `bcryptjs`)
- Local filesystem image uploads (`public/uploads/`) for agent-added photos

## Features

**Public site**
- Home page with hero search, featured listings, and "browse by city"
- `/properties` — search + filters (city, listing type, property type,
  min bedrooms, price range) with pagination
- `/properties/[slug]` — property detail with photo gallery, amenities,
  and a direct contact card for the listing agent (call/email)
- `/agents` and `/agents/[id]` — agent directory and profile pages with
  their active listings
- `/about`, `/contact` (working contact form — see note below)

**Agent dashboard** (`/dashboard`, requires login)
- `/register` and `/login` — agent account creation and sign-in
- `/dashboard` — overview with listing counts by status
- `/dashboard/properties` — manage your own listings (edit / delete)
- `/dashboard/properties/new` and `/dashboard/properties/[id]/edit` — full
  listing form with multi-photo upload, drag-free file picker with
  previews, and per-photo removal
- Routes under `/dashboard` are protected by middleware (`src/proxy.ts`)
  and re-checked server-side in each page/action

## Getting started

```bash
npm install
npm run db:seed   # creates prisma/dev.db and seeds 3 agents + 15 listings
npm run dev       # http://localhost:4127
```

`npm install` and the first `prisma migrate dev` already ran during setup
in this environment, but `npm run db:seed` is safe to re-run any time — it
wipes and re-creates the demo agents/properties.

### Demo agent login

```
maria@realster.com / Realster123!
```

(Also seeded: `jordan@realster.com` and `priya@realster.com`, same
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
