import { PageHero } from '../../components/PageHero';

const capabilities = ['私有部署', '企业内部 AI 工具白名单', '团队成员权限', 'API Key', 'MCP 查询服务', '审计日志', '风险策略配置', '数据导入导出', '定制报告模板'];

export default function EnterprisePage() {
  return (
    <main>
      <PageHero
        eyebrow="Enterprise"
        title="企业版目标：把 AI 工具选型变成可治理的内部能力。"
        description="企业用户关注的不是工具多，而是哪些工具可用、哪些有风险、谁审核过、数据是否上传云端、是否能私有部署和审计。"
        primaryHref="/standards"
        primaryLabel="查看规范中心"
        secondaryHref="/admin"
        secondaryLabel="查看审核看板"
      />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {capabilities.map((item) => (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm" key={item}>
              <h2 className="font-black text-slate-950">{item}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">该能力进入企业版路线图，正式开发前需结合账号、权限、数据库、日志和合规要求落地。</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
