import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AddToStackButton } from '../../../components/AddToStackButton';
import { entities, getCategoryName } from '../../../lib/data';
import { DisclaimerBox } from '../../../components/DisclaimerBox';

export function generateStaticParams() {
  return entities.map((entity) => ({ id: entity.id }));
}

function Field({ label, value }: { label: string; value: string | boolean }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <dt className="text-xs font-semibold text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-slate-800">{typeof value === 'boolean' ? (value ? '是' : '否') : value || '无 / 待核验'}</dd>
    </div>
  );
}

export default async function ToolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entity = entities.find((item) => item.id === id);
  if (!entity) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link className="text-sm font-semibold text-blue-700" href="/tools">
        ← 返回工具库
      </Link>
      <section className="card mt-6">
        <div className="flex flex-wrap gap-2">
          <span className="badge border-blue-200 bg-blue-50 text-blue-700">{getCategoryName(entity.category)}</span>
          <span className="badge border-indigo-200 bg-indigo-50 text-indigo-700">热度 {entity.heatLevel}</span>
          <span className="badge border-orange-200 bg-orange-50 text-orange-700">风险 {entity.riskLevel}</span>
          <span className="badge border-emerald-200 bg-emerald-50 text-emerald-700">来源可信度 {entity.sourceConfidence}</span>
          <span className="badge border-slate-200 bg-slate-50 text-slate-600">{entity.reviewStatus}</span>
        </div>
        <h1 className="mt-4 text-4xl font-black">{entity.name}</h1>
        <p className="mt-2 text-slate-500">直译：{entity.literal}｜中文：{entity.cn}</p>
        <p className="mt-6 text-lg leading-8 text-slate-700">{entity.summary}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <h2 className="font-bold">AI 价值</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{entity.value}</p>
          </div>
          <div className="rounded-2xl bg-orange-50 p-4">
            <h2 className="font-bold text-orange-900">风险提示</h2>
            <p className="mt-2 text-sm leading-6 text-orange-900">{entity.riskNote}</p>
          </div>
        </div>

        <dl className="mt-8 grid gap-3 md:grid-cols-3">
          <Field label="类型" value={entity.type} />
          <Field label="推荐人群" value={entity.recommendedFor} />
          <Field label="国内可用性" value={entity.chinaUsability} />
          <Field label="是否开源" value={entity.openSource} />
          <Field label="是否可本地部署" value={entity.localDeploy} />
          <Field label="GitHub 仓库" value={entity.githubRepo || '无 / 平台型工具'} />
          <Field label="价格模式" value={entity.pricing} />
          <Field label="许可证" value={entity.license} />
          <Field label="商用判断" value={entity.commercialUse} />
          <Field label="API 支持" value={entity.apiSupport} />
          <Field label="MCP 支持" value={entity.mcpSupport} />
          <Field label="数据隐私" value={entity.dataPrivacy} />
          <Field label="来源类型" value={entity.sourceType} />
          <Field label="最后核验" value={entity.lastVerifiedAt} />
          <Field label="推荐备注" value={entity.recommend} />
        </dl>

        <div className="mt-8 flex flex-wrap gap-2">
          {entity.riskTags.map((tag) => (
            <span className="badge border-slate-200 bg-slate-50 text-slate-700" key={tag}>{tag}</span>
          ))}
        </div>

        <div className="mt-8">
          <DisclaimerBox />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <AddToStackButton entity={entity} />
          <a className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold" href={entity.url} target="_blank" rel="noreferrer">
            打开来源
          </a>
        </div>
      </section>
    </main>
  );
}