import { socials } from '../../data/content';

export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {socials.map(({ label, icon, href }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-lg text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:text-white hover:shadow-glow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <i className={icon} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
