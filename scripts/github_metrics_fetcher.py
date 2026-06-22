"""
GitHub 指标更新脚本草案。

用法：
  export GITHUB_TOKEN=xxx  # 可选，避免限速
  python scripts/github_metrics_fetcher.py

输出：data/generated/github_metrics.json
"""
import json, os, time, urllib.request
from pathlib import Path
root = Path(__file__).resolve().parents[1]
out = root/'data/generated'
out.mkdir(exist_ok=True)
entities = json.loads((root/'data/seeds/entities.json').read_text(encoding='utf-8'))
repos = sorted({e['githubRepo'] for e in entities if e.get('githubRepo')})
headers = {'Accept':'application/vnd.github+json'}
if os.environ.get('GITHUB_TOKEN'):
    headers['Authorization'] = 'Bearer ' + os.environ['GITHUB_TOKEN']
result = []
for repo in repos:
    req = urllib.request.Request(f'https://api.github.com/repos/{repo}', headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            data = json.loads(r.read().decode('utf-8'))
        result.append({
            'repo': repo,
            'stars': data.get('stargazers_count'),
            'forks': data.get('forks_count'),
            'open_issues': data.get('open_issues_count'),
            'license': (data.get('license') or {}).get('spdx_id'),
            'archived': data.get('archived'),
            'pushed_at': data.get('pushed_at'),
            'html_url': data.get('html_url'),
            'fetched_at': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
        })
    except Exception as e:
        result.append({'repo': repo, 'error': str(e)})
(out/'github_metrics.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'wrote {out/"github_metrics.json"} repos={len(result)}')
