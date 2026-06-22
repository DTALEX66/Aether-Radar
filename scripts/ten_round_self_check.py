#!/usr/bin/env python3
"""Run the highest-value local self-checks for Aether Radar.

Dependency-free by design. This does not replace `npm run build`, but it catches
most cross-tool and data failures before a coding agent spends tokens.
"""
from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
import runpy
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def run(name: str, command: list[str]) -> tuple[str, bool, str]:
    print("    $ " + " ".join(command), flush=True)
    # Run local Python check scripts in-process. This avoids nested subprocess
    # stalls in constrained CI/sandbox runners while preserving their output.
    if len(command) == 2 and Path(command[1]).suffix == ".py" and Path(command[1]).exists():
        old_argv = sys.argv[:]
        sys.argv = [command[1]]
        try:
            try:
                runpy.run_path(str(ROOT / command[1]), run_name="__main__")
                code = 0
            except SystemExit as exc:
                code = int(exc.code or 0) if isinstance(exc.code, int) else 1
        finally:
            sys.argv = old_argv
        return name, code == 0, "OK" if code == 0 else f"exit code {code}"
    result = subprocess.run(command, cwd=ROOT, text=True, timeout=120)
    return name, result.returncode == 0, "OK" if result.returncode == 0 else f"exit code {result.returncode}"


def read_json(path: str):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def check_seed_mirror() -> tuple[str, bool, str]:
    errors = []
    for seed in sorted((ROOT / "data" / "seeds").glob("*.json")):
        mirror = ROOT / "next-app" / "data" / seed.name
        if not mirror.exists():
            errors.append(f"missing mirror {mirror.relative_to(ROOT)}")
        elif sha(seed) != sha(mirror):
            errors.append(f"mirror drift {seed.name}")
    return "seed mirror consistency", not errors, "\n".join(errors) or "OK"


def check_runtime_placeholders() -> tuple[str, bool, str]:
    errors = []
    for base in ["next-app/app", "next-app/components", "next-app/lib", "static-site"]:
        for path in (ROOT / base).rglob("*"):
            if path.is_file() and path.suffix.lower() in {".ts", ".tsx", ".js", ".jsx", ".html", ".css"}:
                text = path.read_text(encoding="utf-8")
                if ("TO" + "DO") in text or ("FIX" + "ME") in text:
                    errors.append(str(path.relative_to(ROOT)))
    return "no runtime placeholder markers", not errors, "\n".join(errors) or "OK"


def check_required_pages() -> tuple[str, bool, str]:
    pages = [
        "next-app/app/page.tsx",
        "next-app/app/tools/page.tsx",
        "next-app/app/tools/[id]/page.tsx",
        "next-app/app/terms/page.tsx",
        "next-app/app/github/page.tsx",
        "next-app/app/risks/page.tsx",
        "next-app/app/scenarios/page.tsx",
        "next-app/app/compare/page.tsx",
        "next-app/app/exports/page.tsx",
        "next-app/app/competitors/page.tsx",
        "next-app/app/about/page.tsx",
        "next-app/app/legal/page.tsx",
        "next-app/app/status/page.tsx",
        "next-app/app/ui/page.tsx",
        "next-app/app/ui-generator/page.tsx",
        "next-app/app/standards/page.tsx",
        "next-app/app/api-docs/page.tsx",
        "next-app/app/stack/page.tsx",
        "next-app/app/report/page.tsx",
        "next-app/app/admin/page.tsx",
        "next-app/app/deploy/page.tsx",
        "next-app/app/pricing/page.tsx",
        "next-app/app/enterprise/page.tsx",
        "next-app/app/privacy/page.tsx",
        "next-app/app/terms-of-service/page.tsx",
        "next-app/app/robots.ts",
        "next-app/app/sitemap.ts",
    ]
    missing = [p for p in pages if not (ROOT / p).exists()]
    return "required MVP pages exist", not missing, "\n".join(missing) or "OK"


def check_pinned_dependencies() -> tuple[str, bool, str]:
    package = read_json("next-app/package.json")
    errors = []
    for section in ["dependencies", "devDependencies"]:
        for name, version in package.get(section, {}).items():
            if version == "latest" or version == "*" or version.startswith("^") or version.startswith("~"):
                errors.append(f"{section}.{name} uses unpinned version {version}")
    return "no unpinned latest dependencies", not errors, "\n".join(errors) or "OK"


