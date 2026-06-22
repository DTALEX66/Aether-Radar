import type { UiPromptBlock } from '../lib/ui';

export function UiPromptCard({ block }: { block: UiPromptBlock }) {
  return (
    <article className="card flex min-h-full flex-col gap-3">
      <div>
        <span className="badge border-violet-200 bg-violet-50 text-violet-700">{block.target}</span>
        <h3 className="mt-3 text-lg font-bold text-slate-950">{block.title}</h3>
      </div>
      <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-2xl border border-slate-200 bg-slate-950 p-4 text-xs leading-6 text-slate-100">{block.prompt}</pre>
    </article>
  );
}
