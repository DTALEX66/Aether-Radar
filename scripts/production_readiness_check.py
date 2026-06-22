#!/usr/bin/env python3
"""Production-hardening checks for Aether Radar v1.1.

This is intentionally dependency-free and fast. It does not replace a real
`npm run build`; it checks that production-critical files and policies exist.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def exists(path: str) -> bool:
    return (ROOT / path).exists()


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def main() -> int:
    required = [
        "next-app/package-lock.json",
        "next-app/eslint.config.mjs",
        "next-app/scripts/build-ci.mjs",
        "next-app/app/pricing/page.tsx",
        "next-app/app/enterprise/page.tsx",
        "next-app/app/privacy/page.tsx",
        "next-app/app/terms-of-service/page.tsx",
        "database/schema.sql",
        "database/README.md",
        "docs/43_PRODUCTION_BUILD_VERIFICATION.md",
        "docs/44_AUTH_ROLES_AND_PERMISSION_SPEC.md",
        "docs/45_DATABASE_SCHEMA_AND_ADMIN_WORKFLOW.md",
        "docs/46_BILLING_API_KEY_AND_LIMITS_SPEC.md",
        "docs/47_OBSERVABILITY_AND_INCIDENT_RESPONSE.md",
        "docs/48_PRIVACY_TERMS_AND_COMPLIANCE_DRAFT.md",
        "docs/49_GITHUB_METRICS_UPDATE_RUNBOOK.md",
        "docs/50_V1_1_CHANGELOG.md",
        "next-app/lib/version.ts",
        "next-app/lib/api.ts",
        "scripts/api_contract_check.py",
        "scripts/static_site_check.py",
        "scripts/release_manifest.py",
        "scripts/http_smoke_test.py",
        "scripts/check_next_build_artifacts.py",
        "scripts/verify_v3_1.py",
        "scripts/verify_v3_1.sh",
        "scripts/verify_v3_1.ps1",
        "docs/51_V1_2_TO_V3_0_VERSION_LEDGER.md",
        "docs/53_V3_1_EXECUTION_VERIFICATION.md",
        "PROJECT_VERSION.md",
    ]
    errors = [f"missing {path}" for path in required if not exists(path)]

    package = json.loads(read("next-app/package.json"))
    for section in ["dependencies", "devDependencies"]:
        for name, version in package.get(section, {}).items():
            if version in {"latest", "*"} or version.startswith("^") or version.startswith("~"):
                errors.append(f"unpinned dependency: {section}.{name}={version}")

    build_doc = read("docs/43_PRODUCTION_BUILD_VERIFICATION.md") if exists("docs/43_PRODUCTION_BUILD_VERIFICATION.md") else ""
    for keyword in ["npm run typecheck", "npm run lint", "npm run build:ci", "通过"]:
        if keyword not in build_doc:
            errors.append(f"build verification missing keyword: {keyword}")

    schema = read("database/schema.sql") if exists("database/schema.sql") else ""
    for table in ["entities", "users", "api_keys", "audit_logs", "github_metrics"]:
        if not re.search(rf"create table if not exists {table}\b", schema):
            errors.append(f"schema missing table: {table}")

    if exists("next-app/lib/version.ts") and "AETHER_VERSION = '3.1'" not in read("next-app/lib/version.ts"):
        errors.append("version constants are not aligned to v3.1")
    if exists("next-app/next.config.mjs"):
        config = read("next-app/next.config.mjs")
        for keyword in ["cpus", "staticGenerationMaxConcurrency", "X-Frame-Options", "Permissions-Policy"]:
            if keyword not in config:
                errors.append(f"next config missing production setting: {keyword}")

    if errors:
        print("FAILED: production readiness check")
        print("\n".join(errors))
        return 1
    print("OK: v3.1 production readiness checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
