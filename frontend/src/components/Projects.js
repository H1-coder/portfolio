import { projects } from '../data/content';
import GlassCard from './ui/GlassCard';
import GradientButton from './ui/GradientButton';
import Reveal from './ui/Reveal';
import Section from './ui/Section';

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Things I've" highlight="built">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(({ title, image, tags, live, code }, i) => (
          <Reveal as="li" key={title} index={i}>
            <GlassCard
              as="article"
              className="group flex h-full flex-col overflow-hidden transition-all duration-500 ease-out hover:border-white/25 hover:shadow-glow hover:[transform:perspective(1000px)_rotateX(3deg)_translateY(-8px)] motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              <div className="relative aspect-video overflow-hidden border-b border-white/10">
                <img
                  src={image}
                  alt={`Screenshot of the ${title} project`}
                  width="640"
                  height="360"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
                <ul aria-label="Technologies used" className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex gap-3 pt-6">
                  <GradientButton href={live} size="sm" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                    Live Demo
                    <span className="sr-only"> of {title} (opens in a new tab)</span>
                  </GradientButton>
                  <GradientButton href={code} size="sm" variant="glass" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <i className="fa-brands fa-github" aria-hidden="true" />
                    Code
                    <span className="sr-only"> for {title} (opens in a new tab)</span>
                  </GradientButton>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
