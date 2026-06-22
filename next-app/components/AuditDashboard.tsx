import { categories, competitors, comparisons, entities, risks, scenarios, terms } from '../lib/data';

function countMissing(field: keyof (typeof entities)[number]) {
  return entities.filter((entity) => String(entity[field] ?? '').trim() === '').length;
}

export function AuditDashboard() {
  const highRisk = entities.filter((entity) => entity.riskLevel === '高');
  const lowConfidence = entities.filter((entity) => ['低', '未知'].includes(entity.sourceConfidence));
  const needReview = entities.filter((entity) => entity.reviewStatus === '待复核' || entity.sourceConfidence !== '高');
  const missing = [
    ['来源 URL', countMissing('url')],
    ['许可证', countMissing('license')],
    ['价格', countMissing('pricing')],
    ['商用判断', countMissing('commercialUse')],
    ['隐私说明', countMissing('dataPrivacy')],
  ];
  const stats = [
    ['实体', entities.length],
    ['分类', categories.length],
    ['风险维度', risks.length],
    ['场景方案', scenarios.length],
    ['词汇', terms.length],
    ['对比', comparisons.length],
    ['竞品', competitors.length],
    ['待人工复核', needReview.length],
  ];

  return (
    <div className="mt-8 space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        {stats.map(([label, value]) => (
          <div className="aether-stat-card" key={label}>
            <b className="block text-3xl text-slate-950">{value}</b>
            <span className="text-sm text-slate-500">{label}</span>
          </div>
        ))}
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-black">字段完整性</h2>
          <div className="mt-4 space-y-3">
            {missing.map(([label, value]) => (
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4" key={label}>
                <span>{label}</span>
                <b className={Number(value) > 0 ? 'text-orange-700' : 'text-emerald-700'}>{value}</b>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="text-xl font-black">高风险关注</h2>
          <div className="mt-4 space-y-3">
            {highRisk.slice(0, 8).map((entity) => (
              <div className="rounded-2xl border border-red-100 bg-red-50 p-4" key={entity.id}>
                <b>{entity.name}</b>
                <p className="mt-1 text-sm leading-6 text-red-800">{entity.riskNote}</p>
              </div>
            ))}
            {highRisk.length === 0 && <p className="text-slate-500">暂无高风险实体。</p>}
          </div>
        </div>
      </section>
      <section className="card">
        <h2 className="text-xl font-black">低可信 / 待复核来源</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500"><tr><th className="table-cell">名称</th><th className="table-cell">来源可信度</th><th className="table-cell">审核状态</th><th className="table-cell">最后核验</th></tr></thead>
            <tbody>
              {lowConfidence.slice(0, 20).map((entity) => (
                <tr className="border-t border-slate-100" key={entity.id}>
                  <td className="table-cell font-semibold">{entity.name}</td>
                  <td className="table-cell">{entity.sourceConfidence}</td>
                  <td className="table-cell">{entity.reviewStatus}</td>
                  <td className="table-cell">{entity.lastVerifiedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-slate-500">这是只读审核看板。正式后台应加入登录、权限、编辑流、审核记录和变更日志。</p>
      </section>
    </div>
  );
}
