import Link from 'next/link';
import { categories, scenarios, getHighHeatEntities, getRiskHotspots } from '../lib/data';
import { EntityCard } from '../components/EntityCard';
import { DataHealthBar } from '../components/DataHealthBar';
import { DisclaimerBox } from '../components/DisclaimerBox';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';

const coreLinks = [
  ['查工具', '/tools', '按分类、热度、风险、开源、本地部署、API/MCP 过滤。'],
  ['看热榜', '/github', '查看开源项目热度，不把 Stars 当唯一质量信号。'],
  ['评风险', '/risks', '隐私、版权、商用、许可证、安全、维护、国内可用性。'],
  ['选方案', '/scenarios', '按真实场景组合工具栈，而不是只列工具链接。'],
  ['导出接入', '/exports', 'JSON、CSV、Markdown、Excel，后续扩展 Notion、飞书、PDF。'],
  ['API/MCP', '/api-docs', '提供机器可读 API 和本地 MCP 查询原型，方便 Agent 与企业系统接入。'],
  ['对比平台', '/competitors', '比较谁收录更多，同时提示数量不等于质量。'],
  ['UI系统', '/ui', '专属视觉令牌、组件规范、页面蓝图和 AI UI 生成提示词。'],
  ['规范中心', '/standards', '产品、品牌、UI、工程、数据、安全、发布与未来规划的统一规范。'],
];

export default function HomePage() {
  return (
    <main>
      <PageHero
        eyebrow="全链路 AI 工具选型平台"
        title="发现、理解、筛选、评风险、选方案、导出接入。"
        description="Aether Radar 不绑定 Codex，不绑定 Obsidian，不只做工具导航。它覆盖模型、Agent、MCP、设计、编程、知识库、自动化、本地部署、浏览器 Agent 和开源项目，让用户基于热度、来源、风险和场景自主选择。"
        primaryHref="/tools"
        primaryLabel="进入工具库"
        secondaryHref="/ui"
        secondaryLabel="查看专属 UI 系统"
      />

      <DataHealthBar />

      <section className="mx-auto max-w-7xl px-6 py-8">
        <DisclaimerBox compact />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {coreLinks.map(([title, href, desc]) => (
            <Link className="card transition hover:-translate-y-0.5 hover:shadow-md" href={href} key={href}>
              <h2 className="text-xl font-bold text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeader title="高热工具示例" description="精选展示高热实体。完整筛选请进入工具库。" action={<Link className="text-sm font-semibold text-blue-700" href="/tools">查看全部 →</Link>} />
        <div className="mt-4 grid gap-4 md:grid-cols-3">{getHighHeatEntities().slice(0, 6).map((e) => <EntityCard key={e.id} entity={e} />)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeader title="场景方案" description="把工具组合成工作流，而不是只做链接目录。" action={<Link className="text-sm font-semibold text-blue-700" href="/scenarios">更多方案 →</Link>} />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {scenarios.slice(0, 4).map((s) => (
            <div className="card" key={s.id}>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="badge border-blue-200 bg-blue-50 text-blue-700">{s.difficulty}</span>
                <span className="badge border-green-200 bg-green-50 text-green-700">{s.cost}</span>
                <span className="badge border-teal-200 bg-teal-50 text-teal-700">本地：{s.localPossible}</span>
              </div>
              <h3 className="mt-3 font-bold">{s.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.path}</p>
              <p className="mt-3 rounded-xl bg-orange-50 p-3 text-xs text-orange-800">风险：{s.risk}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="text-2xl font-bold">高风险关注</h2>
        <p className="mt-2 text-sm text-slate-500">风险不是拒绝使用，而是提醒用户在商用、企业、敏感数据场景下复核。</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {getRiskHotspots().slice(0, 3).map((entity) => (
            <div className="card" key={entity.id}>
              <h3 className="font-bold">{entity.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{entity.riskNote}</p>
              <Link className="mt-4 inline-block text-sm font-semibold text-blue-700" href={`/tools/${entity.id}`}>查看详情 →</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="text-2xl font-bold">分类覆盖</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <Link className="card" href={`/tools?category=${category.id}`} key={category.id}>
              <h3 className="font-bold">{category.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
