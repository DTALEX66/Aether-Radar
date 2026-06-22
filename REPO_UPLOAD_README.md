# Aether Radar v3.1 Repository Upload Notes

This package is repository-ready source code for Aether Radar v3.1.

## What is included

- Product documentation, standards, version ledger, and Codex handoff docs
- Next.js application source under `next-app/`
- Static site source under `static-site/`
- Data seeds and raw knowledge-base assets under `data/`
- API/MCP/database/ops/scripts/tests directories
- Verification scripts and release artifacts

## What is intentionally excluded from the ZIP

- `next-app/node_modules/`
- `next-app/.next/`
- Python `__pycache__/`
- local caches and logs

These files should be regenerated after cloning or uploading the repository.

## First verification after repository upload

Linux/macOS:

```bash
bash scripts/verify_v3_1.sh
```

Windows PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify_v3_1.ps1
```

Dependency-free Python subset:

```bash
python scripts/verify_v3_1.py --skip-npm
```

## Node version recommendation

Use Node.js 20 LTS for the cleanest Next.js build behavior.

## Current status

- Version: v3.1
- Status: execution-verified commercial MVP / Codex-ready
- Last full directory flow: see `release_artifacts/V3_1_DIRECTORY_FLOW_EXECUTION_LOG.md`
