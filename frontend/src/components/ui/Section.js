import SectionHeading from './SectionHeading';

export default function Section({ id, eyebrow, title, highlight, children }) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className="mx-auto max-w-content px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <SectionHeading id={headingId} eyebrow={eyebrow} title={title} highlight={highlight} />
      {children}
    </section>
  );
}
