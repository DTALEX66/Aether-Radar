export function StatCard({ value, label, hint }: { value: string | number; label: string; hint?: string }) {
  return (
    <div className="aether-stat-card">
      <b className="block text-3xl font-black text-slate-950">{value}</b>
      <span className="mt-1 block text-sm font-semibold text-slate-700">{label}</span>
      {hint && <span className="mt-2 block text-xs leading-5 text-slate-500">{hint}</span>}
    </div>
  );
}
