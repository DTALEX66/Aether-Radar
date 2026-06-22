import { PageHero } from '../../components/PageHero';
import { DisclaimerBox } from '../../components/DisclaimerBox';

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        eyebrow="Privacy Draft"
        title="隐私政策草案"
        description="当前页面是商用前隐私政策草案，用于产品规划与法律复核，不构成正式法律文件。"
        primaryHref="/legal"
        primaryLabel="查看免责声明"
        secondaryHref="/terms-of-service"
        secondaryLabel="服务条款草案"
      />
      <section className="mx-auto max-w-4xl space-y-5 px-6 py-10 text-sm leading-7 text-slate-700">
        <DisclaimerBox />
        <h2 className="text-xl font-black text-slate-950">我们可能收集的数据</h2>
        <p>账号信息、收藏、工具栈、导出记录、API 使用记录、团队协作记录和基础访问日志。正式上线前需提供数据删除入口和账号注销入口。</p>
        <h2 className="text-xl font-black text-slate-950">敏感数据提示</h2>
        <p>用户不应把商业机密、个人身份信息、医疗、金融、未公开合同等敏感资料输入第三方 AI 工具。企业版应支持私有部署和内部白名单。</p>
        <h2 className="text-xl font-black text-slate-950">第三方工具</h2>
        <p>Aether Radar 会跳转到第三方 AI 工具、平台、GitHub 项目和模型社区。第三方服务的数据处理规则以其官网政策为准。</p>
      </section>
    </main>
  );
}
