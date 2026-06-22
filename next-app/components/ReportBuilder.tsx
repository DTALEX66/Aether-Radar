'use client';

import { useMemo, useState } from 'react';
import { comparisons, entities, getCategoryName, risks, scenarios } from '../lib/data';

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

export function ReportBuilder() {
  const [scenarioId, setScenarioId] = useState(scenarios[0]?.id ?? '');
  const [audience, setAudience] = useState('项目经理 / 设计师 / 开发团队');
  const [decisionMode, setDecisionMode] = useState('先精选，后全量搜索');
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];

  const matchedTools = useMemo(() => {
    const names = new Set((scenario?.stack ?? []).map((item) => item.toLowerCase()));
    return entities.filter((entity) => names.has(entity.name.toLowerCase()) || names.has(entity.cn.toLowerCase())).slice(0, 12);
  }, [scenario]);

  const markdown = `# AI 生态雷达选型报告\n\n- 场景：${scenario?.name}\n- 目标用户：${audience}\n- 决策模式：${decisionMode}\n- 难度：${scenario?.difficulty}\n- 成本：${scenario?.cost}\n- 本地部署可能性：${scenario?.localPossible}\n\n## 推荐路径\n\n${scenario?.path}\n\n## 工具组合\n\n${matchedTools.map((tool, index) => `${index + 1}. **${tool.name}**｜${getCategoryName(tool.category)}｜热度 ${tool.heatLevel}｜风险 ${tool.riskLevel}\n   - ${tool.summary}\n   - 商用：${tool.commercialUse}\n   - 风险：${tool.riskNote}`).join('\n\n')}\n\n## 关键风险\n\n${risks.map((risk) => `- **${risk.name}**：${risk.description}`).join('\n')}\n\n## 免责声明\n\n本报告用于工具索引和项目选型参考，不构成法律、安全、采购、财务或商用授权建议。使用前请自行核验官网、许可证、隐私政策和价格。\n`;

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
      <section className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-black">报告配置</h2>
          <label className="mt-4 block">
            <span className="text-xs font-semibold text-slate-500">选择场景</span>
            <select className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" value={scenarioId} onChange={(event) => setScenarioId(event.target.value)}>
              {scenarios.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>
          <label className="mt-4 block">
            <span className="text-xs font-semibold text-slate-500">目标用户</span>
            <input className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" value={audience} onChange={(event) => setAudience(event.target.value)} />
          </label>
          <label className="mt-4 block">
            <span className="text-xs font-semibold text-slate-500">决策模式</span>
            <input className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2" value={decisionMode} onChange={(event) => setDecisionMode(event.target.value)} />
          </label>
          <div className="mt-4 grid gap-3">
            <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white" onClick={() => download('aether-selection-report.md', markdown, 'text/markdown')} type="button">下载 Markdown 报告</button>
            <button className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold" onClick={() => window.print()} type="button">打印 / 另存 PDF</button>
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          商用版 PDF 报告应继续加入品牌封面、数据版本、来源列表、审核人、风险签收和客户交付页。当前页面先满足演示和本地输出。
        </div>
      </section>

      <section className="print:shadow-none">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="aether-eyebrow">Aether Radar 选型报告</p>
          <h1 className="mt-4 text-3xl font-black text-slate-950">{scenario?.name}</h1>
          <p className="mt-3 text-slate-600">{scenario?.user}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4"><b>难度</b><p>{scenario?.difficulty}</p></div>
            <div className="rounded-2xl bg-slate-50 p-4"><b>成本</b><p>{scenario?.cost}</p></div>
            <div className="rounded-2xl bg-slate-50 p-4"><b>本地部署</b><p>{scenario?.localPossible}</p></div>
          </div>
          <h2 className="mt-8 text-xl font-black">推荐路径</h2>
          <p className="mt-3 leading-7 text-slate-700">{scenario?.path}</p>
          <h2 className="mt-8 text-xl font-black">工具组合</h2>
          <div className="mt-4 grid gap-3">
            {matchedTools.map((tool) => (
              <div className="rounded-2xl border border-slate-200 p-4" key={tool.id}>
                <div className="flex flex-wrap justify-between gap-3">
                  <b>{tool.name}</b>
                  <span className="text-sm text-slate-500">热度 {tool.heatLevel}｜风险 {tool.riskLevel}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{tool.summary}</p>
                <p className="mt-2 text-xs leading-5 text-orange-700">风险：{tool.riskNote}</p>
              </div>
            ))}
          </div>
          <h2 className="mt-8 text-xl font-black">常见对比结论</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            {comparisons.map((item) => <li key={item.id}><b>{item.title}：</b>{item.decision}</li>)}
          </ul>
        </article>
      </section>
    </div>
  );
}
