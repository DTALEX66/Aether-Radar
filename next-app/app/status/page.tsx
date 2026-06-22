import { getDataHealth } from '../../lib/data';
import { AETHER_BUILD_PROFILE, AETHER_RELEASE_DATE, AETHER_VERSION } from '../../lib/version';

export default function StatusPage() {
  const health = getDataHealth();
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-black">数据状态</h1>
      <p className="mt-2 text-slate-600">v{AETHER_VERSION} 稳定化版本的数据健康状态，用于交接、验收和后续商业化前的质量检查。</p>
      <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
        版本：v{AETHER_VERSION} ｜ 发布日：{AETHER_RELEASE_DATE} ｜ 构建策略：{AETHER_BUILD_PROFILE}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {Object.entries(health).map(([key, value]) => (
          <div className="card" key={key}>
            <b className="block text-3xl text-slate-950">{value}</b>
            <span className="mt-2 block text-sm text-slate-500">{key}</span>
          </div>
        ))}
      </div>
      <div className="card mt-6 text-sm leading-6 text-slate-700">
        商用前需要继续补齐：自动更新、来源复核、许可证抓取、价格定期核验、隐私政策摘要、用户收藏、付费导出、API/MCP 接入和企业权限。
      </div>
    </main>
  );
}
