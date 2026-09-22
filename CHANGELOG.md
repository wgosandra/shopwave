# Changelog

All notable changes to ShopWave are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Next.js 16 App Router scaffold with TypeScript in strict mode, Tailwind CSS
  v4 and shadcn/ui (Radix).
- The Crest brand kit under `public/brand/`, wired into the layout: lockups in
  the header and footer, the scheme-aware favicon, the PWA manifest and the
  Open Graph image.
- Design tokens mapping `public/brand/tokens.css` to semantic light and dark
  tokens, with a theme switcher.
- Base chrome: header, footer, home page, 404, error boundary and a loading
  skeleton.
- Tooling: ESLint, Prettier, Husky, lint-staged and commitlint enforcing
  Conventional Commits.
- Vitest with Testing Library for unit tests, Playwright for end-to-end tests.
- `docker-compose.yml` running PostgreSQL 18 for local development.
- GitHub Actions CI: lint, format check, type-check, unit tests, build,
  end-to-end tests, and commit-message linting on pull requests.
- Project documentation: `CLAUDE.md`, `docs/PLAN.md`, `docs/BRAND.md`,
  `CONTRIBUTING.md`, `SECURITY.md`, issue and pull request templates.

[Unreleased]: https://github.com/wgosandra/shopwave/commits/main