def check_core_docs() -> tuple[str, bool, str]:
    docs = [
        "README.md",
        "AGENTS.md",
        "codex/CODEX_START_HERE.md",
        "codex/MINIMAL_PROMPT_FOR_CODEX.md",
        "docs/10_ENCODING_AND_SYNTAX_GUARDRAILS.md",
        "docs/12_AGENT_HANDOFF_PROTOCOL.md",
        "docs/13_DATA_QUALITY_AND_DEDUP_RULES.md",
        "docs/19_UI_GENERATION_SYSTEM.md",
        "docs/20_UI_PAGE_BLUEPRINTS.md",
        "docs/21_DESIGN_TOKENS_AND_COMPONENTS.md",
        "docs/23_MASTER_EXECUTION_SPEC_INDEX.md",
        "STANDARDS_INDEX.md",
        "tests/ACCEPTANCE_TESTS.md",
    ]
    missing = [p for p in docs if not (ROOT / p).exists()]
    return "core handoff docs exist", not missing, "\n".join(missing) or "OK"


def check_export_bom() -> tuple[str, bool, str]:
    text = (ROOT / "next-app" / "components" / "ExportCenter.tsx").read_text(encoding="utf-8")
    ok = "\\ufeff" in text and "toCsv(entities)" in text
    return "CSV export includes UTF-8 BOM", ok, "OK" if ok else "missing BOM wrapper for CSV export"


def check_github_repo_format() -> tuple[str, bool, str]:
    entities = read_json("data/seeds/entities.json")
    repo_re = re.compile(r"^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$")
    repos = [e.get("githubRepo", "").strip() for e in entities if e.get("githubRepo", "").strip()]
    errors = [repo for repo in repos if not repo_re.match(repo)]
    duplicates = sorted({repo for repo in repos if repos.count(repo) > 1})
    errors += [f"duplicate {repo}" for repo in duplicates]
    return "GitHub repo format and uniqueness", not errors, "\n".join(errors) or "OK"


def check_tool_principles() -> tuple[str, bool, str]:
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    needed = ["不只服务 Codex", "不只服务 Obsidian", "收录更多可以做", "Stars 不是质量"]
    missing = [item for item in needed if item not in readme]
    return "product principles preserved", not missing, "\n".join(missing) or "OK"


def check_commercial_fields() -> tuple[str, bool, str]:
    entities = read_json("data/seeds/entities.json")
    required = ["sourceConfidence", "reviewStatus", "pricing", "license", "commercialUse", "dataPrivacy", "recommendedFor", "lastVerifiedAt"]
    errors = []
    for entity in entities:
        missing = [field for field in required if str(entity.get(field, "")).strip() == ""]
        if missing:
            errors.append(f"{entity.get('id')}: missing {', '.join(missing)}")
    return "commercial readiness fields", not errors, "\n".join(errors) or "OK"



def check_ui_generation_system() -> tuple[str, bool, str]:
    required = [
        "data/ui/design_tokens.json",
        "data/ui/component_registry.json",
        "data/ui/page_blueprints.json",
        "data/ui/ui_prompt_blocks.json",
        "next-app/data/ui/design_tokens.json",
        "next-app/data/ui/component_registry.json",
        "next-app/data/ui/page_blueprints.json",
        "next-app/data/ui/ui_prompt_blocks.json",
        "next-app/app/ui/page.tsx",
        "next-app/app/ui-generator/page.tsx",
        "next-app/app/standards/page.tsx",
        "next-app/lib/ui.ts",
        "templates/UI_GENERATION_MASTER_PROMPT.md",
        "templates/UI_PAGE_SPEC_TEMPLATE.md",
        "templates/UI_REVIEW_CHECKLIST.md",
    ]
    missing = [p for p in required if not (ROOT / p).exists()]
    prompts = read_json("data/ui/ui_prompt_blocks.json") if not missing else []
    if prompts and len(prompts) < 3:
        missing.append("need at least 3 UI prompt blocks")
    return "UI generation system exists", not missing, "\n".join(missing) or "OK"



def check_standards_system() -> tuple[str, bool, str]:
    required = [
        "STANDARDS_INDEX.md",
        "docs/23_MASTER_EXECUTION_SPEC_INDEX.md",
        "docs/24_PRODUCT_EXECUTION_STANDARD.md",
        "docs/25_BRAND_EXECUTION_STANDARD.md",
        "docs/26_UI_DESIGN_EXECUTION_STANDARD.md",
        "docs/27_CONTENT_AND_COPYWRITING_STANDARD.md",
        "docs/28_ENGINEERING_EXECUTION_STANDARD.md",
        "docs/29_DATA_AND_TAXONOMY_GOVERNANCE_STANDARD.md",
        "docs/30_SECURITY_PRIVACY_LEGAL_STANDARD.md",
        "docs/31_RELEASE_AND_COMMERCIAL_OPERATION_STANDARD.md",
        "docs/32_FUTURE_PRODUCT_ROADMAP_AND_EXPANSION_MAP.md",
        "docs/33_V0_8_STANDARDS_AUDIT_REPORT.md",
        "templates/BRAND_PAGE_BRIEF_TEMPLATE.md",
        "templates/ENGINEERING_TASK_SPEC_TEMPLATE.md",
    ]
    missing = [p for p in required if not (ROOT / p).exists()]
    master = (ROOT / "docs/23_MASTER_EXECUTION_SPEC_INDEX.md").read_text(encoding="utf-8") if not missing else ""
    required_keywords = ["产品", "品牌", "UI", "内容", "工程", "数据", "安全", "发布", "未来"]
    for keyword in required_keywords:
        if keyword not in master:
            missing.append(f"master index missing keyword: {keyword}")
    return "execution standards system exists", not missing, "\n".join(missing) or "OK"



