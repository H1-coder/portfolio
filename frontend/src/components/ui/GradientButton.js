const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-60 motion-reduce:transition-none motion-reduce:hover:translate-y-0';

const variants = {
  gradient: 'bg-brand-button bg-pan bg-left text-ink shadow-glow-sm hover:bg-right',
  // Gradient border: an opaque padding-box layer over a gradient border-box layer.
  glass:
    'border border-transparent text-white [background:linear-gradient(#17172f,#17172f)_padding-box,linear-gradient(110deg,rgb(var(--c1)),rgb(var(--c3)))_border-box] hover:shadow-glow-sm',
};

const sizes = {
  md: 'px-6 py-3 text-base',
  sm: 'px-4 py-2 text-sm',
};

export default function GradientButton({ href, variant = 'gradient', size = 'md', className = '', children, ...props }) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
