'use client';

import { useMemo, useState } from 'react';
import { categories, filterEntities, getCategoryName, type SortMode } from '../lib/data';
import { EntityCard } from './EntityCard';

const heatLevels = ['all', 'SSS', 'SS', 'S', 'A', 'B', 'C', '待核验'];
const riskLevels = ['all', '低', '中', '高', '未知'];
const confidenceLevels = ['all', '高', '中', '低', '未知'];
const sortModes: Array<[SortMode, string]> = [
  ['heat', '热度优先'],
  ['risk', '风险优先'],
  ['verified', '可信来源优先'],
  ['name', '名称排序'],
];

export function EntityExplorer({ initialCategory = 'all' }: { initialCategory?: string }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [heat, setHeat] = useState('all');
  const [risk, setRisk] = useState('all');
  const [sourceConfidence, setSourceConfidence] = useState('all');
  const [sort, setSort] = useState<SortMode>('heat');
  const [openSourceOnly, setOpenSourceOnly] = useState(false);
  const [localDeployOnly, setLocalDeployOnly] = useState(false);
  const [curatedOnly, setCuratedOnly] = useState(false);
  const [apiOnly, setApiOnly] = useState(false);
  const [mcpOnly, setMcpOnly] = useState(false);

  const results = useMemo(
    () => filterEntities({ query, category, heat, risk, sourceConfidence, openSourceOnly, localDeployOnly, curatedOnly, apiOnly, mcpOnly, sort }),
    [query, category, heat, risk, sourceConfidence, openSourceOnly, localDeployOnly, curatedOnly, apiOnly, mcpOnly, sort],
  );

  return (
    <section>
      <div className="card mt-6">
        <div className="grid gap-3 md:grid-cols-4">
          <label className="md:col-span-2">
            <span className="text-xs font-semibold text-slate-500">搜索</span>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-indigo-400"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索 ComfyUI、MCP、Lovart、Obsidian、Dify、风险、商用、本地..."
            />
          </label>
          <label>
            <span className="text-xs font-semibold text-slate-500">分类</span>
            <select className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">全部分类</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="text-xs font-semibold text-slate-500">排序</span>
            <select className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
              {sortModes.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="text-xs font-semibold text-slate-500">热度</span>
            <select className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" value={heat} onChange={(event) => setHeat(event.target.value)}>
              {heatLevels.map((item) => (
                <option key={item} value={item}>{item === 'all' ? '全部热度' : item}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="text-xs font-semibold text-slate-500">风险</span>
            <select className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" value={risk} onChange={(event) => setRisk(event.target.value)}>
              {riskLevels.map((item) => (
                <option key={item} value={item}>{item === 'all' ? '全部风险' : item}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="text-xs font-semibold text-slate-500">来源可信度</span>
            <select className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" value={sourceConfidence} onChange={(event) => setSourceConfidence(event.target.value)}>
              {confidenceLevels.map((item) => (
                <option key={item} value={item}>{item === 'all' ? '全部可信度' : item}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm">
            <input type="checkbox" checked={openSourceOnly} onChange={(event) => setOpenSourceOnly(event.target.checked)} />
            只看开源
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm">
            <input type="checkbox" checked={localDeployOnly} onChange={(event) => setLocalDeployOnly(event.target.checked)} />
            只看本地部署
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm">
            <input type="checkbox" checked={curatedOnly} onChange={(event) => setCuratedOnly(event.target.checked)} />
            精选推荐
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm">
            <input type="checkbox" checked={apiOnly} onChange={(event) => setApiOnly(event.target.checked)} />
            API 友好
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm">
            <input type="checkbox" checked={mcpOnly} onChange={(event) => setMcpOnly(event.target.checked)} />
            MCP/Agent 相关
          </label>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          当前显示 <b className="text-slate-900">{results.length}</b> 个结果。全量收录用于发现，精选推荐用于优先选型；数量、Stars 与平台口径都不等于质量，请结合风险、来源和条款自行核验。
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {results.map((entity) => (
          <EntityCard key={entity.id} entity={entity} categoryName={getCategoryName(entity.category)} />
        ))}
      </div>
      {results.length === 0 && <div className="card mt-6 text-center text-slate-500">没有匹配结果。可以放宽筛选条件，或加入待补充新词池。</div>}
    </section>
  );
}
