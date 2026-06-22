import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
out=root/'data/generated/markdown_export'
out.mkdir(parents=True, exist_ok=True)
entities=json.loads((root/'data/seeds/entities.json').read_text(encoding='utf-8'))
for e in entities:
    md=f"""# {e['name']}

- 直译：{e['literal']}
- 中文名：{e['cn']}
- 类别：{e['category']}
- 类型：{e['type']}
- 解释：{e['summary']}
- 价值：{e['value']}
- 热度：{e['heatLevel']}｜{e['heatNote']}
- 开源：{e['openSource']}
- 本地部署：{e['localDeploy']}
- 国内可用性：{e['chinaUsability']}
- 风险等级：{e['riskLevel']}
- 风险备注：{e['riskNote']}
- 来源：{e['url']}
"""
    (out/(e['id']+'.md')).write_text(md, encoding='utf-8')
print(f'wrote markdown files: {len(entities)}')
