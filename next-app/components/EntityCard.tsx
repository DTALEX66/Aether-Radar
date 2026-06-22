import Link from 'next/link';
import type { Entity } from '../lib/data';
import { AddToStackButton } from './AddToStackButton';

function riskClass(level: string) {
  if (level === '高') return 'border-red-200 bg-red-50 text-red-700';
  if (level === '中') return 'border-orange-200 bg-orange-50 text-orange-700';
  if (level === '未知') return 'border-slate-200 bg-slate-100 text-slate-600';
  return 'border-green-200 bg-green-50 text-green-700';
}

function confidenceClass(level: string) {
  if (level === '高') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  if (level === '中') return 'border-blue-200 bg-blue-50 text-blue-700';
  return 'border-slate-200 bg-slate-100 text-slate-600';
}

export function EntityCard({ entity, categoryName }: { entity: Entity; categoryName?: string }) {
  return (
    <article className="card flex min-h-full flex-col gap-3 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-wrap gap-2">
        <span className="badge border-slate-200 bg-slate-50 text-slate-600">{entity.type}</span>
        {categoryName && <span className="badge border-blue-200 bg-blue-50 text-blue-700">{categoryName}</span>}
        <span className="badge border-indigo-200 bg-indigo-50 text-indigo-700">热度 {entity.heatLevel}</span>
        <span className={`badge ${riskClass(entity.riskLevel)}`}>风险 {entity.riskLevel}</span>
        <span className={`badge ${confidenceClass(entity.sourceConfidence)}`}>来源 {entity.sourceConfidence}</span>
      </div>
      <div>
        <h3 className="text-lg font-bold">{entity.name}</h3>
        <p className="text-sm text-slate-500">直译：{entity.literal}｜中文：{entity.cn}</p>
      </div>
      <p className="text-sm leading-6 text-slate-600">{entity.summary}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        {entity.openSource && <span className="badge border-green-200 bg-green-50 text-green-700">开源</span>}
        {entity.localDeploy && <span className="badge border-teal-200 bg-teal-50 text-teal-700">本地部署</span>}
        <span className="badge border-slate-200 bg-slate-50 text-slate-600">国内可用：{entity.chinaUsability}</span>
        <span className="badge border-purple-200 bg-purple-50 text-purple-700">{entity.recommendedFor}</span>
      </div>
      <div className="rounded-xl border-l-4 border-orange-300 bg-orange-50 p-3 text-xs leading-5 text-orange-900">
        <b>风险：</b>{entity.riskNote}
      </div>
      <dl className="grid gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 md:grid-cols-2">
        <div><dt className="font-semibold text-slate-900">商用</dt><dd>{entity.commercialUse}</dd></div>
        <div><dt className="font-semibold text-slate-900">价格</dt><dd>{entity.pricing}</dd></div>
        <div><dt className="font-semibold text-slate-900">API</dt><dd>{entity.apiSupport}</dd></div>
        <div><dt className="font-semibold text-slate-900">MCP</dt><dd>{entity.mcpSupport}</dd></div>
      </dl>
      <div className="mt-auto flex flex-wrap gap-2">
        <Link className="inline-flex rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold" href={`/tools/${entity.id}`}>
          详情
        </Link>
        <AddToStackButton entity={entity} compact />
        <a className="inline-flex rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold" href={entity.url} target="_blank" rel="noreferrer">
          官网/来源
        </a>
      </div>
    </article>
  );
}
