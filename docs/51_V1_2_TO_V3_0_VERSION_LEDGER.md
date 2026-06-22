# v1.2 → v3.0 Version Ledger

This ledger records each major fix/capability addition without skipping minor versions.

| Version | Change type | What changed | Verification |
|---|---|---|---|
| v1.2 | Build fix | Added deterministic Next.js build worker settings (`experimental.cpus`, `staticGenerationMaxConcurrency`) to prevent page-data collection stalls on small CI/sandbox machines. | `npm run build:ci` |
| v1.3 | Verification | Added cross-platform v3 verification entrypoints for Linux/macOS and Windows PowerShell. | `scripts/verify_v3_0.*` |
| v1.4 | API hardening | Added robust query parsing helpers for positive/non-negative integers, booleans and export formats. | `scripts/api_contract_check.py` |
| v1.5 | API hardening | Hardened `/api/entities` against invalid `limit`, `offset` and `sort` values; added `hasMore` metadata. | HTTP smoke test |
| v1.6 | Search behavior | Made empty `/api/search` intentional: curated default entities and top scenarios instead of accidental full term/scenario matches. | HTTP smoke test |
| v1.7 | Version alignment | Added `next-app/lib/version.ts` and aligned API metadata to v3.0. | API contract check |
| v1.8 | Export/report hardening | Normalized export/report formats and aligned exported bundle/report versions to v3.0. | API contract check |
| v1.9 | Security headers | Added global security headers: frame denial, nosniff, referrer policy and permissions policy. | API contract + build |
| v2.0 | MCP alignment | Updated MCP prototype server and `data_status` version to v3.0. | MCP/API contract check |
| v2.1 | OpenAPI alignment | Updated `next-app/public/openapi.json` and `data/api/openapi.json` to v3.0.0 and synchronized both copies. | API contract check |
| v2.2 | Static-site QA | Added dependency-free static-site link/placeholder/doctype checks. | `python scripts/static_site_check.py` |
| v2.3 | Release evidence | Added release manifest generator with tracked-file hashes and quality gates. | `python scripts/release_manifest.py` |
| v2.4 | HTTP smoke testing | Added post-build Next server smoke tests for core pages and API endpoints. | `python scripts/http_smoke_test.py` |
| v2.5 | Production readiness | Extended production readiness checks to include v3 stabilization files and security/build settings. | `python scripts/production_readiness_check.py` |
| v2.6 | Self-check expansion | Extended ten-round self-check to include API contract, static-site and v3 stabilization checks. | `python scripts/ten_round_self_check.py` |
| v2.7 | Package metadata | Updated `project_manifest.json`, package version and npm check scripts to v3.0. | `npm run check:v3` |
| v2.8 | Status transparency | Updated `/status` page and `/api/status` to expose release date, v3 profile, review coverage and warnings. | build + HTTP smoke |
| v2.9 | Handoff completeness | Added `PROJECT_VERSION.md` and final v3.0 handoff instructions for Codex/Coding Agents. | file presence checks |
| v3.0 | Final stabilization | Ran the full validation loop: Python preflight, data validation, self-check, production readiness, API/static checks, typecheck, lint, build and HTTP smoke. | `python scripts/verify_v3_0.py` or full `bash scripts/verify_v3_0.sh` |

## Final scope

v3.0 is still a commercial MVP/stabilized skeleton, not a full paid SaaS. It is ready for Codex to continue into database-backed editing, authentication, paid plans, audit logs and real scheduled GitHub/license/privacy update pipelines.

## v3.1 execution-verification patch

| Version | Area | Change | Verification |
|---|---|---|---|
| v3.1 | Clean handoff verification | Added dependency bootstrap, Next build artifact checks, v3.1 wrappers and v3.0 compatibility wrappers. | `python scripts/verify_v3_1.py` |

v3.1 keeps the project as a commercial MVP skeleton, but makes the handoff path more realistic for Codex/new machines because the full verifier can start from a package without `node_modules` or `.next`.
