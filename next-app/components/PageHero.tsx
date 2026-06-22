import Link from 'next/link';

export function PageHero({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="aether-hero relative overflow-hidden border-b border-slate-200 py-14 md:py-20">
      <div className="radar-orb radar-orb-a" />
      <div className="radar-orb radar-orb-b" />
      <div className="mx-auto max-w-7xl px-6">
        <span className="aether-eyebrow">{eyebrow}</span>
        <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">{description}</p>
        {(primaryHref || secondaryHref) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryHref && primaryLabel && <Link className="aether-btn-primary" href={primaryHref}>{primaryLabel}</Link>}
            {secondaryHref && secondaryLabel && <Link className="aether-btn-secondary" href={secondaryHref}>{secondaryLabel}</Link>}
          </div>
        )}
      </div>
    </section>
  );
}
