import { cn } from '@/lib/utils'

export default function GlowDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center gap-1 my-10', className)}>
      {/* Kasavu-style SVG rule with diamond nodes */}
      <svg viewBox="0 0 320 16" width="100%" style={{ maxWidth: 320 }} aria-hidden="true">
        <line x1="0" y1="6" x2="320" y2="6" stroke="var(--color-accent)" strokeWidth="1.2" opacity="0.35"/>
        <line x1="0" y1="10" x2="320" y2="10" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.18"/>
        {/* Diamond nodes */}
        <rect x="75"  y="3" width="6" height="6" fill="var(--color-accent2)" opacity="0.55" transform="rotate(45 78 6)"/>
        <rect x="153" y="2" width="8" height="8" fill="var(--color-accent)"  opacity="0.65" transform="rotate(45 157 6)"/>
        <rect x="233" y="3" width="6" height="6" fill="var(--color-accent2)" opacity="0.55" transform="rotate(45 236 6)"/>
      </svg>
      {/* Fountain centre accent */}
      <img src="/assets/fountain.webp" alt="" className="fountain-glow float-slow" style={{ width: 40, height: 'auto' }} />
      <svg viewBox="0 0 320 16" width="100%" style={{ maxWidth: 320 }} aria-hidden="true">
        <line x1="0" y1="6" x2="320" y2="6" stroke="var(--color-accent)" strokeWidth="1.2" opacity="0.35"/>
        <line x1="0" y1="10" x2="320" y2="10" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.18"/>
        <rect x="75"  y="3" width="6" height="6" fill="var(--color-accent2)" opacity="0.55" transform="rotate(45 78 6)"/>
        <rect x="153" y="2" width="8" height="8" fill="var(--color-accent)"  opacity="0.65" transform="rotate(45 157 6)"/>
        <rect x="233" y="3" width="6" height="6" fill="var(--color-accent2)" opacity="0.55" transform="rotate(45 236 6)"/>
      </svg>
    </div>
  )
}
