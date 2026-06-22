export default function LegalPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-black">免责声明与风险提示</h1>
      <div className="card mt-6 space-y-5 text-sm leading-7 text-slate-700">
        <p><b>信息用途：</b>本平台内容用于 AI 工具、平台、开源项目、模型、Agent、MCP、工作流和知识库的索引、筛选、学习与项目选型参考。</p>
        <p><b>非专业建议：</b>本平台不构成法律、财务、安全、采购、投资、合规、医疗或商用授权建议。正式使用前请自行核验官网、许可证、隐私政策、价格、服务条款和当地法规。</p>
        <p><b>热度限制：</b>GitHub Stars、Forks、平台收录数量、媒体报道和社区热度只代表关注度或覆盖面，不等于质量、安全性、维护能力、商业可用性或适合你的项目。</p>
        <p><b>生成式 AI 风险：</b>图像、视频、音频、文本、代码、模型、LoRA、插件和 Agent 可能涉及版权、肖像权、数据隐私、提示注入、工具投毒、供应链安全和内容合规风险。</p>
        <p><b>用户选择：</b>本平台尽量提供来源、风险、替代品和更新时间，让用户自己做出选择。任何工具的购买、部署、商用、接入和自动化执行，均应由用户自行判断并承担相应责任。</p>
      </div>
    </main>
  );
}
