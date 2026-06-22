import Link from 'next/link';

const principles = [
  '平台中立：不绑定 Codex、Obsidian、Notion、飞书或任何单一工具。',
  '风险优先：收录更多可以做，但必须把安全、版权、隐私、商用和许可证风险讲清楚。',
  '全量与精选分离：全量用于发现，精选用于优先选型。',
  '用户自主选择：不替用户做唯一答案，只把信息、热度、来源、风险和替代方案透明化。',
  '持续更新：GitHub 热度、平台口径、价格、许可证、国内可用性都必须可复核。',
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-black">关于 Aether Radar</h1>
      <p className="mt-4 text-lg leading-8 text-slate-700">
        Aether Radar｜AI 生态雷达的最终目标，是成为一个面向个人、团队和企业的全链路 AI 集合导航、索引、筛选、导出、接入和持续更新平台。
      </p>
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-bold">它解决什么问题？</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">AI 工具太多、更新太快、风险不透明、国内外可用性不同、开源项目热度和质量不一致。用户需要的不只是链接，而是选型依据。</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold">它不是什么？</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">它不是单纯 AI 导航站，不是只服务 Codex 的工具库，也不是只服务 Obsidian 的知识库。它是可搜索、可筛选、可导出、可接入的数据与决策平台。</p>
        </div>
      </section>
      <section className="card mt-8">
        <h2 className="text-xl font-bold">产品原则</h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
          {principles.map((item) => <li key={item}>• {item}</li>)}
        </ul>
      </section>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white" href="/tools">开始筛选工具</Link>
        <Link className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-950" href="/exports">导出数据</Link>
      </div>
    </main>
  );
}
