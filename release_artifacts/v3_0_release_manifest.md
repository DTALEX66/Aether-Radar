# Aether Radar v3.0 Release Manifest

- Version: 3.0
- Status: v3.0-commercial-mvp-stabilized
- Generated: 2026-06-21T17:34:58.352914+00:00
- Entities: 67
- Categories: 17
- Scenarios: 6
- Tracked files: 215

## Required verification commands

- `python scripts/check_encoding_syntax.py`
- `python scripts/validate_data.py`
- `python scripts/ten_round_self_check.py`
- `python scripts/production_readiness_check.py`
- `python scripts/commercial_smoke_test.py`
- `python scripts/api_contract_check.py`
- `python scripts/static_site_check.py`
- `cd next-app && npm run typecheck && npm run lint && npm run build:ci`

## Notes

This manifest excludes node_modules, .next, .git and generated release_artifacts from the file hash list.
