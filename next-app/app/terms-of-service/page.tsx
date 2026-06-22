import { PageHero } from '../../components/PageHero';
import { DisclaimerBox } from '../../components/DisclaimerBox';

export default function TermsOfServicePage() {
  return (
    <main>
      <PageHero
        eyebrow="Terms Draft"
        title="服务条款草案"
        description="Aether Radar 是 AI 工具信息索引、风险提示与选型参考平台，不替代用户自己的采购、法律、安全或商用授权判断。"
        primaryHref="/privacy"
        primaryLabel="隐私政策草案"
        secondaryHref="/legal"
        secondaryLabel="免责声明"
      />
      <section className="mx-auto max-w-4xl space-y-5 px-6 py-10 text-sm leading-7 text-slate-700">
        <DisclaimerBox />
        <h2 className="text-xl font-black text-slate-950">服务性质</h2>
        <p>平台提供工具索引、分类筛选、风险提示、场景方案、导出和接入能力，内容仅供参考。</p>
        <h2 className="text-xl font-black text-slate-950">用户责任</h2>
        <p>用户在使用任何第三方工具前，应自行核验官网、价格、许可证、隐私政策、服务条款、商用授权和当地可用性。</p>
        <h2 className="text-xl font-black text-slate-950">禁止行为</h2>
        <p>禁止滥用 API、批量爬取、重售未授权数据、绕过权限、上传违法内容或使用平台协助侵犯第三方权益。</p>
      </section>
    </main>
  );
}
