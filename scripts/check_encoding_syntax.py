#!/usr/bin/env python3
"""Top-priority cross-client guardrail for Aether Radar.

Run this before handing the repo between ChatGPT web, Codex desktop, Cursor,
Claude Code, Cline, VS Code, Windows terminals, and GitHub web edits.
It prevents common failures caused by broken UTF-8, stray NUL bytes, malformed
JSON, Python syntax errors, and accidentally committed unfinished placeholders in the
MVP surface.
"""
from __future__ import annotations

import json
import py_compile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEXT_SUFFIXES = {
    ".md",
    ".txt",
    ".json",
    ".csv",
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".css",
    ".html",
    ".py",
    ".yml",
    ".yaml",
}
SKIP_PARTS = {"node_modules", ".git", ".next", "dist", "build", "__pycache__", "data/raw"}
PLACEHOLDER_ALLOWED_PREFIXES = ("docs/", "codex/", "tests/", "templates/")


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def should_skip(path: Path) -> bool:
    parts = set(path.relative_to(ROOT).parts)
    return bool(parts & SKIP_PARTS)


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    for path in sorted(ROOT.rglob("*")):
        if not path.is_file() or should_skip(path):
            continue
        if path.suffix.lower() not in TEXT_SUFFIXES:
            continue

        name = rel(path)
        raw = path.read_bytes()
        if b"\x00" in raw:
            errors.append(f"{name}: contains NUL bytes")
            continue
        try:
            text = raw.decode("utf-8")
        except UnicodeDecodeError as exc:
            errors.append(f"{name}: not valid UTF-8 ({exc})")
            continue

        if text.startswith("\ufeff"):
            warnings.append(f"{name}: has UTF-8 BOM; prefer UTF-8 without BOM")
        if chr(0xFFFD) in text:
            errors.append(f"{name}: contains replacement character U+FFFD, possible encoding corruption")
        if "\r\n" in text:
            warnings.append(f"{name}: CRLF line endings detected; prefer LF to reduce cross-tool diffs")
        if ("TO" + "DO" in text or "FIX" + "ME" in text) and not name.startswith(PLACEHOLDER_ALLOWED_PREFIXES):
            errors.append(f"{name}: contains unfinished placeholder marker in runtime surface")

        if path.suffix.lower() == ".json":
            try:
                json.loads(text)
            except json.JSONDecodeError as exc:
                errors.append(f"{name}: invalid JSON at line {exc.lineno}, column {exc.colno}: {exc.msg}")

        if path.suffix.lower() == ".py":
            try:
                py_compile.compile(str(path), doraise=True)
            except py_compile.PyCompileError as exc:
                errors.append(f"{name}: Python syntax error: {exc.msg}")

    if warnings:
        print("Warnings:")
        print("\n".join(warnings))
    if errors:
        print("Errors:")
        print("\n".join(errors))
        return 1

    print("OK: encoding/syntax preflight passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
