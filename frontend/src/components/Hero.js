import { profile } from '../data/content';
import GradientButton from './ui/GradientButton';
import GradientText from './ui/GradientText';
import Reveal from './ui/Reveal';
import SocialLinks from './ui/SocialLinks';

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="mx-auto flex min-h-[100svh] max-w-content items-center px-4 pb-16 pt-32 sm:px-6 lg:px-8"
    >
      <div className="grid w-full items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="text-center lg:text-left">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-slate-300">
              <i className="fa-solid fa-location-dot text-brand-1" aria-hidden="true" />
              Based in {profile.location}
            </p>
          </Reveal>

          <Reveal index={1}>
            <h1
              id="hero-title"
              className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Hi, I'm <GradientText>{profile.name}</GradientText>
            </h1>
          </Reveal>

          <Reveal index={2}>
            <p className="mt-5 font-display text-xl font-medium text-slate-200 sm:text-2xl">
              {profile.role} <span className="text-slate-500" aria-hidden="true">·</span>{' '}
              <span className="text-brand-1">{profile.stack}</span>
            </p>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal index={3} className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <GradientButton href="#projects" className="w-full sm:w-auto">
              View Projects <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </GradientButton>
            <GradientButton href="#contact" variant="glass" className="w-full sm:w-auto">
              Contact Me
            </GradientButton>
          </Reveal>

          <Reveal index={4} className="mt-8 flex flex-wrap items-center justify-center gap-5 lg:justify-start">
            <SocialLinks />
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium text-slate-300 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <i className="fa-solid fa-file-lines text-brand-1" aria-hidden="true" />
              View My CV
            </a>
          </Reveal>
        </div>

        <Reveal index={2} className="relative mx-auto w-full max-w-[18rem] sm:max-w-sm">
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-[2.75rem] bg-brand-gradient bg-pan opacity-50 blur-2xl animate-pan motion-reduce:animate-none"
          />
          <div className="relative rounded-[2.25rem] bg-brand-gradient bg-pan p-[2px] animate-pan motion-reduce:animate-none">
            <div className="rounded-[calc(2.25rem-2px)] bg-ink-soft/90 p-3 shadow-glass">
              <img
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width="480"
                height="600"
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/5] w-full rounded-[1.75rem] object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
