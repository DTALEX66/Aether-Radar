import { PageHero } from '../../components/PageHero';
import { SectionHeader } from '../../components/SectionHeader';

const plans = [
  ['Free', '基础搜索、词汇百科、部分榜单、基础 JSON/CSV/Markdown 导出。', '适合个人体验与学习。'],
  ['Pro', '完整 Excel/PDF、趋势榜、高级筛选、个人工具栈、每周更新。', '适合设计师、开发者、项目经理。'],
  ['Team', '团队工具库、成员协作、内部白名单、审核流程、报告导出。', '适合小团队与工作室。'],
  ['Enterprise', '私有部署、API/MCP、权限、审计、企业风险策略和定制数据源。', '适合企业与机构。'],
];

export default function PricingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Commercial Model"
        title="商业化不靠单纯广告，而靠数据、报告、工具栈和企业接入。"
        description="v1.1 先定义清楚免费、专业、团队和企业版边界，后续再接入真实登录、支付、API Key 和权限系统。"
        primaryHref="/report"
        primaryLabel="体验报告生成"
        secondaryHref="/enterprise"
        secondaryLabel="查看企业版规划"
      />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeader title="版本规划" description="当前不是最终定价，只是产品能力分层，避免后续功能边界混乱。" />
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {plans.map(([name, desc, fit]) => (
            <div className="card" key={name}>
              <h2 className="text-2xl font-black text-slate-950">{name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
              <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs font-semibold text-slate-600">{fit}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
