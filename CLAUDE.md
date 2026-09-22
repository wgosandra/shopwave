# ShopWave

A production-quality e-commerce platform: a real storefront with a real
database, real authentication, real payments through Midtrans, and an admin
dashboard behind it. Not a prototype — every feature is expected to work end
to end, be tested, and ship.

> `next dev` maintains `AGENTS.md`, which points at the Next.js docs bundled in
> `node_modules/next/dist/docs/`. Read those before writing Next.js code: this
> repository runs Next.js 16, which differs from most training data.

## Stack

| Concern        | Choice                                                 |
| -------------- | ------------------------------------------------------ |
| Framework      | Next.js 16 (App Router, Turbopack), React 19           |
| Language       | TypeScript, `strict` (plus `noUncheckedIndexedAccess`) |
| Database       | PostgreSQL 18, Prisma ORM                              |
| Auth           | Auth.js (NextAuth v5)                                  |
| Styling        | Tailwind CSS v4, shadcn/ui (Radix), Geist              |
| Validation     | Zod                                                    |
| Unit tests     | Vitest, Testing Library                                |
| E2E tests      | Playwright                                             |
| Payments       | Midtrans Snap (sandbox)                                |
| Local services | Docker Compose (Postgres)                              |
| CI             | GitHub Actions                                         |

## Commands

```bash
npm run dev            # dev server on http://localhost:3000
npm run build          # production build
npm run start          # serve the production build

npm run lint           # ESLint
npm run lint:fix       # ESLint, writing fixes
npm run format         # Prettier, writing changes
npm run format:check   # Prettier, check only (CI runs this)
npm run typecheck      # tsc --noEmit
npm run test           # Vitest, once
npm run test:watch     # Vitest, watching
npm run test:coverage  # Vitest with coverage
npm run test:e2e       # Playwright (builds and serves the app itself)
npm run check          # lint + typecheck + test

npm run db:up          # start Postgres in Docker
npm run db:down        # stop it
```

**Run `npm run check` before finishing any task, and fix every failure.** A task
is not done while lint, type-check or tests are red.

## Architecture

Four layers, and business logic never lives in a component.

```
src/app/         routes, layouts, pages, route handlers  — UI and HTTP only
src/components/  presentational and client components    — no data access
src/server/      services: business rules, transactions  — the only place rules live
src/lib/         data access, framework glue, pure helpers
prisma/          schema and migrations
```

- A **page** or **component** renders. It may call a service; it may not write
  business rules, touch Prisma, or reach into another feature's internals.
- A **server action or route handler** validates input with Zod, checks
  authorization, calls one service, and maps the result to a response.
- A **service** owns the rules: pricing, stock, the order state machine. It is
  where transactions are opened, and the layer tests target hardest.
- **Data access** wraps Prisma. Nothing above it constructs a raw query.

## Rules

These are not style preferences; a change that breaks one is a bug.

### Money

- Money is stored and passed as **integers of rupiah (IDR)**. Never a float,
  never a `Decimal`, never a formatted string.
- `OrderItem` records the **price at the time of purchase**. It is never read
  back from `Product`, because the product's price changes.
- Formatting happens at the edge, in the UI, via `formatIDR` in `src/lib/utils.ts`.

### Orders and stock

- Order status flows `PENDING → PAID → SHIPPED → COMPLETED`, with `CANCELLED`
  and `EXPIRED` as terminal exits. No other transition is legal; the service
  rejects one rather than trusting the caller.
- Checkout runs inside **one database transaction** that re-reads and decrements
  stock. Concurrent checkouts must never oversell: the transaction, not an
  earlier read, is what decides.
- Unpaid orders expire automatically and **restore the stock they held**.

### Payments

- The Midtrans webhook **verifies the signature** before it reads the body.
- Webhook processing is **idempotent**. Midtrans retries; a second delivery of
  the same notification must change nothing.
- Order state is settled from the webhook, never from the browser's redirect.

### Security

- **Server-side Zod validation on every input.** Client validation is a
  convenience, never the check that counts.
- **Authorization on every route.** A user reads and writes only their own
  data; admin routes check the admin role. Assume the caller crafted the URL.
- **Rate limiting** on login and on checkout.
- Security headers are set in `next.config.ts`.
- **No secrets in code.** Everything comes from the environment, declared in
  `.env.example` and validated in `src/lib/env.ts`. `.env` is git-ignored and
  never committed.

### Interface

- Responsive, and **accessible to WCAG AA**: real landmarks, labelled controls,
  visible focus, 4.5:1 contrast on text.
  Signal orange carries graphite text, not white — orange on white is 2.9:1
  and fails.
- Every async surface has a **loading skeleton**; every list has an **empty
  state**; every failure surfaces as an **error page or a toast**, never a
  blank screen.
- Light and dark mode both work. Colours come from the tokens in
  `src/app/globals.css`, which resolve to the brand tokens in
  `public/brand/tokens.css`. Do not hard-code a hex value in a component.

### Tests

- Every feature ships with tests. Services get unit tests covering the rules
  above — especially stock, money and state transitions. User-facing flows get
  a Playwright spec.
- A test that needs the database uses a transaction it rolls back, not a
  hand-cleaned table.

## Git workflow

- **Never commit to `main`.** One branch per phase: `feat/<name>`,
  `fix/<name>`, `chore/<name>`, `docs/<name>`.
- Small, atomic commits in **Conventional Commits**, with a scope where it
  helps: `feat(cart): add quantity update`. Allowed types: `feat`, `fix`,
  `refactor`, `test`, `docs`, `chore`, `ci`, `style`, `perf`, `build`,
  `revert`. Husky's `commit-msg` hook enforces this, and CI re-checks it.
- At the end of a phase, push the branch and open a pull request with
  `gh pr create`: a summary, what changed, and how it was tested. Thumper
  reviews and merges.

## Where things are

- `docs/PLAN.md` — features, the database ERD, the folder layout, the phases.
- `docs/BRAND.md` — the brand kit and how to apply it.
- `CONTRIBUTING.md` — setup and the day-to-day loop.
- `.env.example` — every variable, and which phase first needs it.
