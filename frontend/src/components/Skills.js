import { skillGroups } from '../data/content';
import GlassCard from './ui/GlassCard';
import Reveal from './ui/Reveal';
import Section from './ui/Section';

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="What I" highlight="work with">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map(({ title, icon, skills }, i) => (
          <Reveal key={title} index={i}>
            <GlassCard className="group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-button text-ink shadow-glow-sm">
                  <i className={icon} aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
                  >
                    <i className={`${skill.icon} text-brand-1`} aria-hidden="true" />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