def check_api_mcp_export_system() -> tuple[str, bool, str]:
    required = [
        "next-app/app/api/entities/route.ts",
        "next-app/app/api/search/route.ts",
        "next-app/app/api/status/route.ts",
        "next-app/app/api/export/route.ts",
        "next-app/app/api/scenarios/route.ts",
        "next-app/app/api/risks/route.ts",
        "next-app/public/exports/aether-radar-export.xlsx",
        "next-app/app/api-docs/page.tsx",
        "mcp-server/aether-radar-mcp.mjs",
        "mcp-server/README.md",
        "docs/35_API_MCP_AND_EXPORT_SPEC.md",
        "docs/36_V0_9_CHANGELOG.md",
    ]
    missing = [p for p in required if not (ROOT / p).exists()]
    export_center = (ROOT / "next-app/components/ExportCenter.tsx").read_text(encoding="utf-8")
    for keyword in ["Excel/XLSX", "/api/status", "/api/export?format=xlsx"]:
        if keyword not in export_center:
            missing.append(f"ExportCenter missing {keyword}")
    mcp = (ROOT / "mcp-server/aether-radar-mcp.mjs").read_text(encoding="utf-8") if (ROOT / "mcp-server/aether-radar-mcp.mjs").exists() else ""
    for keyword in ["tools/list", "tools/call", "search_entities", "data_status"]:
        if keyword not in mcp:
            missing.append(f"MCP prototype missing {keyword}")
    return "API/MCP/export system exists", not missing, "\n".join(missing) or "OK"


def check_v1_commercial_demo_system() -> tuple[str, bool, str]:
    required = [
        "next-app/app/stack/page.tsx",
        "next-app/app/report/page.tsx",
        "next-app/app/admin/page.tsx",
        "next-app/app/deploy/page.tsx",
        "next-app/app/api/report/route.ts",
        "next-app/app/api/openapi/route.ts",
        "next-app/public/openapi.json",
        "data/api/openapi.json",
        "Dockerfile",
        "docker-compose.yml",
        "vercel.json",
        ".github/workflows/build.yml",
        "scripts/commercial_smoke_test.py",
        "docs/38_DEPLOYMENT_AND_RELEASE_RUNBOOK.md",
        "docs/39_V1_0_COMMERCIAL_DEMO_CHECKLIST.md",
        "docs/40_ENTERPRISE_AND_SAAS_ARCHITECTURE.md",
        "docs/41_REPORT_AND_TOOL_STACK_SPEC.md",
        "docs/42_V1_0_CHANGELOG.md",
    ]
    missing = [p for p in required if not (ROOT / p).exists()]
    layout = (ROOT / "next-app/app/layout.tsx").read_text(encoding="utf-8")
    for keyword in ["工具栈", "报告", "审核", "部署"]:
        if keyword not in layout:
            missing.append(f"layout missing {keyword}")
    openapi = read_json("next-app/public/openapi.json") if (ROOT / "next-app/public/openapi.json").exists() else {}
    for endpoint in ["/api/status", "/api/entities", "/api/export", "/api/report", "/api/openapi"]:
        if endpoint not in openapi.get("paths", {}):
            missing.append(f"openapi missing {endpoint}")
    return "v1.0 commercial demo system exists", not missing, "\n".join(missing) or "OK"


