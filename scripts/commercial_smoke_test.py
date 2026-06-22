#!/usr/bin/env python3
"""Commercial-demo smoke checks for Aether Radar v1.0.

Dependency-free. This checks files and route surfaces that make the package useful
as a commercial demonstration build even before a production database exists.
"""
from __future__ import annotations

from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]

REQUIRED = [
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
    "docs/38_DEPLOYMENT_AND_RELEASE_RUNBOOK.md",
    "docs/39_V1_0_COMMERCIAL_DEMO_CHECKLIST.md",
    "docs/40_ENTERPRISE_AND_SAAS_ARCHITECTURE.md",
    "docs/41_REPORT_AND_TOOL_STACK_SPEC.md",
    "docs/42_V1_0_CHANGELOG.md",
]

TEXT_EXPECTATIONS = {
    "next-app/components/ToolStackManager.tsx": ["localStorage", "导出 JSON", "导出 Markdown", "window.print"],
    "next-app/components/ReportBuilder.tsx": ["下载 Markdown 报告", "window.print", "选型报告"],
    "next-app/components/AuditDashboard.tsx": ["字段完整性", "高风险关注", "低可信"],
    "next-app/app/layout.tsx": ["工具栈", "报告", "审核", "部署"],
    "next-app/app/api-docs/page.tsx": ["/api/report", "/api/openapi", "OpenAPI"],
}


def main() -> int:
    errors: list[str] = []
    for item in REQUIRED:
        if not (ROOT / item).exists():
            errors.append(f"missing {item}")
    for file, keywords in TEXT_EXPECTATIONS.items():
        path = ROOT / file
        if not path.exists():
            errors.append(f"missing {file}")
            continue
        text = path.read_text(encoding="utf-8")
        for keyword in keywords:
            if keyword not in text:
                errors.append(f"{file} missing keyword {keyword}")
    openapi_path = ROOT / "next-app/public/openapi.json"
    if openapi_path.exists():
        data = json.loads(openapi_path.read_text(encoding="utf-8"))
        for path in ["/api/status", "/api/entities", "/api/export", "/api/report", "/api/openapi"]:
            if path not in data.get("paths", {}):
                errors.append(f"openapi missing {path}")
    if errors:
        print("Errors:")
        print("\n".join(errors))
        return 1
    print("OK: v1.0 commercial demo smoke checks passed")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
