import Link from 'next/link';
import { risks, getRiskHotspots } from '../../lib/data';
import { DisclaimerBox } from '../../components/DisclaimerBox';

export default function RisksPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-black">风险提示中心</h1>
      <p className="mt-2 max-w-3xl text-slate-600">让用户自己选择的前提，是把风险讲清楚。风险不是拒绝工具，而是提醒用户在商用、企业、敏感数据和自动化执行前做复核。</p>
      <div className="mt-6"><DisclaimerBox /></div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {risks.map((r) => (
          <div className="card" key={r.id}>
            <h3 className="font-bold">{r.name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{r.description}</p>
            <span className="mt-3 inline-block rounded-xl bg-orange-50 px-3 py-2 text-xs text-orange-700">评级：{r.levels}</span>
          </div>
        ))}
      </div>
      <h2 className="mt-10 text-2xl font-bold">中高风险重点关注</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {getRiskHotspots().slice(0, 12).map((e) => (
          <div className="card" key={e.id}>
            <b>{e.name}</b>
            <p className="mt-2 text-sm leading-6 text-slate-600">{e.riskNote}</p>
            <Link className="mt-4 inline-block text-sm font-semibold text-blue-700" href={`/tools/${e.id}`}>查看详情 →</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
