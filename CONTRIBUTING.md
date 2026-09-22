# Contributing to ShopWave

## Getting set up

You need Node 22 (`.nvmrc` pins it) and Docker.

```bash
npm install                 # also installs the Husky hooks
cp .env.example .env        # then fill in the values for the phases you are running
npm run db:up               # Postgres on 127.0.0.1:5432
npm run dev                 # http://localhost:3000
```

`.env.example` says which phase first needs each variable, so early on most of
it can stay empty.

## The loop

```bash
npm run dev          # while you work
npm run check        # lint + type-check + tests — before you commit
npm run test:e2e     # when the change touches a user-facing flow
```

`npm run check` is the same gate CI runs. If it is red locally it will be red
on the pull request.

## Branches

Never commit to `main`. One branch per phase, named for what it delivers:

```
feat/<name>     a new capability
fix/<name>      a bug fix
refactor/<name> a change with no behaviour change
chore/<name>    tooling, dependencies, housekeeping
docs/<name>     documentation only
ci/<name>       pipeline changes
```

## Commits

[Conventional Commits](https://www.conventionalcommits.org/), with a scope
where it helps:

```
feat(cart): add quantity update
fix(checkout): hold stock inside the transaction
test(orders): cover the expiry path
docs(brand): write up clear space and minimum sizes
```

Allowed types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`,
`style`, `perf`, `build`, `revert`.

Keep commits small and atomic — one idea each. The `commit-msg` hook rejects a
message that does not parse, and CI re-checks every commit on the pull request.

The `pre-commit` hook runs `lint-staged`, which lints and formats only the
files you staged.

## Pull requests

At the end of a phase:

```bash
git push -u origin feat/<name>
gh pr create --fill
```

The template asks for a summary, what changed, and how it was tested. Fill in
all three — "how it was tested" means the commands you ran and what they
showed, not a promise that you ran them.

## The rules that matter

Read `CLAUDE.md`. In short:

- Money is integer rupiah. Never a float.
- `OrderItem` keeps the price at purchase time.
- Checkout runs in one transaction with a stock check inside it.
- Every input is validated server-side with Zod.
- Every route checks that the caller owns what it is asking for.
- No business logic in components.
- Every feature ships with tests.
- No secrets in the repository, ever.

## Where things live

`docs/PLAN.md` has the feature list, the ERD, the folder layout and the phase
order. `docs/BRAND.md` has the brand kit and how to apply it.
