<div align="center">
  <img src="public/brand/logo.svg#gh-light-mode-only" alt="ShopWave" width="280">
  <img src="public/brand/logo-reverse.svg#gh-dark-mode-only" alt="ShopWave" width="280">
  <p><strong>Everything you need, delivered.</strong></p>
</div>

---

ShopWave is a full-stack e-commerce platform: a searchable catalogue, a cart
that follows you, checkout backed by a real transaction, Midtrans payments, and
an admin dashboard behind it.

It is built as a portfolio project, but not as a prototype — a real database,
real authentication, real payment settlement by webhook, tests, and CI on every
pull request.

> **Status: phase 1 of 9.** The foundation is in place — scaffold, tooling,
> brand, CI. The catalogue, cart, checkout and admin land in the phases listed
> in [`docs/PLAN.md`](docs/PLAN.md).

## Stack

Next.js 16 (App Router) · TypeScript (strict) · PostgreSQL + Prisma · Auth.js ·
Tailwind CSS v4 + shadcn/ui · Zod · Vitest · Playwright · Docker Compose ·
GitHub Actions · Midtrans Snap (sandbox)

## Quick start

```bash
npm install
cp .env.example .env     # fill in what the phases you are running need
npm run db:up            # PostgreSQL in Docker
npm run dev              # http://localhost:3000
```

Node 22 or newer, and Docker for the database.

## Commands

| Command                     | What it does                                  |
| --------------------------- | --------------------------------------------- |
| `npm run dev`               | Dev server                                    |
| `npm run build`             | Production build                              |
| `npm run check`             | Lint, type-check and unit tests — the CI gate |
| `npm run test`              | Vitest, once                                  |
| `npm run test:e2e`          | Playwright, against a production build        |
| `npm run format`            | Prettier, writing changes                     |
| `npm run db:up` / `db:down` | PostgreSQL in Docker                          |

## Documentation

| Document                             | What is in it                                      |
| ------------------------------------ | -------------------------------------------------- |
| [`CLAUDE.md`](CLAUDE.md)             | The stack, the commands, and every rule in full.   |
| [`docs/PLAN.md`](docs/PLAN.md)       | Features, the database ERD, folder layout, phases. |
| [`docs/BRAND.md`](docs/BRAND.md)     | The Crest brand kit and how to apply it.           |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Setup, branches, commits, pull requests.           |
| [`SECURITY.md`](SECURITY.md)         | Reporting, and what the app already enforces.      |

## A few things it takes seriously

- **Money is integer rupiah.** No floats anywhere near a price.
- **Orders remember what they cost.** Editing a product never rewrites history.
- **Checkout is one transaction.** Stock is checked and decremented inside it,
  so concurrent buyers cannot oversell the last item.
- **Payments settle from the webhook**, signature-verified and idempotent —
  never from the browser redirect.
- **WCAG AA.** Including the detail that signal orange needs graphite text, not
  white.

## Licence

[MIT](LICENSE).
