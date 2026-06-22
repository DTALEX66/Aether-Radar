import { PageHero } from '../../components/PageHero';
import { AuditDashboard } from '../../components/AuditDashboard';

export default function AdminPage() {
  return (
    <main>
      <PageHero
        eyebrow="Data Ops"
        title="数据审核与运营看板"
        description="只读后台原型，用于检查字段完整性、风险实体、低可信来源和后续人工复核任务。正式版可升级为权限后台。"
        primaryHref="/status"
        primaryLabel="查看数据状态"
        secondaryHref="/standards"
        secondaryLabel="查看规范中心"
      />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <AuditDashboard />
      </section>
    </main>
  );
}
