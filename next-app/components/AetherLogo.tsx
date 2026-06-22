export function AetherLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 font-black tracking-tight text-slate-950">
      <span className="relative grid h-9 w-9 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-blue-200">
        <span className="absolute h-6 w-6 rounded-full border border-cyan-300/70" />
        <span className="absolute h-px w-6 rotate-45 bg-cyan-300/80" />
        <span className="h-2 w-2 rounded-full bg-cyan-300" />
      </span>
      {!compact && <span>Aether Radar｜AI 生态雷达</span>}
    </span>
  );
}
