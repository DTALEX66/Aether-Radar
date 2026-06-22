#!/usr/bin/env python3
"""Run Aether Radar v3.1 verification.

Default mode performs the full clean-environment handoff loop: Python checks,
Node dependency bootstrap, seed sync, typecheck, lint, production build, build
artifact validation, HTTP smoke test and release manifest refresh.
"""
from __future__ import annotations

import argparse
import os
import platform
import shutil
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "next-app"
NPM = "npm.cmd" if platform.system().lower().startswith("win") else "npm"
NODE = "node.exe" if platform.system().lower().startswith("win") else "node"
BIN_SUFFIX = ".cmd" if platform.system().lower().startswith("win") else ""
TSC = str(APP / "node_modules" / ".bin" / ("tsc" + BIN_SUFFIX))
ESLINT = str(APP / "node_modules" / ".bin" / ("eslint" + BIN_SUFFIX))

PYTHON_CHECKS = [
    [sys.executable, "scripts/check_encoding_syntax.py"],
    [sys.executable, "scripts/validate_data.py"],
    [sys.executable, "scripts/ten_round_self_check.py"],
    [sys.executable, "scripts/production_readiness_check.py"],
    [sys.executable, "scripts/commercial_smoke_test.py"],
    [sys.executable, "scripts/api_contract_check.py"],
    [sys.executable, "scripts/static_site_check.py"],
]
NODE_CHECKS = [
    [NODE, "scripts/sync-seeds.mjs"],
    [TSC, "--noEmit"],
    [ESLINT, "."],
    [NODE, "scripts/build-ci.mjs"],
]
POST_BUILD_CHECKS = [
    [sys.executable, "scripts/check_next_build_artifacts.py"],
    [sys.executable, "scripts/http_smoke_test.py"],
    [sys.executable, "scripts/release_manifest.py"],
]


def run(cmd: list[str], cwd: Path = ROOT, timeout: int = 300) -> None:
    print("\n$ " + " ".join(cmd), flush=True)
    env = {
        **os.environ,
        "CI": "1",
        "NEXT_TELEMETRY_DISABLED": "1",
        "AETHER_BUILD_TIMEOUT_MS": os.environ.get("AETHER_BUILD_TIMEOUT_MS", "600000"),
        "PYTHONUNBUFFERED": "1",
    }
    proc = subprocess.Popen(cmd, cwd=cwd, stdin=subprocess.DEVNULL, env=env)
    deadline = time.time() + timeout
    while True:
        code = proc.poll()
        if code is not None:
            if code != 0:
                raise SystemExit(code)
            return
        if time.time() > deadline:
            proc.kill()
            raise SystemExit(f"FAILED: command timed out after {timeout}s: {' '.join(cmd)}")
        print("... still running", flush=True)
        time.sleep(15)


def ensure_node_dependencies() -> None:
    required = APP / "node_modules" / ".bin" / ("next.cmd" if platform.system().lower().startswith("win") else "next")
    if required.exists():
        print("\nOK: npm dependencies already installed")
        return
    if not shutil.which(NPM):
        raise SystemExit("FAILED: npm is not available; install Node.js 20+ before running full verification")
    run([NPM, "ci", "--ignore-scripts", "--no-audit", "--no-fund"], cwd=APP, timeout=900)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--python-only", action="store_true", help="Run dependency-free Python/static checks only")
    parser.add_argument("--skip-http", action="store_true", help="Skip next start HTTP smoke test")
    parser.add_argument("--skip-release", action="store_true", help="Skip release manifest refresh")
    args = parser.parse_args()

    for cmd in PYTHON_CHECKS:
        run(cmd, timeout=300)
    if args.python_only:
        print("\nOK: v3.1 Python/static verification passed")
        return 0

    ensure_node_dependencies()
    for cmd in NODE_CHECKS:
        timeout = 900 if "build-ci" in " ".join(cmd) else 300
        run(cmd, cwd=APP, timeout=timeout)
    for cmd in POST_BUILD_CHECKS:
        joined = " ".join(cmd)
        if args.skip_http and "http_smoke_test.py" in joined:
            continue
        if args.skip_release and "release_manifest.py" in joined:
            continue
        run(cmd, timeout=300)
    print("\nOK: v3.1 full verification passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
