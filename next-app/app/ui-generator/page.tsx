import { buildUiPrompt, pageBlueprints, uiPromptBlocks } from '../../lib/ui';
import { PageHero } from '../../components/PageHero';
import { SectionHeader } from '../../components/SectionHeader';
import { UiPromptCard } from '../../components/UiPromptCard';

export default function UiGeneratorPage() {
  return (
    <main>
      <PageHero
        eyebrow="AI UI Generator Brief"
        title="用项目数据生成专属 UI，而不是套通用模板。"
        description="这个页面把产品定位、页面目标、视觉令牌、组件语义和负面约束整理成可复制提示词。后续交给 Lovart、v0、Figma AI、Codex 或 Claude Code 时，先复制这里的提示词。"
        primaryHref="/ui"
        primaryLabel="查看 UI 系统"
        secondaryHref="/exports"
        secondaryLabel="导出数据"
      />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeader title="页面级生成提示词" description="每个页面都由业务目标驱动，确保 UI 与产品链路打通。" />
        <div className="grid gap-4 md:grid-cols-2">
          {pageBlueprints.map((page) => (
            <article className="card" key={page.route}>
              <div className="flex flex-wrap gap-2">
                <span className="badge border-slate-200 bg-slate-50 text-slate-700">{page.route}</span>
                <span className="badge border-violet-200 bg-violet-50 text-violet-700">{page.uiFocus}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-slate-950">{page.name}</h3>
              <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap rounded-2xl border border-slate-200 bg-slate-950 p-4 text-xs leading-6 text-slate-100">{buildUiPrompt(page.route)}</pre>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeader title="组件级生成提示词" description="用于单独生成工具卡、风险卡、场景方案卡、首页 Hero 等局部组件。" />
        <div className="grid gap-4 md:grid-cols-2">
          {uiPromptBlocks.map((block) => <UiPromptCard block={block} key={block.id} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="aether-panel-dark p-6 md:p-8">
          <h2 className="text-2xl font-black">负面约束</h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-200 md:grid-cols-2">
            <p>不要把 Aether Radar 做成普通网址导航或工具 Logo 墙。</p>
            <p>不要只突出 Codex、Obsidian 或某一个单点工具。</p>
            <p>不要只展示收录数量，必须保留风险、安全、来源可信度和用户自主选择。</p>
            <p>不要牺牲筛选效率；工具卡和详情页必须支持项目经理快速判断。</p>
          </div>
        </div>
      </section>
    </main>
  );
}
