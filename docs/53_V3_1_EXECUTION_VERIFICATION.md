# Aether Radar v3.1 Execution Verification

v3.1 is a focused execution-stability revision after v3.0. It does not claim to be a full SaaS; it hardens the handoff package so a clean Codex/Coding-Agent environment can bootstrap dependencies, build, smoke-test and regenerate release evidence with one command.

## Fixes added in v3.1

1. Clean-environment verification now installs npm dependencies when `next-app/node_modules` is absent.
2. Full verification is centralized in `scripts/verify_v3_1.py` with Linux/macOS and PowerShell wrappers.
3. Next.js production build output is validated by `scripts/check_next_build_artifacts.py`.
4. v3.0 verification entrypoints are retained as compatibility wrappers that delegate to v3.1.
5. Version metadata is aligned across `project_manifest.json`, `next-app/package.json`, `next-app/lib/version.ts`, OpenAPI JSON, MCP server metadata and HTTP smoke checks.

## Recommended handoff commands

```bash
python scripts/verify_v3_1.py --python-only
python scripts/verify_v3_1.py
```

Linux/macOS wrapper:

```bash
bash scripts/verify_v3_1.sh
```

Windows PowerShell wrapper:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify_v3_1.ps1
```

## Clean package expectations

The release ZIP intentionally excludes `node_modules` and `.next`. The full verifier will restore dependencies with `npm ci` and then rebuild `.next`.

## Remaining SaaS work after v3.1

- Replace seed JSON with a database-backed admin workflow.
- Add authentication, API keys, rate limits and audit logs.
- Add scheduled GitHub/license/privacy data refresh jobs.
- Add paid-plan enforcement and legal review before public commercial launch.
