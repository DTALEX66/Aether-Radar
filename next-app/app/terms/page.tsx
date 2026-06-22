import { terms } from '../../lib/data';

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-black">AI 词汇百科</h1>
      <p className="mt-2 max-w-3xl text-slate-600">每个词条保留原名、直译、常用中文名和项目使用价值，方便新手理解，也方便团队统一口径。</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {terms.map((term) => (
          <article className="card" key={term.term}>
            <span className="badge border-slate-200 bg-slate-50 text-slate-600">{term.category}</span>
            <h2 className="mt-3 text-xl font-bold">{term.term}</h2>
            <p className="mt-1 text-sm text-slate-500">直译：{term.literal}｜中文：{term.cn}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{term.summary}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
