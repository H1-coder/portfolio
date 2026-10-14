import { useEffect, useState } from 'react';
import { profile } from '../data/content';
import useActiveSection from '../hooks/useActiveSection';
import { PALETTES } from '../theme/palettes';
import { glassSurface } from './ui/GlassCard';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];
const SECTION_IDS = ['home', ...NAV_ITEMS.map((item) => item.id)];

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white';

function PaletteSwitcher({ palette, onChange }) {
  return (
    <div role="group" aria-label="Colour theme" className="flex items-center rounded-full border border-white/10 bg-white/5 p-1">
      {Object.entries(PALETTES).map(([key, { label, swatch }]) => {
        const selected = palette === key;
        return (
          <button
            key={key}
            type="button"
            aria-pressed={selected}
            aria-label={`${label} theme`}
            title={label}
            onClick={() => onChange(key)}
            className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${focusRing} ${
              selected ? 'bg-white/15' : 'hover:bg-white/10'
            }`}
          >
            <span
              className={`h-4 w-4 rounded-full bg-gradient-to-br ${swatch} ${
                selected ? 'ring-2 ring-white/80 ring-offset-2 ring-offset-ink-soft' : ''
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function Navbar({ palette, onPaletteChange }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav aria-label="Primary" className="pointer-events-auto mx-auto max-w-content">
        <div className={`flex items-center justify-between gap-3 rounded-full py-2 pl-2 pr-2 sm:pl-3 ${glassSurface}`}>
          <a href="#home" onClick={close} className={`flex items-center gap-3 rounded-full ${focusRing}`}>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-button font-display text-sm font-bold text-ink">
              {profile.initials}
            </span>
            <span className="hidden font-display font-semibold text-white sm:inline">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'location' : undefined}
                  className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors ${focusRing} ${
                    active === id ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {label}
                  {active === id && (
                    <span aria-hidden="true" className="absolute inset-x-4 -bottom-px h-px bg-brand-gradient" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <PaletteSwitcher palette={palette} onChange={onPaletteChange} />
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
              className={`grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden ${focusRing}`}
            >
              <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`mt-2 origin-top rounded-glass transition duration-200 ease-out motion-reduce:transition-none lg:hidden ${glassSurface} ${
            open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
          }`}
        >
          <ul className="flex flex-col gap-1 p-2">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={close}
                  aria-current={active === id ? 'location' : undefined}
                  className={`block rounded-2xl px-4 py-3 font-medium transition-colors ${focusRing} ${
                    active === id ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
