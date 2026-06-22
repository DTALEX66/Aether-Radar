'use client';

import { useEffect, useMemo, useState } from 'react';
import { entities, getCategoryName, getHeatScore, getRiskScore, type Entity } from '../lib/data';

const STORAGE_KEY = 'aether-radar-tool-stack';

type StackProfile = {
  projectName: string;
  projectGoal: string;
  owner: string;
  budget: string;
  sensitivity: string;
};

function readStack(): string[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function saveStack(ids: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(new Set(ids))));
  window.dispatchEvent(new CustomEvent('aether-stack-updated'));
}

function riskLabel(rows: Entity[]) {
  const max = Math.max(0, ...rows.map((entity) => getRiskScore(entity.riskLevel)));
  if (max >= 3) return '高风险关注';
  if (max === 2) return '中风险复核';
  if (max === 1) return '低风险基础核验';
  return '未形成风险判断';
}

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function ToolStackManager() {
  const [stackIds, setStackIds] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [profile, setProfile] = useState<StackProfile>({
    projectName: '我的 AI 工具栈',
    projectGoal: '用于项目选型、风险复核和后续导出。',
    owner: '未填写',
    budget: '待评估',
    sensitivity: '普通资料，不输入敏感数据',
  });

  useEffect(() => {
    const update = () => setStackIds(readStack());
    update();
    window.addEventListener('storage', update);
    window.addEventListener('aether-stack-updated', update);
    return () => {
      window.removeEventListener('storage', update);
      window.removeEventListener('aether-stack-updated', update);
    };
  }, []);

  const selected = useMemo(() => entities.filter((entity) => stackIds.includes(entity.id)), [stackIds]);
  const candidates = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return entities
      .filter((entity) => !stackIds.includes(entity.id))
      .filter((entity) => {
        if (!keyword) return true;
        return [entity.name, entity.cn, entity.literal, entity.summary, entity.recommendedFor, getCategoryName(entity.category)]
          .join(' ')
          .toLowerCase()
          .includes(keyword);
      })
      .sort((a, b) => getHeatScore(b.heatLevel) - getHeatScore(a.heatLevel))
      .slice(0, 18);
  }, [query, stackIds]);

  const categoryCount = new Set(selected.map((entity) => entity.category)).size;
  const localCount = selected.filter((entity) => entity.localDeploy).length;
  const openSourceCount = selected.filter((entity) => entity.openSource).length;
  const highRiskCount = selected.filter((entity) => entity.riskLevel === '高').length;

  const report = {
    generatedAt: new Date().toISOString(),
    profile,
    summary: {
      total: selected.length,
      categoryCount,
      openSourceCount,
      localCount,
      highRiskCount,
      riskLabel: riskLabel(selected),
    },
    tools: selected,
    note: '本导出为浏览器本地工具栈快照，不构成采购、法律、安全或商用授权建议。',
  };

  const markdown = `# ${profile.projectName}\n\n- 目标：${profile.projectGoal}\n- 负责人：${profile.owner}\n- 预算：${profile.budget}\n- 数据敏感度：${profile.sensitivity}\n- 工具数量：${selected.length}\n- 风险判断：${riskLabel(selected)}\n\n## 工具清单\n\n${selected.map((entity, index) => `${index + 1}. **${entity.name}**｜${getCategoryName(entity.category)}｜热度 ${entity.heatLevel}｜风险 ${entity.riskLevel}\n   - ${entity.summary}\n   - 风险：${entity.riskNote}\n   - 商用：${entity.commercialUse}\n   - 来源：${entity.url}`).join('\n\n')}\n\n> 使用前请核验官网、许可证、隐私政策、价格和商用条款。\n`;

  const add = (id: string) => saveStack([...stackIds, id]);
  const remove = (id: string) => saveStack(stackIds.filter((item) => item !== id));
  const clear = () => saveStack([]);

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
      <section className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-black">项目资料</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {([
              ['projectName', '项目名称'],
              ['owner', '负责人'],
              ['budget', '预算/成本'],
              ['sensitivity', '数据敏感度'],
            ] as const).map(([key, label]) => (
              <label key={key}>
                <span className="text-xs font-semibold text-slate-500">{label}</span>
                <input
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2"
                  value={profile[key]}
                  onChange={(event) => setProfile({ ...profile, [key]: event.target.value })}
                />
              </label>
            ))}
            <label className="md:col-span-2">
              <span className="text-xs font-semibold text-slate-500">项目目标</span>
              <textarea
                className="mt-1 min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2"
                value={profile.projectGoal}
                onChange={(event) => setProfile({ ...profile, projectGoal: event.target.value })}
              />
            </label>
          </div>
        </div>

        <div className="card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black">已选工具栈</h2>
              <p className="mt-1 text-sm text-slate-500">浏览器本地保存，不上传云端；适合演示个人/团队选型流程。</p>
            </div>
            <button className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-700" onClick={clear} type="button">清空</button>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {[
              ['工具数', selected.length],
              ['覆盖分类', categoryCount],
              ['开源', openSourceCount],
              ['本地部署', localCount],
              ['高风险', highRiskCount],
            ].map(([label, value]) => (
              <div className="rounded-2xl bg-slate-50 p-4 text-center" key={label}>
                <b className="block text-2xl text-slate-950">{value}</b>
                <span className="text-xs text-slate-500">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            {selected.map((entity) => (
              <div className="rounded-2xl border border-slate-200 bg-white p-4" key={entity.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold">{entity.name}</h3>
                    <p className="text-sm text-slate-500">{getCategoryName(entity.category)}｜热度 {entity.heatLevel}｜风险 {entity.riskLevel}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{entity.summary}</p>
                  </div>
                  <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold" onClick={() => remove(entity.id)} type="button">移除</button>
                </div>
              </div>
            ))}
            {selected.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">还没有加入工具。可以从右侧候选工具添加，或在工具库详情页加入。</div>}
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-black">添加工具</h2>
          <input className="mt-4 w-full rounded-xl border border-slate-200 px-3 py-2" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索 Dify、ComfyUI、Lovart、本地部署..." />
          <div className="mt-4 max-h-[540px] space-y-3 overflow-auto pr-1">
            {candidates.map((entity) => (
              <button className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-left hover:border-blue-300" key={entity.id} onClick={() => add(entity.id)} type="button">
                <b className="block">{entity.name}</b>
                <span className="text-xs text-slate-500">{getCategoryName(entity.category)}｜热度 {entity.heatLevel}｜风险 {entity.riskLevel}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="text-xl font-black">导出工具栈</h2>
          <div className="mt-4 grid gap-3">
            <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white" onClick={() => download('aether-tool-stack.json', JSON.stringify(report, null, 2), 'application/json')} type="button">导出 JSON</button>
            <button className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold" onClick={() => download('aether-tool-stack.md', markdown, 'text/markdown')} type="button">导出 Markdown</button>
            <button className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold" onClick={() => window.print()} type="button">打印 / 另存 PDF</button>
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">工具栈结果只保存在当前浏览器。正式 SaaS 版可升级为账号收藏、团队白名单、审计日志和企业风险审批。</p>
        </div>
      </aside>
    </div>
  );
}