def check_v11_production_hardening() -> tuple[str, bool, str]:
    required = [
        "next-app/package-lock.json",
        "next-app/eslint.config.mjs",
        "database/schema.sql",
        "docs/43_PRODUCTION_BUILD_VERIFICATION.md",
        "docs/44_AUTH_ROLES_AND_PERMISSION_SPEC.md",
        "docs/45_DATABASE_SCHEMA_AND_ADMIN_WORKFLOW.md",
        "docs/46_BILLING_API_KEY_AND_LIMITS_SPEC.md",
        "docs/47_OBSERVABILITY_AND_INCIDENT_RESPONSE.md",
        "docs/48_PRIVACY_TERMS_AND_COMPLIANCE_DRAFT.md",
        "docs/49_GITHUB_METRICS_UPDATE_RUNBOOK.md",
        "docs/50_V1_1_CHANGELOG.md",
        "scripts/production_readiness_check.py",
    ]
    missing = [p for p in required if not (ROOT / p).exists()]
    return "v1.1 production hardening system exists", not missing, "\n".join(missing) or "OK"


def check_v31_stabilization_system() -> tuple[str, bool, str]:
    required = [
        "next-app/lib/version.ts",
        "next-app/lib/api.ts",
        "scripts/api_contract_check.py",
        "scripts/static_site_check.py",
        "scripts/release_manifest.py",
        "scripts/http_smoke_test.py",
        "scripts/verify_v3_1.py",
        "scripts/verify_v3_1.sh",
        "scripts/verify_v3_1.ps1",
        "scripts/check_next_build_artifacts.py",
        "docs/51_V1_2_TO_V3_0_VERSION_LEDGER.md",
        "docs/52_V3_0_FINAL_HANDOFF.md",
        "docs/53_V3_1_EXECUTION_VERIFICATION.md",
        "PROJECT_VERSION.md",
    ]
    missing = [p for p in required if not (ROOT / p).exists()]
    version_text = (ROOT / "next-app/lib/version.ts").read_text(encoding="utf-8") if (ROOT / "next-app/lib/version.ts").exists() else ""
    if "AETHER_VERSION = '3.1'" not in version_text:
        missing.append("version constants are not aligned to v3.1")
    next_config = (ROOT / "next-app/next.config.mjs").read_text(encoding="utf-8") if (ROOT / "next-app/next.config.mjs").exists() else ""
    for keyword in ["cpus", "staticGenerationMaxConcurrency", "X-Frame-Options", "Permissions-Policy"]:
        if keyword not in next_config:
            missing.append(f"next.config.mjs missing {keyword}")
    return "v3.1 stabilization system exists", not missing, "\n".join(missing) or "OK"


def main() -> int:
    """Run checks one by one and stream progress.

    Earlier versions built the whole checks list eagerly before printing any
    output. In slow or resource-constrained CI/sandbox environments that looked
    like a hang, even when checks were still working. This lazy runner makes the
    full-directory flow observable and prevents no-output watchdog timeouts.
    """
    checks = [
        ("encoding and syntax preflight", lambda: run("encoding and syntax preflight", [sys.executable, "scripts/check_encoding_syntax.py"])),
        ("data validation", lambda: run("data validation", [sys.executable, "scripts/validate_data.py"])),
        ("seed mirror consistency", check_seed_mirror),
        ("no runtime placeholder markers", check_runtime_placeholders),
        ("required MVP pages exist", check_required_pages),
        ("no unpinned latest dependencies", check_pinned_dependencies),
        ("core handoff docs exist", check_core_docs),
        ("CSV export includes UTF-8 BOM", check_export_bom),
        ("GitHub repo format and uniqueness", check_github_repo_format),
        ("product principles preserved", check_tool_principles),
        ("commercial readiness fields", check_commercial_fields),
        ("UI generation system exists", check_ui_generation_system),
        ("execution standards system exists", check_standards_system),
        ("API/MCP/export system exists", check_api_mcp_export_system),
        ("v1.0 commercial demo system exists", check_v1_commercial_demo_system),
        ("commercial smoke test", lambda: run("commercial smoke test", [sys.executable, "scripts/commercial_smoke_test.py"])),
        ("v1.1 production hardening system exists", check_v11_production_hardening),
        ("production readiness check", lambda: run("production readiness check", [sys.executable, "scripts/production_readiness_check.py"])),
        ("API contract check", lambda: run("API contract check", [sys.executable, "scripts/api_contract_check.py"])),
        ("static site check", lambda: run("static site check", [sys.executable, "scripts/static_site_check.py"])),
        ("v3.1 stabilization system exists", check_v31_stabilization_system),
    ]
    failures = []
    for index, (display_name, check) in enumerate(checks, start=1):
        print(f"{index:02d}. RUN  - {display_name}", flush=True)
        name, ok, output = check()
        status = "PASS" if ok else "FAIL"
        print(f"{index:02d}. {status} - {name}", flush=True)
        if output:
            print(output, flush=True)
        if not ok:
            failures.append(name)
    if failures:
        print("\nFAILED: " + ", ".join(failures), flush=True)
        return 1
    print("\nOK: all self-checks passed", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
