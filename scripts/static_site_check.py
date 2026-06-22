#!/usr/bin/env python3
"""Static site sanity checks for Aether Radar commercial demo pages."""
from __future__ import annotations

import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STATIC = ROOT / "static-site"
REQUIRED_PAGES = {
    "index.html",
    "tools.html",
    "terms.html",
    "github.html",
    "risks.html",
    "scenarios.html",
    "compare.html",
    "competitors.html",
    "exports.html",
    "stack.html",
    "report.html",
    "admin.html",
    "deploy.html",
    "pricing.html",
    "enterprise.html",
    "api-docs.html",
    "standards.html",
    "privacy.html",
    "terms-of-service.html",
}

class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []
    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "a":
            return
        for key, value in attrs:
            if key == "href" and value:
                self.links.append(value)


def main() -> int:
    errors: list[str] = []
    if not STATIC.exists():
        print("FAILED: missing static-site directory")
        return 1
    existing = {p.name for p in STATIC.glob("*.html")}
    for page in sorted(REQUIRED_PAGES):
        if page not in existing:
            errors.append(f"missing static page: {page}")
    for html_path in sorted(STATIC.glob("*.html")):
        text = html_path.read_text(encoding="utf-8")
        if not text.strip().lower().startswith("<!doctype html>"):
            errors.append(f"{html_path.name}: missing <!doctype html>")
        for banned in [("TO" + "DO"), ("FIX" + "ME"), "Lorem ipsum"]:
            if banned in text:
                errors.append(f"{html_path.name}: contains placeholder token {banned}")
        parser = LinkParser()
        parser.feed(text)
        for href in parser.links:
            if href.startswith(("http://", "https://", "mailto:", "#", "/api/")):
                continue
            clean = href.split("#", 1)[0].split("?", 1)[0]
            if not clean:
                continue
            if clean.startswith("/"):
                clean = clean.strip("/") or "index.html"
                if not clean.endswith(".html"):
                    clean = f"{clean}.html"
            if clean.endswith("/"):
                clean = clean + "index.html"
            if clean.endswith(".html") and not (STATIC / clean).exists():
                errors.append(f"{html_path.name}: broken local link {href}")
    if errors:
        print("FAILED: static site check")
        print("\n".join(errors))
        return 1
    print(f"OK: static-site checks passed ({len(existing)} html pages)")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
