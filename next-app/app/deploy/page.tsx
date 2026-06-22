import { PageHero } from '../../components/PageHero';
import { CapabilityMatrix } from '../../components/CapabilityMatrix';

const deploys = [
  ['Vercel', '适合 MVP 网站、API 路由、快速演示。', 'cd next-app && npm install && npm run build'],
  ['Docker', '适合企业私有化、统一运行环境、内网部署。', 'docker compose up --build'],
  ['静态预览', '适合无 Node 环境快速看 UI。', 'cd static-site && python -m http.server 4173'],
  ['MCP 本地查询', '适合 Agent 本地只读查询数据。', 'cd next-app && npm run mcp:server'],
];

export default function DeployPage() {
  return (
    <main>
      <PageHero
        eyebrow="Deploy"
        title="部署与商用展示"
        description="整理 Vercel、Docker、静态站、MCP 原型和后续 SaaS 化部署路径，方便不同开发工具按统一方式接手。"
        primaryHref="/api-docs"
        primaryLabel="查看 API"
        secondaryHref="/standards"
        secondaryLabel="查看执行规范"
      />
      <section className="mx-auto max-w-7xl space-y-8 px-6 py-10">
        <CapabilityMatrix />
        <section className="grid gap-4 md:grid-cols-2">
          {deploys.map(([name, desc, command]) => (
            <div className="card" key={name}>
              <h2 className="text-xl font-black">{name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
              <pre className="mt-4 overflow-auto rounded-2xl bg-slate-950 p-4 text-xs text-slate-100"><code>{command}</code></pre>
            </div>
          ))}
        </section>
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
          完整生产版还需要账号、权限、数据后台、API Key、日志、支付、监控、隐私政策、服务条款和真实数据复核流程。当前 v1.0 目标是商用展示版与低成本交接基础。
        </section>
      </section>
    </main>
  );
}
