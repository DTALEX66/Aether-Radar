import { PageHero } from '../../components/PageHero';
import { ReportBuilder } from '../../components/ReportBuilder';

export default function ReportPage() {
  return (
    <main>
      <PageHero
        eyebrow="Decision Report"
        title="选型报告生成器"
        description="根据场景方案生成可打印、可交付、可继续编辑的 AI 工具选型报告。MVP 版先支持 Markdown 下载与浏览器打印 PDF。"
        primaryHref="/scenarios"
        primaryLabel="查看场景方案"
        secondaryHref="/exports"
        secondaryLabel="导出数据"
      />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <ReportBuilder />
      </section>
    </main>
  );
}
