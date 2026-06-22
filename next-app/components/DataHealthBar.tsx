import { getDataHealth } from '../lib/data';

export function DataHealthBar() {
  const health = getDataHealth();
  const items = [
    ['收录实体', health.total],
    ['GitHub 项目', health.github],
    ['本地部署', health.local],
    ['高可信来源', health.highConfidence],
    ['已初审', health.reviewed],
    ['高风险关注', health.highRisk],
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
      <div className="grid gap-3 md:grid-cols-6">
        {items.map(([label, value]) => (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm" key={label}>
            <b className="block text-2xl text-slate-950">{value}</b>
            <span className="text-xs font-medium text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
