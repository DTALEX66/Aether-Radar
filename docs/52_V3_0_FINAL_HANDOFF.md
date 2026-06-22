# Aether Radar v3.0 Final Handoff

## Current status

Aether Radar v3.0 is a stabilized, Codex-ready commercial MVP package. The project now has deterministic builds, API parsing hardening, aligned version metadata, security headers, static-site checks, API contract checks, release manifest generation and full verification entrypoints.

## Start here

1. Read `PROJECT_VERSION.md`.
2. Run dependency-free verification:

```bash
python scripts/verify_v3_0.py
```

3. Run full verification where Node/npm are available:

```bash
cd next-app
npm ci --ignore-scripts --no-audit --no-fund
cd ..
bash scripts/verify_v3_0.sh
```

## Known build constraint solved in v3.0

Earlier builds could stall at Next.js page-data collection because the environment exposed a high CPU count and Next.js spawned many workers for a mostly-static site. v3.0 fixes this by setting deterministic defaults in `next-app/next.config.mjs`:

```js
experimental: {
  cpus: Number(process.env.AETHER_NEXT_BUILD_CPUS ?? 1),
  staticGenerationMaxConcurrency: Number(process.env.AETHER_STATIC_CONCURRENCY ?? 1),
}
```

On stronger CI, increase workers explicitly:

```bash
AETHER_NEXT_BUILD_CPUS=4 AETHER_STATIC_CONCURRENCY=4 npm run build:ci
```

## What is verified

- UTF-8 / syntax / JSON safety
- seed data validity and mirror consistency
- commercial MVP route/page presence
- production docs and database schema presence
- API route/OpenAPI/version alignment
- static-site link and placeholder checks
- TypeScript typecheck
- ESLint
- deterministic Next production build
- post-build HTTP smoke test
- release manifest generation

## What remains for a real SaaS

- real login/session provider
- role-based online admin backend
- database-backed CRUD and review workflow
- API keys, rate limits and billing integration
- scheduled GitHub/license/privacy/price refresh jobs
- audit logs and incident workflow implementation
- legal review of privacy policy, terms and commercial claims

## Recommended next development sequence

1. Replace JSON seed reads with database repository functions while keeping JSON as seed import/export.
2. Implement admin auth and role gates.
3. Add data review workflow: pending, verified, expired, rejected, dangerous.
4. Add scheduled GitHub metrics updater and source freshness badges.
5. Add paid export/API-key gating.
6. Add team spaces and saved tool stacks.
7. Add source citation fields per entity.
8. Add automated browser/E2E tests once the UI becomes interactive enough to justify them.
