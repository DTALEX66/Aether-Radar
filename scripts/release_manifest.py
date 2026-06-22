#!/usr/bin/env python3
"""Generate v3.1 release manifest and verification evidence."""
from __future__ import annotations

import hashlib
import json
import os
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "release_artifacts"
INCLUDE_EXT = {".md", ".json", ".ts", ".tsx", ".mjs", ".py", ".html", ".css", ".sql", ".yml", ".yaml", ".ps1", ".sh"}
EXCLUDE_DIRS = {"node_modules", ".next", ".git", "release_artifacts"}


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def main() -> int:
    OUT.mkdir(exist_ok=True)
    manifest = json.loads((ROOT / "project_manifest.json").read_text(encoding="utf-8"))
    entities = json.loads((ROOT / "data/seeds/entities.json").read_text(encoding="utf-8"))
    categories = json.loads((ROOT / "data/seeds/categories.json").read_text(encoding="utf-8"))
    scenarios = json.loads((ROOT / "data/seeds/scenarios.json").read_text(encoding="utf-8"))
    files = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS and not d.startswith(".") or d in {".github", ".vscode"}]
        current = Path(dirpath)
        for filename in sorted(filenames):
            path = current / filename
            rel = path.relative_to(ROOT)
            if any(part in EXCLUDE_DIRS for part in rel.parts):
                continue
            if path.suffix.lower() in INCLUDE_EXT or rel.as_posix() in {"Dockerfile", "vercel.json", "project_manifest.json"}:
                files.append({"path": rel.as_posix(), "sha256": sha256(path), "bytes": path.stat().st_size})
    evidence = {
        "name": "Aether Radar",
        "version": manifest.get("version"),
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "status": manifest.get("status"),
        "counts": {
            "entities": len(entities),
            "categories": len(categories),
            "scenarios": len(scenarios),
            "trackedFiles": len(files),
        },
        "qualityGates": manifest.get("quality_gates", []),
        "checks": [
            "python scripts/check_encoding_syntax.py",
            "python scripts/validate_data.py",
            "python scripts/ten_round_self_check.py",
            "python scripts/production_readiness_check.py",
            "python scripts/commercial_smoke_test.py",
            "python scripts/api_contract_check.py",
            "python scripts/static_site_check.py",
            "cd next-app && npm run typecheck && npm run lint && npm run build:ci",
            "python scripts/check_next_build_artifacts.py",
            "python scripts/http_smoke_test.py",
        ],
        "files": files,
    }
    (OUT / "v3_1_release_manifest.json").write_text(json.dumps(evidence, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    md = [
        "# Aether Radar v3.1 Release Manifest",
        "",
        f"- Version: {evidence['version']}",
        f"- Status: {evidence['status']}",
        f"- Generated: {evidence['generatedAt']}",
        f"- Entities: {len(entities)}",
        f"- Categories: {len(categories)}",
        f"- Scenarios: {len(scenarios)}",
        f"- Tracked files: {len(files)}",
        "",
        "## Required verification commands",
        "",
        *[f"- `{item}`" for item in evidence["checks"]],
        "",
        "## Notes",
        "",
        "This manifest excludes node_modules, .next, .git and generated release_artifacts from the file hash list.",
    ]
    (OUT / "v3_1_release_manifest.md").write_text("\n".join(md) + "\n", encoding="utf-8")
    print(f"OK: release manifest generated with {len(files)} tracked files")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
