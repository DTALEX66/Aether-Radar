#!/usr/bin/env python3
"""Start the built Next.js app and smoke-test core pages/API endpoints."""
from __future__ import annotations

import json
import os
import signal
import subprocess
import sys
import time
from pathlib import Path
from urllib.request import urlopen
from urllib.error import URLError, HTTPError

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "next-app"
PORT = int(os.environ.get("AETHER_SMOKE_PORT", "4173"))
BASE = f"http://127.0.0.1:{PORT}"
ENDPOINTS = [
    ("/", "text/html"),
    ("/tools", "text/html"),
    ("/status", "text/html"),
    ("/api/status", "application/json"),
    ("/api/entities?limit=3&offset=0", "application/json"),
    ("/api/entities?limit=bad&offset=bad", "application/json"),
    ("/api/search?q=ollama&limit=5", "application/json"),
    ("/api/risks", "application/json"),
    ("/api/scenarios", "application/json"),
    ("/api/export?format=json", "application/json"),
    ("/api/report?format=json", "application/json"),
    ("/api/openapi", "application/json"),
]


def fetch(path: str) -> tuple[int, str, bytes]:
    with urlopen(BASE + path, timeout=15) as response:
        return response.status, response.headers.get("content-type", ""), response.read()


def wait_for_server(proc: subprocess.Popen[bytes]) -> None:
    deadline = time.time() + 60
    last_error: Exception | None = None
    while time.time() < deadline:
        if proc.poll() is not None:
            raise RuntimeError(f"next start exited early with code {proc.returncode}")
        try:
            status, _, _ = fetch("/api/status")
            if status == 200:
                return
        except Exception as exc:  # noqa: BLE001 - smoke test records last error
            last_error = exc
            time.sleep(1)
    raise RuntimeError(f"server did not become ready: {last_error}")


def main() -> int:
    if not (APP / ".next").exists():
        print("FAILED: next-app/.next missing; run npm run build:ci first")
        return 1
    env = {**os.environ, "PORT": str(PORT), "NEXT_TELEMETRY_DISABLED": "1"}
    proc = subprocess.Popen(["npm", "run", "start"], cwd=APP, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, env=env)
    errors: list[str] = []
    try:
        wait_for_server(proc)
        for path, expected_type in ENDPOINTS:
            try:
                status, content_type, body = fetch(path)
                if status != 200:
                    errors.append(f"{path}: status {status}")
                if expected_type not in content_type:
                    errors.append(f"{path}: expected content-type containing {expected_type}, got {content_type}")
                if expected_type == "application/json":
                    data = json.loads(body.decode("utf-8"))
                    if path.startswith("/api/status") and data.get("version") != "3.1":
                        errors.append("/api/status: version is not 3.1")
                    if path.startswith("/api/entities") and "meta" not in data:
                        errors.append(f"{path}: missing meta")
            except HTTPError as exc:
                errors.append(f"{path}: HTTP {exc.code}")
            except URLError as exc:
                errors.append(f"{path}: URL error {exc}")
            except Exception as exc:  # noqa: BLE001
                errors.append(f"{path}: {exc}")
    finally:
        proc.send_signal(signal.SIGTERM)
        try:
            proc.wait(timeout=10)
        except subprocess.TimeoutExpired:
            proc.kill()
    if errors:
        print("FAILED: HTTP smoke test")
        print("\n".join(errors))
        return 1
    print(f"OK: HTTP smoke tests passed ({len(ENDPOINTS)} endpoints/pages)")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
