import { profile } from '../data/content';
import { glassSurface } from './ui/GlassCard';
import SocialLinks from './ui/SocialLinks';

export default function Footer() {
  return (
    <footer className="px-4 pb-6">
      <div
        className={`mx-auto flex max-w-content flex-col items-center gap-4 rounded-glass px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left ${glassSurface}`}
      >
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <SocialLinks />
          <a
            href="#home"
            aria-label="Back to top"
            className="grid h-11 w-11 place-items-center rounded-full bg-brand-button text-ink shadow-glow-sm transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <i className="fa-solid fa-arrow-up" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
