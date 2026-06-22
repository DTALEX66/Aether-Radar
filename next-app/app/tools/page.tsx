import { EntityExplorer } from '../../components/EntityExplorer';

export default async function ToolsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-black">AI 工具库</h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        搜索、筛选和比较 AI 工具、平台、开源项目与本地部署方案。这里同时支持全量发现和精选选型，不用单一工具或单一知识库锁死用户。
      </p>
      <EntityExplorer initialCategory={category ?? 'all'} />
    </main>
  );
}
