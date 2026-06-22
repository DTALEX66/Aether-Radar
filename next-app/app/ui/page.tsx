import { componentRegistry, designTokens, pageBlueprints, uiPromptBlocks } from '../../lib/ui';
import { PageHero } from '../../components/PageHero';
import { SectionHeader } from '../../components/SectionHeader';
import { UiPromptCard } from '../../components/UiPromptCard';

export default function UiSystemPage() {
  const colors = Object.entries(designTokens.colors);
  return (
    <main>
      <PageHero
        eyebrow="UI 生成系统 · 专属视觉规范"
        title="把 AI 生态雷达的产品内容，变成可复用、可编程、可生成的专属 UI。"
        description="这里不是普通样式指南，而是给 Codex、Claude Code、Cursor、Lovart、Figma AI、v0 等工具使用的统一 UI 设计依据，确保后续页面不会越做越散。"
        primaryHref="/ui-generator"
        primaryLabel="打开 UI 生成器"
        secondaryHref="/tools"
        secondaryLabel="查看业务页面"
      />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeader title="视觉定位" description={designTokens.designIntent} />
        <div className="grid gap-3 md:grid-cols-4">
          {designTokens.moodKeywords.map((word) => <span className="card text-sm font-bold text-slate-700" key={word}>{word}</span>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeader title="颜色令牌" description="所有后续页面、组件、AI 生成图和 UI 方案优先使用这一组颜色，避免视觉漂移。" />
        <div className="grid gap-4 md:grid-cols-4">
          {colors.map(([name, value]) => (
            <div className="card" key={name}>
              <div className="ui-token-swatch" style={{ background: value }} />
              <p className="mt-3 text-sm font-bold text-slate-950">{name}</p>
              <p className="text-xs text-slate-500">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeader title="组件注册表" description="Coding Agent 必须优先复用这些组件语义，不要每个页面重新发明样式。" />
        <div className="grid gap-4 md:grid-cols-3">
          {componentRegistry.map((item) => (
            <article className="card" key={item.id}>
              <span className="badge border-cyan-200 bg-cyan-50 text-cyan-700">{item.id}</span>
              <h3 className="mt-3 text-lg font-bold text-slate-950">{item.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.purpose}</p>
              <p className="mt-3 text-xs text-slate-500">状态：{item.states.join(' / ')}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeader title="页面蓝图" description="每个页面先有信息架构，再生成 UI。避免页面看起来好看但不解决选型问题。" />
        <div className="grid gap-4 md:grid-cols-2">
          {pageBlueprints.map((page) => (
            <article className="card" key={page.route}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge border-slate-200 bg-slate-50 text-slate-600">{page.route}</span>
                <span className="badge border-blue-200 bg-blue-50 text-blue-700">{page.uiFocus}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-slate-950">{page.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{page.goal}</p>
              <ul className="mt-3 grid gap-2 text-sm text-slate-600">
                {page.layout.map((part) => <li className="rounded-xl bg-slate-50 px-3 py-2" key={part}>{part}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeader title="可复制 UI 生成提示词" description="后续要生成新页面或精修界面时，优先使用这些提示词，减少反复解释。" />
        <div className="grid gap-4 md:grid-cols-2">
          {uiPromptBlocks.map((block) => <UiPromptCard block={block} key={block.id} />)}
        </div>
      </section>
    </main>
  );
}
