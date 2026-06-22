const rows = [
  ['MVP 演示', '静态站、Next.js 页面、数据种子、风险提示、导出中心', '已具备'],
  ['数据接入', 'JSON/CSV/Markdown/XLSX/API/MCP 只读原型', '已具备'],
  ['商业展示', '品牌、UI、报告页、工具栈、本地审核看板、部署文档', 'v1.0 具备'],
  ['生产 SaaS', '账号、权限、在线编辑、支付、企业审计、自动采集', '后续阶段'],
  ['企业私有化', 'Docker、白名单、API Key、数据源配置、内网部署', '架构已规划'],
];

export function CapabilityMatrix() {
  return (
    <section className="card">
      <h2 className="text-xl font-black">能力边界矩阵</h2>
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500"><tr><th className="table-cell">层级</th><th className="table-cell">能力</th><th className="table-cell">状态</th></tr></thead>
          <tbody>
            {rows.map(([level, capability, status]) => (
              <tr className="border-t border-slate-100" key={level}>
                <td className="table-cell font-semibold text-slate-950">{level}</td>
                <td className="table-cell text-slate-600">{capability}</td>
                <td className="table-cell"><span className="badge border-blue-200 bg-blue-50 text-blue-700">{status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
