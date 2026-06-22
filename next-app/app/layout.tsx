import './globals.css';
import Link from 'next/link';
import { AetherLogo } from '../components/AetherLogo';

export const metadata = {
  title: 'AI 生态雷达｜全链路 AI 工具选型平台',
  description: '覆盖 AI 工具、平台、开源项目、模型、Agent、MCP、风险、安全、导出和持续更新的全链路选型平台。',
};

const navItems = [
  ['工具库', '/tools'],
  ['词汇', '/terms'],
  ['GitHub热榜', '/github'],
  ['风险中心', '/risks'],
  ['场景方案', '/scenarios'],
  ['对比', '/compare'],
  ['收录榜', '/competitors'],
  ['导出', '/exports'],
  ['工具栈', '/stack'],
  ['报告', '/report'],
  ['审核', '/admin'],
  ['部署', '/deploy'],
  ['商业', '/pricing'],
  ['企业', '/enterprise'],
  ['API', '/api-docs'],
  ['UI系统', '/ui'],
  ['规范', '/standards'],
  ['关于', '/about'],
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex min-h-16 max-w-7xl flex-col gap-3 px-6 py-3 md:flex-row md:items-center md:justify-between">
            <Link href="/" aria-label="Aether Radar 首页"><AetherLogo /></Link>
            <nav className="flex flex-wrap gap-4 text-sm text-slate-600">
              {navItems.map(([label, href]) => (
                <Link className="hover:text-slate-950" key={href} href={href}>{label}</Link>
              ))}
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 text-sm text-slate-600 md:grid-cols-3">
            <div>
              <b className="text-slate-950">AI 生态雷达</b>
              <p className="mt-2 leading-6">全链路 AI 工具、平台、开源项目、模型、Agent、工作流、知识库、风险与导出的索引筛选平台。</p>
            </div>
            <div>
              <b className="text-slate-950">产品原则</b>
              <p className="mt-2 leading-6">不绑定单一工具，不只看收录数量，不把 Stars 当质量，风险优先，让用户自己选择。</p>
            </div>
            <div>
              <b className="text-slate-950">声明</b>
              <p className="mt-2 leading-6">内容用于信息索引和选型参考，不构成法律、安全、财务、采购或商用授权建议。</p>
              <Link className="mt-2 inline-block font-semibold text-blue-700" href="/legal">查看免责声明</Link><span className="mx-2">·</span><Link className="font-semibold text-blue-700" href="/privacy">隐私草案</Link><span className="mx-2">·</span><Link className="font-semibold text-blue-700" href="/terms-of-service">条款草案</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
