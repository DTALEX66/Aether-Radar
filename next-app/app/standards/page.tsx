import Link from 'next/link';
import { PageHero } from '../../components/PageHero';
import { SectionHeader } from '../../components/SectionHeader';

const standards = [
  ['总规范索引', 'docs/23_MASTER_EXECUTION_SPEC_INDEX.md', '所有产品、品牌、UI、工程、数据、安全、发布、未来规划规范的入口。', 'P0'],
  ['产品执行规范', 'docs/24_PRODUCT_EXECUTION_STANDARD.md', '明确产品定位、用户、模块边界和产品判断公式。', 'P0'],
  ['品牌执行规范', 'docs/25_BRAND_EXECUTION_STANDARD.md', '统一品牌含义、语气、视觉方向和禁止项。', 'P1'],
  ['UI 设计执行规范', 'docs/26_UI_DESIGN_EXECUTION_STANDARD.md', '约束页面蓝图、组件、视觉层级、AI UI 生成方式。', 'P1'],
  ['内容写作规范', 'docs/27_CONTENT_AND_COPYWRITING_STANDARD.md', '约束词条、风险、对比、场景方案和免责声明的表达。', 'P1'],
  ['工程执行规范', 'docs/28_ENGINEERING_EXECUTION_STANDARD.md', '约束编码、数据同步、API、MCP、测试、CI 和跨工具开发。', 'P0'],
  ['数据治理规范', 'docs/29_DATA_AND_TAXONOMY_GOVERNANCE_STANDARD.md', '约束字段、分类、去重、热度、风险、更新频率。', 'P0'],
  ['安全隐私法律规范', 'docs/30_SECURITY_PRIVACY_LEGAL_STANDARD.md', '约束风险、免责声明、隐私、API/MCP 安全和商用判断。', 'P0'],
  ['发布商业运营规范', 'docs/31_RELEASE_AND_COMMERCIAL_OPERATION_STANDARD.md', '约束版本、MVP 发布、商业化、内容运营和指标。', 'P2'],
  ['未来规划地图', 'docs/32_FUTURE_PRODUCT_ROADMAP_AND_EXPANSION_MAP.md', '规划 SaaS、API、MCP、插件、企业版和长期护城河。', 'P2'],
];

const gates = [
  'python scripts/check_encoding_syntax.py',
  'python scripts/validate_data.py',
  'python scripts/ten_round_self_check.py',
  'cd next-app && npm run sync:data && npm run typecheck && npm run lint && npm run build',
];

export default function StandardsPage() {
  return (
    <main>
      <PageHero
        eyebrow="v0.8 规范中心"
        title="把产品、品牌、UI、工程、数据、安全和发布执行规范统一到一套标准里。"
        description="这个页面用于让 Coding Agent、UI Agent、设计师、项目经理和后续开发者快速理解：继续开发 Aether Radar 时必须遵守哪些规范、先读哪些文件、跑哪些检查。"
        primaryHref="/ui"
        primaryLabel="查看 UI 系统"
        secondaryHref="/status"
        secondaryLabel="查看数据状态"
      />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeader title="规范地图" description="v0.8 后，项目规范不再散落，而是形成产品 → 品牌 → UI → 内容 → 工程 → 数据 → 安全 → 发布 → 未来规划的闭环。" />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {standards.map(([name, path, desc, priority]) => (
            <article className="card" key={path}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge border-blue-200 bg-blue-50 text-blue-700">{priority}</span>
                <span className="badge border-slate-200 bg-slate-50 text-slate-600">{path}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-slate-950">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeader title="接手前必跑检查" description="这些命令优先于功能开发，用于避免跨工具编码损坏、数据漂移、UI 规范丢失和构建问题。" />
        <div className="mt-4 grid gap-3">
          {gates.map((gate) => (
            <pre className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 p-4 text-sm text-slate-100" key={gate}>{gate}</pre>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeader title="新增功能前的 8 个问题" description="如果回答不清楚，说明这个功能还不适合进入开发。" />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            '服务哪个用户：普通用户、设计师、开发者、项目经理、企业用户还是 AI Agent 用户？',
            '属于哪条链路：发现、理解、筛选、对比、风险、方案、导出、接入还是更新？',
            '是否会破坏平台中立，过度偏向 Codex、Obsidian 或某个单一工具？',
            '是否需要新增数据字段，是否同步到 seeds、next-app/data、导出和校验脚本？',
            '是否需要风险提示、来源、更新时间和商用判断？',
            'UI 是否符合雷达、信任、风险、场景、数据卡片语言？',
            '是否需要导出、API 或 MCP 可读？',
            '是否通过编码、数据、自检、类型、lint、build 检查？',
          ].map((item, index) => (
            <div className="card text-sm leading-6 text-slate-700" key={item}><b className="text-slate-950">{index + 1}.</b> {item}</div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 text-sm leading-7 text-blue-900">
          <b>执行原则：</b>规范不是为了增加文档数量，而是为了让 ChatGPT、Codex、Cursor、Claude Code、Cline、Figma AI、Lovart、VS Code 和 GitHub Web 在同一个项目语境下协作，避免重复调研、重复设计、乱码、字段漂移、UI 跑偏和风险提示丢失。
          <div className="mt-4"><Link className="font-semibold text-blue-700" href="/legal">查看免责声明 →</Link></div>
        </div>
      </section>
    </main>
  );
}
