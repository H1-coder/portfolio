import GradientText from './GradientText';
import Reveal from './Reveal';

export default function SectionHeading({ id, eyebrow, title, highlight }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-1">{eyebrow}</p>
      <h2 id={id} className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title} <GradientText>{highlight}</GradientText>
      </h2>
    </Reveal>
  );
}
