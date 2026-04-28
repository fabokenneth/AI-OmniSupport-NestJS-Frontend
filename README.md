# AI OmniSupport — Frontend

> Transform any business document into a 24/7 AI-powered virtual assistant across WhatsApp, web chat, and more.

AI OmniSupport is a premium, multi-tenant SaaS platform that lets companies upload their internal knowledge (PDFs, manuals, price lists) and instantly create intelligent support agents that respond to customers with human-expert precision — at any scale, on any channel.

---

## Features

- **AI-first support** — GPT-4 powered agents resolve tier-1 tickets automatically
- **Omnichannel** — WhatsApp, web widget, and more from a single dashboard
- **Knowledge base (RAG)** — upload documents; agents answer from them directly
- **Multi-tenant** — each company is fully isolated with role-based access (`OWNER`, `ADMIN`, `AGENT`)
- **Dark mode** — system-aware, toggle-able, persisted per user
- **Enterprise-ready** — SSR, strict TypeScript, JWT authentication

---

## Tech Stack

| Concern | Technology |
|---|---|
| Framework | [Nuxt 4](https://nuxt.com) — SSR, `app/` directory |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` |
| UI Components | [shadcn-vue](https://www.shadcn-vue.com) (`reka-nova` style) |
| State | [Pinia](https://pinia.vuejs.org) |
| Forms | [VeeValidate](https://vee-validate.logaretm.com) + [Zod](https://zod.dev) |
| Icons | [Lucide Vue Next](https://lucide.dev) |
| Utilities | [VueUse](https://vueuse.org) |
| Dark mode | [@nuxtjs/color-mode](https://color-mode.nuxtjs.org) |
| Runtime | Node 24 (see `.nvmrc`) |

---

## Prerequisites

- [Node.js](https://nodejs.org) 24+ — use `nvm` with the included `.nvmrc`
- [nvm](https://github.com/nvm-sh/nvm) (recommended)
- The [AI OmniSupport backend](../Ai-OmniSupport-backend) running on `http://localhost:3001`

---

## Quick Start

```bash
# 1. Use the correct Node version
nvm use

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# → Edit .env and set NUXT_PUBLIC_API_BASE if your backend runs elsewhere

# 4. Start the dev server
npm run dev
```

The app is available at **http://localhost:3000**.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

| Variable | Default | Description |
|---|---|---|
| `NUXT_PUBLIC_API_BASE` | `http://localhost:3001` | Base URL of the NestJS backend API |

---

## Available Scripts

```bash
npm run dev       # Start dev server with HMR (http://localhost:3000)
npm run build     # Build for production → .output/
npm run preview   # Serve the production build locally
npm run generate  # Static site generation
```

---

## Project Structure

```
app/
├── assets/css/main.css        # Global styles, design tokens (oklch), dark mode
├── app.vue                    # Root layout shell
│
├── layouts/
│   ├── default.vue            # Public / marketing layout (nav + footer)
│   └── admin.vue              # Dashboard layout (collapsible sidebar)
│
├── pages/
│   ├── (public)/              # Publicly accessible pages
│   │   ├── index.vue          # Landing page
│   │   └── auth/
│   │       ├── login.vue
│   │       └── register.vue   # Company signup with plan selection
│   └── (dashboard)/           # Protected dashboard pages
│       └── dashboard/
│           └── index.vue      # Overview with stats
│
├── schemas/                   # Zod validation schemas (shared with API types)
│   └── auth.ts
│
├── stores/                    # Pinia stores
│   ├── useCompanyStore.ts     # Current tenant data
│   └── useAuthStore.ts        # (TODO) JWT + user roles
│
├── composables/
│   └── useApi.ts              # Authenticated useFetch wrapper
│
├── plugins/
│   └── api.ts                 # Global $api ($fetch with JWT injection)
│
├── middleware/
│   └── auth.ts                # Route guard — redirects to /auth/login if unauthenticated
│
└── components/
    └── ui/                    # shadcn-vue components (Button, Badge, FormField, …)
```

---

## Architecture Overview

### Authentication

JWT tokens are stored in an `auth_token` cookie. The `auth.ts` middleware protects all dashboard routes. Both `$api` (for Pinia stores) and `useApi` (for components) automatically inject the `Authorization: Bearer <token>` header and redirect to `/auth/login` on 401.

### Multi-tenancy

Every user belongs to a company (tenant). The current tenant context is held in `useCompanyStore`. UI elements in the dashboard — sidebar links, action buttons — are conditionally rendered based on the user's role (`OWNER`, `ADMIN`, `AGENT`).

### Forms

All forms use **VeeValidate + Zod**: schemas are defined once in `app/schemas/`, provide both runtime validation and TypeScript types, and can be shared with the backend DTOs.

### Design System

Tokens are defined as CSS custom properties in `app/assets/css/main.css` using the modern `oklch` color format and exposed as Tailwind utilities via `@theme inline`. No `tailwind.config.ts` — Tailwind v4 is CSS-first.

| Color | Usage |
|---|---|
| Slate `#0F172A` | Primary brand, buttons |
| Violet `#7C3AED` | AI features, accents |
| Emerald `#10B981` | Live / Active status |

---

## Pages Roadmap

| Route | Status |
|---|---|
| `/` | ✅ Landing page |
| `/auth/login` | ✅ |
| `/auth/register` | ✅ Company signup + plan picker |
| `/dashboard` | ✅ Stats scaffold |
| `/dashboard/conversations` | 🔲 Planned |
| `/dashboard/knowledge` | 🔲 Planned |
| `/dashboard/agents` | 🔲 Planned |
| `/dashboard/analytics` | 🔲 Planned |
| `/dashboard/settings` | 🔲 Planned |

---

## Adding a shadcn-vue Component

```bash
npx shadcn-vue@latest add <component-name>
# example: npx shadcn-vue@latest add card input select
```

Components are placed in `app/components/ui/` and auto-imported by Nuxt.

---

## Contributing

1. Branch from `main`: `git checkout -b feat/your-feature`
2. Follow the coding standards in `CLAUDE.md` (not committed — ask the team)
3. Run `npm run build` before opening a PR — the build must be clean
4. One PR per feature; keep changes focused

---

## Related

- **Backend** — `../Ai-OmniSupport-backend` (NestJS, REST API, JWT auth)
