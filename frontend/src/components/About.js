import { about } from '../data/content';
import GlassCard from './ui/GlassCard';
import GradientText from './ui/GradientText';
import Reveal from './ui/Reveal';
import Section from './ui/Section';
import SocialLinks from './ui/SocialLinks';

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Get to know" highlight="me">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <GlassCard className="h-full p-6 sm:p-10">
            <div className="space-y-5 text-base leading-relaxed text-slate-300 sm:text-lg">
              {about.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <details className="group mt-5">
              <summary className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full font-semibold text-brand-1 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">Read more</span>
                <span className="hidden group-open:inline">Show less</span>
                <i
                  className="fa-solid fa-chevron-down text-sm transition-transform group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <div className="mt-5 space-y-5 text-base leading-relaxed text-slate-300 sm:text-lg">
                {about.more.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>

            <SocialLinks className="mt-8" />
          </GlassCard>
        </Reveal>

        <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
          {about.stats.map(({ value, label }, i) => (
            <Reveal as="li" key={label} index={i + 1}>
              <GlassCard className="flex h-full flex-col justify-center p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-glow motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8 lg:text-left">
                <GradientText className="font-display text-5xl font-bold">{value}</GradientText>
                <span className="mt-2 text-sm font-medium uppercase tracking-wider text-slate-400">{label}</span>
              </GlassCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
