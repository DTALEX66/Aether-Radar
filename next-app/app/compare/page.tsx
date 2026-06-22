import { comparisons } from '../../lib/data';

export default function ComparePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-black">工具对比</h1>
      <p className="mt-2 max-w-3xl text-slate-600">对比页用于解决“不是哪个最好，而是哪一个更适合当前场景”的问题。后续可以扩展成任意两个工具的动态对比。</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {comparisons.map((comparison) => (
          <article className="card" key={comparison.id}>
            <h2 className="text-xl font-bold">{comparison.title}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl bg-blue-50 p-4">
                <h3 className="font-bold text-blue-900">{comparison.a}</h3>
                <p className="mt-2 text-sm leading-6 text-blue-900">{comparison.bestForA}</p>
              </div>
              <div className="rounded-2xl bg-indigo-50 p-4">
                <h3 className="font-bold text-indigo-900">{comparison.b}</h3>
                <p className="mt-2 text-sm leading-6 text-indigo-900">{comparison.bestForB}</p>
              </div>
            </div>
            <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700"><b>选型结论：</b>{comparison.decision}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
