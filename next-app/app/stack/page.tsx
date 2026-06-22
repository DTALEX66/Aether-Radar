import { PageHero } from '../../components/PageHero';
import { ToolStackManager } from '../../components/ToolStackManager';

export default function StackPage() {
  return (
    <main>
      <PageHero
        eyebrow="Personal Stack"
        title="我的 AI 工具栈"
        description="把工具从目录变成项目方案。用户可以在本地浏览器中组合工具、评估风险、导出 JSON/Markdown，并打印为 PDF。"
        primaryHref="/tools"
        primaryLabel="去工具库添加"
        secondaryHref="/report"
        secondaryLabel="生成选型报告"
      />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <ToolStackManager />
      </section>
    </main>
  );
}
