import { ExportCenter } from '../../components/ExportCenter';
import { PageHero } from '../../components/PageHero';

export default function ExportsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Export Center"
        title="Aether Radar Exports"
        description="Download the current Aether Radar data snapshot for review, comparison, reporting, and agent integration. Each export keeps risk and source-review context visible for downstream use."
        primaryHref="/api/export?format=json"
        primaryLabel="Download JSON"
        secondaryHref="/api-docs"
        secondaryLabel="API docs"
      />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <ExportCenter />
      </section>
    </main>
  );
}