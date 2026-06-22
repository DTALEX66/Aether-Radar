#!/usr/bin/env python3
"""Validate Aether Radar API surface and version alignment for v3.1."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPECTED_VERSION = "3.1"
EXPECTED_OPENAPI_VERSION = "3.1.0"
API_ROUTES = [
    "/api/status",
    "/api/entities",
    "/api/search",
    "/api/scenarios",
    "/api/risks",
    "/api/export",
    "/api/report",
    "/api/openapi",
]
ROUTE_FILES = {
    "/api/status": "next-app/app/api/status/route.ts",
    "/api/entities": "next-app/app/api/entities/route.ts",
    "/api/search": "next-app/app/api/search/route.ts",
    "/api/scenarios": "next-app/app/api/scenarios/route.ts",
    "/api/risks": "next-app/app/api/risks/route.ts",
    "/api/export": "next-app/app/api/export/route.ts",
    "/api/report": "next-app/app/api/report/route.ts",
    "/api/openapi": "next-app/app/api/openapi/route.ts",
}


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def main() -> int:
    errors: list[str] = []
    version_file = read("next-app/lib/version.ts") if (ROOT / "next-app/lib/version.ts").exists() else ""
    if f"AETHER_VERSION = '{EXPECTED_VERSION}'" not in version_file:
        errors.append("next-app/lib/version.ts version is not v3.1")

    for route, relative in ROUTE_FILES.items():
        path = ROOT / relative
        if not path.exists():
            errors.append(f"missing route file for {route}: {relative}")
            continue
        text = path.read_text(encoding="utf-8")
        if "export async function GET" not in text:
            errors.append(f"{relative} missing GET handler")
        if route != "/api/openapi" and "disclaimer" not in text and "warnings" not in text:
            errors.append(f"{relative} missing disclaimer/warnings metadata")

    openapi_path = ROOT / "next-app/public/openapi.json"
    data_api_path = ROOT / "data/api/openapi.json"
    if not openapi_path.exists():
        errors.append("missing next-app/public/openapi.json")
    else:
        openapi = json.loads(openapi_path.read_text(encoding="utf-8"))
        if openapi.get("openapi") != "3.0.3":
            errors.append("OpenAPI schema version should be 3.0.3")
        if openapi.get("info", {}).get("version") != EXPECTED_OPENAPI_VERSION:
            errors.append("OpenAPI info.version should be 3.1.0")
        for route in API_ROUTES:
            if route not in openapi.get("paths", {}):
                errors.append(f"OpenAPI missing path {route}")
            elif "get" not in openapi["paths"][route]:
                errors.append(f"OpenAPI path {route} missing GET operation")
    if openapi_path.exists() and data_api_path.exists():
        if openapi_path.read_text(encoding="utf-8") != data_api_path.read_text(encoding="utf-8"):
            errors.append("data/api/openapi.json differs from next-app/public/openapi.json")

    entities_route = read("next-app/app/api/entities/route.ts")
    for token in ["parsePositiveInt", "parseNonNegativeInt", "parseSortMode", "hasMore"]:
        if token not in entities_route:
            errors.append(f"entities API missing robust parsing token: {token}")

    next_config = read("next-app/next.config.mjs")
    for token in ["cpus", "staticGenerationMaxConcurrency", "X-Frame-Options", "X-Content-Type-Options", "Permissions-Policy"]:
        if token not in next_config:
            errors.append(f"next.config.mjs missing production token: {token}")

    mcp = read("mcp-server/aether-radar-mcp.mjs")
    if "version: '3.1'" not in mcp or "version: '3.1.0'" not in mcp:
        errors.append("MCP server version is not aligned to v3.1")

    if errors:
        print("FAILED: API contract check")
        print("\n".join(errors))
        return 1
    print("OK: v3.1 API contract/version alignment checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
