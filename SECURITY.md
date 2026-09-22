# Security policy

> **Placeholder.** ShopWave is a portfolio project and is not yet deployed
> anywhere that handles real customer data or real money. This file will be
> filled in properly before any public deployment.

## Supported versions

| Version | Supported |
| ------- | --------- |
| `main`  | ✅        |

Nothing is released or tagged yet, so only the tip of `main` is in scope.

## Reporting a vulnerability

Open a [private security advisory](https://github.com/wgosandra/shopwave/security/advisories/new)
on this repository. Please do not open a public issue for anything exploitable.

Include what you can: what the problem is, how to reproduce it, and what an
attacker could do with it. You will get an acknowledgement within a few days.

## Scope

Payments run against the **Midtrans sandbox**. No real card details and no real
money pass through this application. Reports about the sandbox environment
itself belong with Midtrans, not here.

## What ShopWave already does

These are enforced in code, and a regression in any of them is a bug worth
reporting:

- Every input is validated server-side with Zod, whatever the client sent.
- Every route checks that the caller owns the data it is asking for; admin
  routes check the role.
- Login and checkout are rate-limited.
- The Midtrans webhook verifies its signature before reading the payload, and
  processes each notification exactly once.
- Secrets are read from the environment and validated at startup. Nothing is
  committed; `.env` is git-ignored.
- Checkout decrements stock inside the database transaction that creates the
  order, so concurrent requests cannot oversell.
