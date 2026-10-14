// Opaque fallback first; real glass only where backdrop-filter is supported.
export const glassSurface =
  'border border-white/15 bg-ink-soft/95 shadow-glass supports-[backdrop-filter]:bg-white/[0.07] supports-[backdrop-filter]:backdrop-blur-glass supports-[backdrop-filter]:backdrop-saturate-150';

export default function GlassCard({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`relative rounded-glass ${glassSurface} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
