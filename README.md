# CraftLink

A premium freelance marketplace for creative professionals — graphic designers, illustrators, brand designers, and web designers. Japanese-inspired aesthetic with escrow, milestone payments, and real-time collaboration.

## Getting started

```bash
npm install
cp .env.example .env.local
# Add DATABASE_URL, Clerk keys, and optional Cloudinary / Socket URL
npm run db:push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to `/en` or `/zh-TW`.

**Demo mode:** Browse talent, profiles, orders, and chat without database or Clerk keys. Configure services for full persistence and auth.

### Languages

- **English** (`/en/...`)
- **Traditional Chinese** (`/zh-TW/...`)
- Toggle via the navbar language switcher (Framer Motion pill animation)
- Dictionaries: `messages/en.json`, `messages/zh-TW.json`

## Features

| Area | Description |
|------|-------------|
| Landing | Hero, search, categories, trust signals, sakura animations |
| Talent | Filters by category, skill, search |
| Profiles | Portfolio lightbox, service packages, revision policy |
| Orders | Brief form, escrow, milestones (Concept → Draft → Final) |
| Delivery | Accept & release payment, review period |
| Chat | Messages API + polling; optional Socket.io server |
| Dashboard | Order tracking, stats (demo data) |
| Theme | Light / dark with smooth transitions |
| Subpages | Portfolio tips, pricing guide, about, trust & safety, contact (EN + zh-TW) |

## Editorial subpages

| Path | Description |
|------|-------------|
| `/[locale]/portfolio-tips` | Creator guide with before/after cards |
| `/[locale]/pricing-guide` | Fee tables + animated earnings slider |
| `/[locale]/about` | Takumi philosophy & timeline |
| `/[locale]/trust-and-safety` | Escrow/IP accordion |
| `/[locale]/contact` | Floating-label form + success state |

## Project structure

```
prisma/schema.prisma     # PostgreSQL models
messages/                # en.json, zh-TW.json
src/i18n/                # next-intl routing & navigation
src/app/[locale]/        # Localized pages
src/app/api/             # API routes
src/components/          # UI, landing, talent, orders, chat
src/lib/                 # Prisma, auth, escrow, cloudinary, chat
src/hooks/               # useChat
server/socket.ts         # Optional Socket.io server
```

## Environment variables

See `.env.example` for:

- `DATABASE_URL` — PostgreSQL
- Clerk keys — authentication & roles
- Cloudinary — file uploads
- `NEXT_PUBLIC_SOCKET_URL` — optional real-time chat

## Stack

- Next.js 15 (App Router)
- TypeScript, Tailwind CSS 4
- Prisma + PostgreSQL
- Clerk, Framer Motion, Radix / shadcn-style UI
- Socket.io (optional), Cloudinary

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run db:push` | Push Prisma schema to database |
| `npx tsx server/socket.ts` | Start Socket.io server |

## Order flow (escrow)

1. Client places order → funds held in escrow
2. Milestones: Concept (30%) → Draft (40%) → Final (30%)
3. Freelancer submits work per milestone → client approves → partial release
4. Final delivery → client accepts → remaining escrow released
5. Both parties leave reviews

## Note

Payments are simulated for demo purposes. Integrate Stripe or similar for production.
