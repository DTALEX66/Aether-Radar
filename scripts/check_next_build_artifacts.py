#!/usr/bin/env python3
"""Verify that a Next.js production build produced runnable artifacts."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "next-app"
NEXT = APP / ".next"
REQUIRED_FILES = [
    ".next/BUILD_ID",
    ".next/routes-manifest.json",
    ".next/prerender-manifest.json",
    ".next/server/app-paths-manifest.json",
]
REQUIRED_ROUTES = ["/", "/tools", "/status", "/api/status", "/api/openapi"]


def main() -> int:
    errors: list[str] = []
    for rel in REQUIRED_FILES:
        path = APP / rel
        if not path.exists() or path.stat().st_size == 0:
            errors.append(f"missing or empty build artifact: next-app/{rel}")
    if (NEXT / "routes-manifest.json").exists():
        routes = json.loads((NEXT / "routes-manifest.json").read_text(encoding="utf-8"))
        static_routes = {item.get("page") for item in routes.get("staticRoutes", [])}
        dynamic_routes = {item.get("page") for item in routes.get("dynamicRoutes", [])}
        all_routes = static_routes | dynamic_routes
        for route in REQUIRED_ROUTES:
            if route not in all_routes:
                errors.append(f"routes-manifest missing {route}")
    if (NEXT / "prerender-manifest.json").exists():
        prerender = json.loads((NEXT / "prerender-manifest.json").read_text(encoding="utf-8"))
        if "/tools/toolify" not in prerender.get("routes", {}):
            errors.append("prerender-manifest missing sample SSG tool route /tools/toolify")
    if errors:
        print("FAILED: Next build artifact check")
        print("\n".join(errors))
        return 1
    print("OK: Next build artifacts are present and route manifests contain core paths")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
