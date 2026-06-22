'use client';

import { categories, competitors, comparisons, entities, risks, scenarios, terms, toCsv, toMarkdown } from '../lib/data';

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function ExportCenter() {
  const bundle = { generatedAt: '2026-06-21', entities, categories, terms, scenarios, comparisons, risks, competitors };
  const available = [
    {
      name: '完整 JSON 包',
      description: '开发者、Agent、API 接入优先使用，包含实体、分类、词汇、方案、对比、风险和竞品。',
      action: () => download('aether-radar-full-bundle.json', JSON.stringify(bundle, null, 2), 'application/json'),
    },
    {
      name: '实体 JSON',
      description: '只导出工具/平台/开源项目实体，适合二次处理。',
      action: () => download('aether-radar-entities.json', JSON.stringify(entities, null, 2), 'application/json'),
    },
    {
      name: 'CSV',
      description: '通用表格格式，可导入 Excel、飞书多维表格、Airtable、Notion。',
      action: () => download('aether-radar-entities.csv', `\ufeff${toCsv(entities)}`, 'text/csv'),
    },
    {
      name: 'Markdown',
      description: '适合 Obsidian、Logseq、GitHub、静态知识库和个人学习。',
      action: () => download('aether-radar-entities.md', toMarkdown(entities), 'text/markdown'),
    },
    {
      name: 'Excel/XLSX',
      description: '预生成专业工作簿，包含 Dashboard、实体、风险、场景、对比和数据字典。',
      action: () => { window.location.href = '/exports/aether-radar-export.xlsx'; },
    },
  ];
  const apiEndpoints = [
    ['/api/status', '数据状态、数量、质量和风险提示'],
    ['/api/entities?q=dify&risk=中&curated=true', '实体搜索、筛选、分页和排序'],
    ['/api/search?q=本地部署', '跨工具、词汇和场景方案搜索'],
    ['/api/scenarios', '场景方案库'],
    ['/api/risks', '风险分类和中高风险实体'],
    ['/api/export?format=json', '完整 JSON Bundle 下载'],
    ['/api/export?format=csv', 'CSV 下载'],
    ['/api/export?format=markdown', 'Markdown 下载'],
    ['/api/export?format=xlsx', 'Excel/XLSX 下载'],
  ];
  const planned = [
    ['Notion', '同步到 Notion Database，适合团队协作和内容运营。'],
    ['飞书', '同步到飞书多维表格，适合国内团队。'],
    ['PDF', '生成选型报告，适合汇报和客户交付。'],
    ['API', '提供机器可读接口，适合企业系统和开发者。'],
    ['MCP Server', '让 Agent 直接查询工具库、风险和替代品。'],
    ['浏览器插件', '网页划词查 AI 工具解释、热度与风险。'],
    ['RSS/周报', '订阅新工具、新项目、风险变化和趋势榜。'],
  ];

  return (
    <div className="mt-6 space-y-8">
      <section>
        <h2 className="text-xl font-bold">MVP 可用导出</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {available.map((item) => (
            <div className="card" key={item.name}>
              <h3 className="font-bold">{item.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              <button className="mt-4 rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white" onClick={item.action}>
                下载 {item.name}
              </button>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">导出数据仅为当前种子库快照。用于项目选型前，请复核官网、许可证、价格、隐私政策和商用条款。后续商业版应加入版本号、更新时间、来源可信度和审计日志。</div>
      </section>
      <section>
        <h2 className="text-xl font-bold">API 接入端点</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr><th className="table-cell">端点</th><th className="table-cell">用途</th><th className="table-cell">打开</th></tr>
            </thead>
            <tbody>
              {apiEndpoints.map(([url, desc]) => (
                <tr className="border-t border-slate-100" key={url}>
                  <td className="table-cell font-mono text-xs text-slate-700">{url}</td>
                  <td className="table-cell text-slate-600">{desc}</td>
                  <td className="table-cell"><a className="font-semibold text-blue-700" href={url} target="_blank" rel="noreferrer">查看</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold">规划中接入</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {planned.map(([name, desc]) => (
            <div className="card" key={name}>
              <h3 className="font-bold">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
