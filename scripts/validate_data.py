#!/usr/bin/env python3
"""Validate Aether Radar seed data.

This script intentionally stays dependency-free so every coding tool can run it
before editing. It catches the common cross-client problems: broken UTF-8,
malformed JSON, duplicate IDs, missing required fields, and invalid category
references.
"""
from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
SEEDS = ROOT / "data" / "seeds"

REQUIRED_ENTITY_FIELDS = [
    "id",
    "name",
    "literal",
    "cn",
    "category",
    "type",
    "summary",
    "value",
    "riskLevel",
    "riskNote",
    "heatLevel",
    "url",
    "sourceType",
    "sourceConfidence",
    "reviewStatus",
    "lastVerifiedAt",
    "pricing",
    "license",
    "commercialUse",
    "dataPrivacy",
    "recommendedFor",
]
VALID_RISK_LEVELS = {"低", "中", "高", "未知"}
VALID_HEAT_LEVELS = {"SSS", "SS", "S", "A", "B", "C", "待核验", "无需热度"}
VALID_SOURCE_CONFIDENCE = {"高", "中", "低", "未知"}
GITHUB_RE = re.compile(r"^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$")


def read_json(path: Path) -> Any:
    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError as exc:
        raise ValueError(f"{path.relative_to(ROOT)} is not valid UTF-8: {exc}") from exc
    try:
        return json.loads(text)
    except json.JSONDecodeError as exc:
        raise ValueError(
            f"{path.relative_to(ROOT)} has invalid JSON at line {exc.lineno}, column {exc.colno}: {exc.msg}"
        ) from exc


def require_list(name: str) -> list[dict[str, Any]]:
    data = read_json(SEEDS / f"{name}.json")
    if not isinstance(data, list):
        raise ValueError(f"data/seeds/{name}.json must be a list")
    return data


def main() -> int:
    errors: list[str] = []
    entities = require_list("entities")
    categories = require_list("categories")
    terms = require_list("terms")
    scenarios = require_list("scenarios")
    comparisons = require_list("comparisons")
    risks = require_list("risk_taxonomy")

    category_ids = {str(c.get("id", "")).strip() for c in categories}
    category_ids.discard("")

    ids: list[str] = []
    names: list[str] = []
    github_repos: list[str] = []
    for index, entity in enumerate(entities, start=1):
        entity_id = str(entity.get("id", "")).strip()
        ids.append(entity_id)
        names.append(str(entity.get("name", "")).strip())
        github_repo = str(entity.get("githubRepo", "")).strip()
        if github_repo:
            github_repos.append(github_repo)
            if not GITHUB_RE.match(github_repo):
                errors.append(f"entities[{index}] {entity_id}: invalid githubRepo {github_repo!r}; expected owner/repo")
        if entity.get("url") and not str(entity.get("url")).startswith(("https://", "http://")):
            errors.append(f"entities[{index}] {entity_id}: source url must start with http(s)")
        for field in REQUIRED_ENTITY_FIELDS:
            if str(entity.get(field, "")).strip() == "":
                errors.append(f"entities[{index}] {entity_id or '<missing id>'}: missing {field}")
        if entity.get("category") not in category_ids:
            errors.append(f"entities[{index}] {entity_id}: unknown category {entity.get('category')!r}")
        if entity.get("riskLevel") not in VALID_RISK_LEVELS:
            errors.append(f"entities[{index}] {entity_id}: invalid riskLevel {entity.get('riskLevel')!r}")
        if entity.get("heatLevel") not in VALID_HEAT_LEVELS:
            errors.append(f"entities[{index}] {entity_id}: invalid heatLevel {entity.get('heatLevel')!r}")
        if entity.get("sourceConfidence") not in VALID_SOURCE_CONFIDENCE:
            errors.append(f"entities[{index}] {entity_id}: invalid sourceConfidence {entity.get('sourceConfidence')!r}")
        if entity.get("riskTags") is not None and not isinstance(entity.get("riskTags"), list):
            errors.append(f"entities[{index}] {entity_id}: riskTags must be a list")
        if entity.get("riskLevel") == "高" and len(str(entity.get("riskNote", "")).strip()) < 8:
            errors.append(f"entities[{index}] {entity_id}: high risk entity needs a clear riskNote")

    for label, values in [("entity id", ids), ("entity name", names), ("githubRepo", github_repos)]:
        for item, count in sorted(Counter(v for v in values if v).items()):
            if count > 1:
                errors.append(f"duplicate {label}: {item}")

    used_categories = {str(entity.get("category", "")).strip() for entity in entities}
    unused_categories = sorted(category_ids - used_categories)
    if unused_categories:
        print("Warnings:")
        print("unused categories: " + ", ".join(unused_categories))

    for index, category in enumerate(categories, start=1):
        if not str(category.get("id", "")).strip() or not str(category.get("name", "")).strip():
            errors.append(f"categories[{index}]: missing id or name")

    for index, term in enumerate(terms, start=1):
        if not str(term.get("term", "")).strip() or not str(term.get("summary", "")).strip():
            errors.append(f"terms[{index}]: missing term or summary")

    for index, scenario in enumerate(scenarios, start=1):
        if not str(scenario.get("id", "")).strip() or not isinstance(scenario.get("stack"), list):
            errors.append(f"scenarios[{index}]: missing id or stack list")

    for index, comparison in enumerate(comparisons, start=1):
        if not str(comparison.get("id", "")).strip() or not str(comparison.get("decision", "")).strip():
            errors.append(f"comparisons[{index}]: missing id or decision")

    for index, risk in enumerate(risks, start=1):
        if not str(risk.get("id", "")).strip() or not str(risk.get("description", "")).strip():
            errors.append(f"risk_taxonomy[{index}]: missing id or description")

    github_count = sum(1 for entity in entities if entity.get("githubRepo"))
    print(
        f"entities={len(entities)} categories={len(categories)} terms={len(terms)} "
        f"github={github_count} scenarios={len(scenarios)} comparisons={len(comparisons)} risks={len(risks)}"
    )

    if errors:
        print("\n".join(errors))
        return 1

    print("OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
