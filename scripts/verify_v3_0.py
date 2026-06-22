#!/usr/bin/env python3
"""Compatibility wrapper: v3.0 verification now delegates to v3.1."""
from __future__ import annotations
import runpy
from pathlib import Path
runpy.run_path(str(Path(__file__).with_name("verify_v3_1.py")), run_name="__main__")
