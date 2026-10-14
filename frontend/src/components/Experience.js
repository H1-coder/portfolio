import { timeline } from '../data/content';
import GlassCard from './ui/GlassCard';
import Reveal from './ui/Reveal';
import Section from './ui/Section';

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Journey" title="Experience &" highlight="education">
      <ol className="relative mx-auto max-w-3xl space-y-8 pl-14 before:absolute before:bottom-2 before:left-5 before:top-2 before:w-px before:bg-gradient-to-b before:from-brand-1 before:via-brand-2 before:to-brand-3 sm:pl-20 sm:before:left-8">
        {timeline.map(({ icon, kind, title, meta, description }, i) => (
          <Reveal as="li" key={title} index={i} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-14 top-6 grid h-10 w-10 place-items-center rounded-full bg-brand-button text-ink shadow-glow-sm ring-4 ring-ink sm:-left-[4.25rem]"
            >
              <i className={icon} />
            </span>
            <GlassCard className="p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-1">{kind}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">{title}</h3>
              <p className="mt-1 text-sm font-medium text-slate-400">{meta}</p>
              <p className="mt-4 leading-relaxed text-slate-300">{description}</p>
            </GlassCard>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
