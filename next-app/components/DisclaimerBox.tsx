export function DisclaimerBox({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
      <b>风险提示：</b>
      {compact
        ? '收录数量、Stars、平台口径和 AI 生成内容都不等于质量或商用安全。使用前请核验官网、许可证、隐私政策和使用条款。'
        : 'AI 工具、模型、插件、MCP Server、浏览器 Agent 和生成式内容都可能存在隐私、版权、商用授权、供应链、提示注入、国内可用性和维护风险。本平台用于索引、筛选和辅助判断，不构成法律、财务、安全、采购或商用授权建议。'}
    </div>
  );
}
