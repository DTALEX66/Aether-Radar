const endpoints = [
  ['/api/status', '数据状态', '返回实体、分类、风险、场景、GitHub 项目数量和数据质量提醒。'],
  ['/api/entities', '实体列表', '支持 q、category、heat、risk、sourceConfidence、openSource、localDeploy、curated、api、mcp、sort、limit、offset。'],
  ['/api/search?q=本地部署', '全局搜索', '跨实体、词汇和场景方案搜索。'],
  ['/api/scenarios', '场景方案', '返回场景化工具组合、成本、难度、本地部署可能性和风险。'],
  ['/api/risks', '风险中心', '返回风险分类和中高风险关注实体。'],
  ['/api/export?format=json', 'JSON 导出', '完整 Bundle，适合开发者、Agent 和二次处理。'],
  ['/api/export?format=csv', 'CSV 导出', '适合 Excel、Notion、飞书、Airtable 等表格工具。'],
  ['/api/export?format=markdown', 'Markdown 导出', '适合 Obsidian、Logseq、GitHub 和静态知识库。'],
  ['/api/export?format=xlsx', 'Excel 导出', '跳转到预生成 XLSX 工作簿。'],
  ['/api/report?scenario=design-wall', '选型报告', '根据场景输出报告 JSON；format=markdown 可下载 Markdown。'],
  ['/api/openapi', 'OpenAPI JSON', '机器可读 API 规范，适合开发者、Agent、网关和 SDK。'],
];

export default function ApiDocsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-black">API 与接入文档</h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        v1.0 开始，Aether Radar 不只是网页目录，也提供机器可读接口，方便后续接入 Agent、企业内部系统、浏览器插件、数据同步和 MCP Server。
      </p>
      <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
        当前 API 基于种子数据快照，适合 MVP、内测和二次开发。正式商用前，需要加入认证、速率限制、数据版本、审计日志和来源复核机制。
      </section>
      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="table-cell">端点</th>
              <th className="table-cell">名称</th>
              <th className="table-cell">说明</th>
              <th className="table-cell">打开</th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map(([url, name, desc]) => (
              <tr className="border-t border-slate-100" key={url}>
                <td className="table-cell font-mono text-xs text-slate-700">{url}</td>
                <td className="table-cell font-bold text-slate-950">{name}</td>
                <td className="table-cell text-slate-600">{desc}</td>
                <td className="table-cell"><a className="font-semibold text-blue-700" href={url} target="_blank" rel="noreferrer">查看</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="card mt-6">
        <h2 className="text-xl font-bold">OpenAPI</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          已提供 <a className="font-semibold text-blue-700" href="/openapi.json" target="_blank" rel="noreferrer">/openapi.json</a> 和 <a className="font-semibold text-blue-700" href="/api/openapi" target="_blank" rel="noreferrer">/api/openapi</a>。后续可用于生成 SDK、API 网关配置和企业内部接入文档。
        </p>
      </section>
      <section className="card mt-6">
        <h2 className="text-xl font-bold">MCP 原型</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          本包已包含 <code className="rounded bg-slate-100 px-1">mcp-server/aether-radar-mcp.mjs</code>，可作为本地只读查询原型。它提供 search_entities、get_entity、list_categories、list_risks、list_scenarios、data_status 等工具。
        </p>
      </section>
    </main>
  );
}
