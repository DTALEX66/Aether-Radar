import { scenarios } from '../../lib/data';

export default function ScenariosPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-black">场景方案库</h1>
      <p className="mt-2 max-w-3xl text-slate-600">从“我要做什么”出发，而不是从工具出发。每个方案都给出工具栈、难度、成本、本地部署可能性和风险。</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {scenarios.map((s) => (
          <div className="card" key={s.id}>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="badge border-blue-200 bg-blue-50 text-blue-700">{s.user}</span>
              <span className="badge border-indigo-200 bg-indigo-50 text-indigo-700">难度：{s.difficulty}</span>
              <span className="badge border-green-200 bg-green-50 text-green-700">成本：{s.cost}</span>
              <span className="badge border-teal-200 bg-teal-50 text-teal-700">本地：{s.localPossible}</span>
            </div>
            <h3 className="mt-3 text-xl font-bold">{s.name}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.stack.map((x) => <span className="badge border-indigo-200 bg-indigo-50 text-indigo-700" key={x}>{x}</span>)}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-700"><b>推荐路径：</b>{s.path}</p>
            <p className="mt-3 rounded-xl bg-orange-50 p-3 text-xs leading-5 text-orange-800"><b>风险：</b>{s.risk}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
